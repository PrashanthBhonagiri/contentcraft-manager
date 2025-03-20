import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@progress/kendo-react-buttons";
import { Notification } from "@progress/kendo-react-notification";
import { Loader } from "@progress/kendo-react-indicators";
import ComponentsGrid from '../components/shared/ComponentsGrid';
import { ComponentService } from '../services/api';

const ComponentsListPage = () => {
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const data = await ComponentService.getAllComponents();
      setComponents(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch components');
      console.error('Error fetching components:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await ComponentService.updateComponentStatus(id, newStatus);
      await fetchComponents(); // Refresh the list
      setError(null);
    } catch (err) {
      setError('Failed to update component status');
      console.error('Error updating status:', err);
    }
  };

  if (loading) {
    return <Loader type="infinite-spinner" />;
  }

  return (
    <div className="components-page">
      <div className="page-header">
        <h2>All Components</h2>
        <Button
          primary={true}
          icon="plus"
          onClick={() => navigate('/components/create')}
        >
          Create New Component
        </Button>
      </div>

      {error && (
        <Notification
          type={{ style: 'error', icon: true }}
          closable={true}
          onClose={() => setError(null)}
        >
          {error}
        </Notification>
      )}

      <ComponentsGrid 
        data={components}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default ComponentsListPage;