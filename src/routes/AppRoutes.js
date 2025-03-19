import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ComponentsListPage from '../pages/ComponentsListPage';
import CreateComponentPage from '../pages/CreateComponentPage';
import ContentCollectionsList from '../pages/ContentCollections/ContentCollectionsList';
import ContentCollectionForm from '../pages/ContentCollections/ContentCollectionForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/components" element={<ComponentsListPage />} />
      <Route path="/components/create" element={<CreateComponentPage />} />
      <Route path="/content-collections" element={<ContentCollectionsList />} />
      <Route path="/content-collections/new" element={<ContentCollectionForm />} />
      <Route path="/content-collections/:id" element={<ContentCollectionForm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
