import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import AppRoutes from '../../routes/AppRoutes';

const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-wrapper">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

    