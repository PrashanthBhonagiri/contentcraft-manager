import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
