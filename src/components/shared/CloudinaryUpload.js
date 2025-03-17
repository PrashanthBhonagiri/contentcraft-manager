import React, { useState } from 'react';
import { Upload } from "@progress/kendo-react-upload";
import { ProgressBar } from "@progress/kendo-react-progressbars";
import axios from 'axios';
import cloudinaryConfig from '../../config/cloudinary.js';

const CloudinaryUpload = ({ 
  onUploadSuccess, 
  onUploadError, 
  multiple = false,
  allowedTypes = "image/*",
  maxFileSize = 10485760, // 10MB
  value,
  disabled
}) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    const files = event.newState;
    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file.getRawFile());
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/auto/upload`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(prev => ({
                ...prev,
                [file.uid]: progress
              }));
            }
          }
        );

        return {
          url: response.data.secure_url,
          publicId: response.data.public_id,
          fileName: file.name,
          fileType: file.extension,
          size: file.size
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      onUploadSuccess(multiple ? uploadedFiles : uploadedFiles[0]);
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError(error.message);
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  const onProgress = (event) => {
    const { uid, progress } = event;
    setUploadProgress(prev => ({
      ...prev,
      [uid]: progress
    }));
  };

  return (
    <div className="cloudinary-upload">
      <Upload
        batch={false}
        multiple={multiple}
        disabled={disabled || uploading}
        restrictions={{
          allowedExtensions: allowedTypes.split(','),
          maxFileSize: maxFileSize
        }}
        defaultFiles={value ? (Array.isArray(value) ? value : [value]) : []}
        onAdd={handleUpload}
        onProgress={onProgress}
      />
      {Object.keys(uploadProgress).map(uid => (
        <div key={uid} className="upload-progress">
          <ProgressBar value={uploadProgress[uid]} />
        </div>
      ))}
    </div>
  );
};

export default CloudinaryUpload;
