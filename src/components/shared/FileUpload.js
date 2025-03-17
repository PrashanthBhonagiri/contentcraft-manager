import React, { useState } from 'react';
import { Upload } from "@progress/kendo-react-upload";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { ProgressBar } from "@progress/kendo-react-progressbars";
import cloudinaryConfig from '../../config/cloudinary.js';

const FileUpload = ({ 
  onUploadComplete, 
  allowedExtensions, 
  multiple = false, 
  maxFileSize = 5242880, // 5MB
  label = "Upload Files" 
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event) => {
    setSelectedFiles(event.newState);
    if (event.newState.length > 0) {
      setShowPreview(true);
    }
  };

  const renderPreview = (file) => {
    const fileType = file.extension?.toLowerCase();
    
    if (fileType?.match(/(jpg|jpeg|png|gif)$/)) {
      return (
        <div className="preview-item">
          <img
            src={URL.createObjectURL(file.getRawFile())}
            alt={file.name}
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
          <div className="file-name">{file.name}</div>
        </div>
      );
    } else if (fileType === 'pdf') {
      return (
        <div className="preview-item pdf-preview">
          <i className="k-icon k-i-file-pdf" />
          <div className="file-name">{file.name}</div>
        </div>
      );
    }
    
    return (
      <div className="preview-item file-preview">
        <i className="k-icon k-i-file" />
        <div className="file-name">{file.name}</div>
      </div>
    );
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/auto/upload`,
        {
          method: 'POST',
          body: formData
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    const uploadedFiles = [];

    try {
      for (const file of selectedFiles) {
        setUploadProgress(prev => ({
          ...prev,
          [file.uid]: 0
        }));

        const result = await uploadToCloudinary(file.getRawFile());
        console.log(result);
        
        setUploadProgress(prev => ({
          ...prev,
          [file.uid]: 100
        }));

        uploadedFiles.push({
          originalName: file.name,
          url: result.secure_url,
          publicId: result.public_id,
          fileType: file.extension,
          size: file.size
        });
        console.log("uploadedFiles " + uploadedFiles);
        
      }

      onUploadComplete(multiple ? uploadedFiles : uploadedFiles[0]);
      setShowPreview(false);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <Upload
        batch={false}
        multiple={multiple}
        restrictions={{
          allowedExtensions,
          maxFileSize
        }}
        onAdd={handleFileSelect}
        saveUrl={''}
        autoUpload={false}
      />

      {showPreview && (
        <Dialog 
          title="File Preview" 
          onClose={() => setShowPreview(false)}
          width={600}
        >
          <div className="file-preview-container">
            {selectedFiles.map(file => (
              <div key={file.uid} className="file-preview-item">
                {renderPreview(file)}
                {uploading && (
                  <div className="progress-container">
                    <ProgressBar
                      value={uploadProgress[file.uid] || 0}
                    />
                    <div className="progress-label">
                      {`Uploading... ${uploadProgress[file.uid] || 0}%`}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="dialog-buttons">
            <Button
              onClick={handleUpload}
              disabled={uploading}
              themeColor="primary"
            >
              {uploading ? 'Uploading...' : 'Confirm Upload'}
            </Button>
            <Button 
              onClick={() => setShowPreview(false)} 
              disabled={uploading}
            >
              Cancel
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default FileUpload;
