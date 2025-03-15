import React, { useState } from 'react';
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Upload } from "@progress/kendo-react-upload";
import { Editor } from "@progress/kendo-react-editor";
import { DateTimePicker } from "@progress/kendo-react-dateinputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { WORKFLOW_STATES } from '../../constants/workflow';
import { COMPONENT_FIELDS } from '../../constants/componentInterfaces';

const ComponentForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    status: WORKFLOW_STATES.DRAFT
  });

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return <Input name={field.name} label={field.label} required={field.required} />;
      
      case 'textarea':
        return <Input multiline={true} name={field.name} label={field.label} required={field.required} />;
      
      case 'editor':
        return <Editor name={field.name} />;
      
      case 'datetime':
        return <DateTimePicker name={field.name} label={field.label} />;
      
      case 'image':
        return (
          <Upload
            name={field.name}
            restrictions={{
              allowedExtensions: ['.jpg', '.png', '.gif'],
              maxFileSize: 5242880
            }}
          />
        );
      
      case 'files':
        return (
          <Upload
            name={field.name}
            multiple={true}
            restrictions={{
              maxFileSize: 10485760
            }}
          />
        );
      
      case 'multipleImages':
        return (
          <Upload
            name={field.name}
            multiple={true}
            restrictions={{
              allowedExtensions: ['.jpg', '.png', '.gif'],
              maxFileSize: 5242880
            }}
          />
        );
      
      default:
        return null;
    }
  };

  const handleSubmit = (data) => {
    onSubmit({ ...data, type, status: formData.status });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <FormElement>
          {COMPONENT_FIELDS[type].map((field) => (
            <div key={field.name} className="mb-3">
              <Field
                name={field.name}
                component={renderField(field)}
                label={field.label}
              />
            </div>
          ))}
          
          <div className="form-actions">
            <DropDownList
              data={Object.values(WORKFLOW_STATES)}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.value })}
              label="Status"
            />
            <button
              type="submit"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              disabled={!formRenderProps.allowSubmit}
            >
              Save Component
            </button>
          </div>
        </FormElement>
      )}
    />
  );
};

export default ComponentForm;
