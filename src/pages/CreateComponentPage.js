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


const CreateComponentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const type = searchParams.get('type');
    if (type && COMPONENT_TYPES[type.toUpperCase()]) {
      setSelectedType(type);
    }
  }, [searchParams]);

  const handleTypeSelection = (type) => {
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
        content: {}, // Initialize content object
        status: 'draft'
      };

      switch (selectedType) {
        case 'post':
          componentData.content = {
            body: formData.content,
            excerpt: formData.excerpt || '',
            featuredImage: formData.featuredImage || null,
            attachments: formData.attachments || []
          };
          break;

        case 'event':
          componentData.content = {
            description: formData.content,
            startDate: formData.startDate,
            endDate: formData.endDate,
            location: formData.location,
            eventImage: formData.eventImage
          };
          break;

        case 'gallery':
          componentData.content = {
            description: formData.description,
            images: formData.images || []
          };
          break;

        case 'form':
          componentData.content = {
            description: formData.description,
            fields: formData.formFields || []
          };
          break;

        default:
          throw new Error('Invalid component type');
      }

      console.log('Prepared component data:', componentData);

      // Send to backend
      const result = await ComponentService.createComponent(componentData);
      console.log('Creation result:', result);
      navigate('/components');
    } catch (err) {
      setError('Failed to create component');
      console.error('Error creating component:', err);
    } finally {
      setLoading(false);
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
          <Upload
            {...others}
            restrictions={{
              allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif'],
              maxFileSize: 5242880
            }}
          />
        );
  
      case 'files':
        return (
          <Upload
            {...others}
            multiple={true}
            restrictions={{
              maxFileSize: 10485760
            }}
          />
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
        {/* <div className="page-actions">
          <Button 
            icon="eye"
            onClick={() => handlePreview(formData)}
          >
            Preview
          </Button>
        </div> */}
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
