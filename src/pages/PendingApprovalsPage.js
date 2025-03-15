import React, { useState, useEffect } from 'react';
import ComponentsGrid from '../components/shared/ComponentsGrid';
import { WORKFLOW_STATES } from '../constants/workflow';

const PendingApprovalsPage = () => {
  const [pendingComponents, setPendingComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingComponents();
  }, []);

  const fetchPendingComponents = async () => {
    // Mock data - replace with actual API call
    const mockPending = [
      {
        id: 1,
        title: 'Event Calendar',
        type: 'event',
        status: WORKFLOW_STATES.PENDING_APPROVAL,
        updatedAt: new Date(),
      },
      // Add more mock data
    ];
    setPendingComponents(mockPending);
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    // Replace with actual API call
    console.log(`Updating status for component ${id} to ${newStatus}`);
  };

  return (
    <div className="pending-approvals-page">
      <div className="page-header">
        <h2>Pending Approvals</h2>
      </div>
      
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <ComponentsGrid 
          data={pendingComponents}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default PendingApprovalsPage;
