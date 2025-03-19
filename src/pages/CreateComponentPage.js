import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Upload } from "@progress/kendo-react-upload";
import { Loader } from "@progress/kendo-react-indicators";
import { Notification } from "@progress/kendo-react-notification";

import RichTextEditor from '../components/shared/RichTextEditor';
import ComponentPreview from '../components/shared/ComponentPreview';
import { COMPONENT_TYPE_DETAILS, COMPONENT_TYPES } from '../constants/componentTypes';
import { COMPONENT_FIELDS } from '../constants/componentInterfaces';
import { ComponentService } from '../services/api';
import FileUpload from '../components/shared/FileUpload';

const CreateComponentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({
    featuredImage: null,
    attachments: []
  });

  useEffect(() => {
    const type = searchParams.get('type');
    if (type && COMPONENT_TYPES[type.toUpperCase()]) {
      if (type.toLowerCase() !== 'post') {
        navigate('/coming-soon'); // Redirect to coming soon page
        return;
      }
      setSelectedType(type);
    }
  }, [searchParams]);

  const handleTypeSelection = (type) => {
    if (type.toLowerCase() !== 'post') {
      navigate('/coming-soon');
      return;
    }
    navigate(`/components/create?type=${type}`);
    setSelectedType(type);
  };

  const handleFormSubmit = async(formData) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Form data before submission:', formData);

      const componentData = {
        title: formData.title,
        type: selectedType,
        content: {
          body: formData.content,
          excerpt: formData.excerpt || ''
        },
        metadata: {
          featuredImage: uploadedFiles.featuredImage,
          attachments: uploadedFiles.attachments
        },
        status: 'draft'
      };
      console.log('Submitting component data:', componentData);


      // switch (selectedType) {
      //   case 'post':
      //     componentData.content = {
      //       body: formData.content,
      //       excerpt: formData.excerpt || '',
      //       featuredImage: formData.featuredImage || null,
      //       attachments: formData.attachments || []
      //     };
      //     break;

      //   case 'event':
      //     componentData.content = {
      //       description: formData.content,
      //       startDate: formData.startDate,
      //       endDate: formData.endDate,
      //       location: formData.location,
      //       eventImage: formData.eventImage
      //     };
      //     break;

      //   case 'gallery':
      //     componentData.content = {
      //       description: formData.description,
      //       images: formData.images || []
      //     };
      //     break;

      //   case 'form':
      //     componentData.content = {
      //       description: formData.description,
      //       fields: formData.formFields || []
      //     };
      //     break;

      //   default:
      //     throw new Error('Invalid component type');
      // }

      // console.log('Prepared component data:', componentData);

      // Send to backend
      const result = await ComponentService.createComponent(componentData);
      console.log('Component Creation result:', result);
      navigate('/components');
    } catch (err) {
      setError('Failed to create component');
      console.error('Error creating component:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFeaturedImageUpload = async (fileData) => {
    // console.log("form data before " + formData);
    // console.dir(formData);
    // console.log("featuredImage before = " + formData.featuredImage);
    
    // setFormData(prev => ({
    //   ...prev,
    //   featuredImage: fileData
    // }));

    // console.log("form data after " + formData);
    // console.dir(formData);
    // console.log("featuredImage after = " + formData.featuredImage);
    
    try {
      console.log("in handleFeaturedImageUpload");
      
      // First, update the UI with the uploaded file
      setUploadedFiles(prev => ({
        ...prev,
        featuredImage: fileData
      }));

      // Then, make API call to save the file reference
      await ComponentService.saveFileReference({
        type: 'featuredImage',
        fileData: fileData
      });

    } catch (error) {
      console.error('Error saving featured image:', error);
      setError('Failed to save featured image reference');
    }

  };

  const handleAttachmentsUpload = async (filesData) => {
    try {
      console.log("in handleAttachmentsUpload");
      
      // Update UI with new attachments
      setUploadedFiles(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...filesData]
      }));

      // Save each attachment reference
      await ComponentService.saveFileReference({
        type: 'attachment',
        fileData: filesData
      });

    } catch (error) {
      console.error('Error saving attachments:', error);
      setError('Failed to save attachment references');
    }
  };


  const handlePreview = (formData) => {
    setFormData(formData);
    setShowPreview(true);
  };

  const renderForm = () => {
    return (
      <Form
          onSubmit={handleFormSubmit}
          initialValues={{
            title: '',
            content: '',
            excerpt: '',
            featuredImage: null,
            attachments: []
          }}
          render={(formRenderProps) => (
            <FormElement style={{ maxWidth: 650 }}>
              {COMPONENT_FIELDS[selectedType.toUpperCase()]?.map((field) => (
                <div key={field.name} className="mb-3">
                  <Field
                    key={field.name}
                    id={field.name}
                    name={field.name}
                    label={field.label}
                    component={renderField}
                    fieldType={field.type}
                    validator={field.required ? (value) => {
                      if (field.type === 'editor') {
                        // Special validation for editor content
                        return (!value || value.trim() === '') ? "Content is required" : "";
                      }
                      return (!value) ? "This field is required" : "";
                    } : undefined}                  
                  />
                </div>
              ))}
              <div className="form-actions">
                {/* <Button
                  onClick={() => handlePreview(formRenderProps.valueGetter())}
                  icon="eye"
                  type="button"
                >
                  Preview
                </Button> */}
                <Button
                  type="submit"
                  themeColor="primary"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Create Component
                </Button>
                <Button 
                  type="button"
                  onClick={() => navigate('/components')}
                >
                  Cancel
                </Button>
              </div>
            </FormElement>
          )}
        />
    );
  };

  const renderField = (fieldProps) => {
    const { fieldType, ...others } = fieldProps;
    // console.log("renderField fieldType = " + fieldType);
    
    switch (fieldType) {
      case 'text':
        return (
          <Input
            {...others}
          />
        );
  
      case 'textarea':
        return (
          <Input
            {...others}
            multiline={true} 
            rows={4}
          />
        );
  
      case 'editor':
        return (
          <RichTextEditor
            {...others}
          />
        );
  
      case 'multipleImages':
      case 'image':
        return (
          <div className="form-group">
            <label className="k-label">{fieldProps.label}</label>
            <FileUpload
              onUploadComplete={handleFeaturedImageUpload}
              allowedExtensions={['.jpg', '.jpeg', '.png', '.gif']}
              multiple={false}
              maxFileSize={5242880} // 5MB
            />
            {formData.featuredImage && (
              <div className="image-preview">
                <img 
                  src={formData.featuredImage.url} 
                  alt="Featured" 
                  style={{ maxWidth: '200px' }} 
                />
              </div>
            )}
          </div>
        );
  
      case 'files':
        return (
          <div className="form-group">
            <label className="k-label">{fieldProps.label}</label>
            <FileUpload
              onUploadComplete={handleAttachmentsUpload}
              allowedExtensions={['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx']}
              multiple={true}
              maxFileSize={10485760} // 10MB
            />
            {formData.attachments && formData.attachments.length > 0 && (
              <div className="attachments-preview">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="attachment-item">
                    {file.fileType.match(/(jpg|jpeg|png|gif)$/) ? (
                      <img src={file.url} alt={file.originalName} />
                    ) : (
                      <div className="file-icon">
                        <i className="k-icon k-i-file" />
                        <span>{file.originalName}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
  
      default:
        return (
          <Input></Input>
        );
    }
  };
  

  if (!selectedType) {
    return (
      <div className="create-component-page">
        <h2>Select Component Type</h2>
        <div className="component-types-grid">
          {Object.entries(COMPONENT_TYPE_DETAILS).map(([type, details]) => (
            <Card
              key={type}
              className="component-type-card"
              onClick={() => handleTypeSelection(type)}
            >
              <CardHeader>
                <h4>{details.title}</h4>
              </CardHeader>
              <CardBody>
                <p>{details.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  
  return (
    <div className="create-component-page">
      {loading && <Loader type="infinite-spinner" />}

      {error && (
        <Notification
          type={{ style: 'error', icon: true }}
          closable={true}
          onClose={() => setError(null)}
        >
          {error}
        </Notification>
      )}

      <div className="page-header">
        <h2>
          {selectedType 
            ? `Create New ${COMPONENT_TYPE_DETAILS[selectedType].title}`
            : 'Select Component Type'
          }
        </h2>
        {selectedType && <Button onClick={() => navigate('/components')}>Cancel</Button>}
      </div>

      {selectedType && (
        renderForm()
      )}
      {showPreview && (
        <ComponentPreview
          data={formData}
          type={selectedType}
          onClose={() => setShowPreview(false)}
        />
      )}
  </div>

  );
};

export default CreateComponentPage;
