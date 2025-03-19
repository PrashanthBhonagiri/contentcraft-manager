import React from 'react';
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from 'react-router-dom';

const ComingSoonPage = ({ 
  title = "Coming Soon", 
  description = "This feature is currently under development.", 
  showBackButton = true,
  backButtonText = "Go Back",
  additionalMessage = null
}) => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <div className="coming-soon-icon">
          <i className="k-icon k-i-gear" style={{ fontSize: '48px' }} />
        </div>
        
        <h1 className="coming-soon-title">{title}</h1>
        
        <p className="coming-soon-description">{description}</p>
        
        {additionalMessage && (
          <p className="coming-soon-additional">{additionalMessage}</p>
        )}

        {showBackButton && (
          <div className="coming-soon-actions">
            <Button
              themeColor="primary"
              onClick={() => navigate(-1)}
              icon="arrow-left"
            >
              {backButtonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComingSoonPage;
