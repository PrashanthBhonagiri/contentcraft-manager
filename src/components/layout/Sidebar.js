import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import {homeIcon, folderMoreIcon, gridIcon } from '@progress/kendo-svg-icons';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: 'Dashboard',
      svgIcon: homeIcon,
      path: '/',
    },
    {
      text: 'Components',
      svgIcon: gridIcon,
      path: '/components',
    },
    {
      text: 'content collection',
      svgIcon: folderMoreIcon,
      path: '/content-collections',
    }
  ];

  const onSelect = (event) => {
    navigate(event.target.props.route);
};

  return (
    <div className="sidebar">
      <PanelBar onSelect={onSelect}>
        {menuItems.map((item) => (
          <PanelBarItem
            key={item.text}
            title={item.text}
            svgIcon={item.svgIcon}
            selected={location.pathname.startsWith(item.path)}
            route={item.path}
          />
        ))}
      </PanelBar>
    </div>
  );
};

export default Sidebar;
