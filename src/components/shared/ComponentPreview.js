import React from 'react';
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { COMPONENT_TYPE_DETAILS } from '../../constants/componentTypes';

const ComponentPreview = ({ data, type, onClose }) => {
  console.log(data);
  
  const renderPostPreview = () => (
    <div className="preview-content">
      {/* {data.featuredImage && (
        <div className="featured-image">
          <img 
            src={URL.createObjectURL(data.featuredImage)} 
            alt={data.title}
          />
        </div>
      )} */}
      <h1 className="preview-title">{data.title}</h1>
      {data.excerpt && (
        <div className="preview-excerpt">
          {data.excerpt}
        </div>
      )}
      <div 
        className="preview-body"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
      {data.attachments && data.attachments.length > 0 && (
        <div className="preview-attachments">
          <h3>Attachments</h3>
          <ul>
            {data.attachments.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderPreviewContent = () => {
    switch (type) {
      case 'post':
        return renderPostPreview();
      // Add cases for other component types
      default:
        return <div>Preview not available for this component type</div>;
    }
  };

  return (
    <Dialog 
      title={`Preview: ${COMPONENT_TYPE_DETAILS[type].title}`}
      onClose={onClose}
      width={800}
      height={600}
    >
      <div className="preview-container">
        {renderPreviewContent()}
      </div>
      <DialogActionsBar>
        <Button onClick={onClose}>Close Preview</Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default ComponentPreview;
