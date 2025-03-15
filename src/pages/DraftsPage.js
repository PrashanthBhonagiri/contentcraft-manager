import React, { useState, useEffect } from 'react';
import ComponentsGrid from '../components/shared/ComponentsGrid';
import { WORKFLOW_STATES } from '../constants/workflow';

const DraftsPage = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    // Mock data - replace with actual API call
    const mockDrafts = [
      {
        id: 1,
        title: 'New Blog Post',
        type: 'post',
        status: WORKFLOW_STATES.DRAFT,
        updatedAt: new Date(),
      },
      // Add more mock data
    ];
    setDrafts(mockDrafts);
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    // Replace with actual API call
    console.log(`Updating status for draft ${id} to ${newStatus}`);
  };

  return (
    <div className="drafts-page">
      <div className="page-header">
        <h2>Draft Components</h2>
      </div>
      
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <ComponentsGrid 
          data={drafts}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default DraftsPage;
