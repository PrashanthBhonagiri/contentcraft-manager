import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { COMPONENT_TYPE_DETAILS } from '../../constants/componentTypes';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Welcome to ContentCraft Manager</h2>
      
      <div className="stats-section">
        <Card>
          <CardBody>
            <h4>Quick Stats</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total Components</span>
                <span className="stat-value">0</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Pending Approval</span>
                <span className="stat-value">0</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Published</span>
                <span className="stat-value">0</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <h3>Create New Component</h3>
      <div className="component-types-grid">
        {Object.entries(COMPONENT_TYPE_DETAILS).map(([type, details]) => (
          <Card key={type} className="component-type-card">
            <CardHeader className="k-hbox">
              <h4>{details.title}</h4>
            </CardHeader>
            <CardBody>
              <p>{details.description}</p>
              <Button
                primary={true}
                onClick={() => navigate(`/components/create?type=${type}`)}
              >
                Create {details.title}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
