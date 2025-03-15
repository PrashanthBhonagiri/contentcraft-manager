import React, { useState, useEffect } from 'react';
import ComponentsGrid from '../components/shared/ComponentsGrid';
import { WORKFLOW_STATES } from '../constants/workflow';

const PublishedComponentsPage = () => {
  const [publishedComponents, setPublishedComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedComponents();
  }, []);

  const fetchPublishedComponents = async () => {
    // Mock data - replace with actual API call
    const mockPublished = [
      {
        id: 1,
        title: 'Main Navigation',
        type: 'navigation',
        status: WORKFLOW_STATES.PUBLISHED,
        updatedAt: new Date(),
      },
      // Add more mock data
    ];
    setPublishedComponents(mockPublished);
    setLoading(false);
  };

  return (
    <div className="published-components-page">
      <div className="page-header">
        <h2>Published Components</h2>
      </div>
      
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <ComponentsGrid 
          data={publishedComponents}
          onStatusChange={() => {}}
          allowEdit={false}
        />
      )}
    </div>
  );
};

export default PublishedComponentsPage;
