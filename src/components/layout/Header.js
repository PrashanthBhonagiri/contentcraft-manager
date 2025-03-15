import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar>
      <div className="header-container">
        <span 
          className="k-appbar-brand" 
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          ContentCraft Manager
        </span>
        <div className="k-appbar-spacer"></div>
        <Button 
          icon="plus"
          onClick={() => navigate('/components/create')}
        >
          Create Component
        </Button>
      </div>
    </AppBar>
  );
};

export default Header;
