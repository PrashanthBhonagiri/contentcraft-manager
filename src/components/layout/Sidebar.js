import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: 'Dashboard',
      icon: 'home',
      path: '/',
    },
    {
      text: 'Components',
      icon: 'grid',
      path: '/components',
    },
  ];
  const handleSelect = (e) => {
    // console.log("handleSelect");
    
    const path = e.target.props.path;
    // console.log(e.target);
    // console.log(e.target.props);
    // console.log(path);
    
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="sidebar">
      <PanelBar onSelect={handleSelect}>
        {menuItems.map((item) => (
          <PanelBarItem
            key={item.text}
            title={item.text}
            icon={item.icon}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            
          />
        ))}
      </PanelBar>
    </div>
  );
};

export default Sidebar;
