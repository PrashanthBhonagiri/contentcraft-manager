import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardActions } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Chart, ChartSeries, ChartSeriesItem } from "@progress/kendo-react-charts";
import { COMPONENT_TYPE_DETAILS } from '../constants/componentTypes';
import { WORKFLOW_STATES_LABELS, WORKFLOW_STATES } from '../constants/workflow';

const HomePage = () => {
  const navigate = useNavigate();

  // This would come from your API
  const mockStats = {
    totalComponents: 12,
    byStatus: [
      { status: WORKFLOW_STATES.DRAFT, count: 5 },
      { status: WORKFLOW_STATES.PENDING_APPROVAL, count: 3 },
      { status: WORKFLOW_STATES.PUBLISHED, count: 4 }
    ],
    recentComponents: [
      { id: 1, title: 'Summer Event', type: 'event', status: WORKFLOW_STATES.DRAFT },
      { id: 2, title: 'Product Gallery', type: 'gallery', status: WORKFLOW_STATES.PUBLISHED },
      { id: 3, title: 'Feedback Form', type: 'form', status: WORKFLOW_STATES.PENDING_APPROVAL }
    ]
  };

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to ContentCraft Manager</h1>
        <p>Create and manage your website components from one central location.</p>
        <Button
          primary={true}
          icon="plus"
          onClick={() => navigate('/components/create')}
        >
          Create New Component
        </Button>
      </div>

      <div className="dashboard-grid">
        {/* Quick Stats Cards */}
        <div className="stats-section">
          <Card>
            <CardHeader>
              <h3>Quick Stats</h3>
            </CardHeader>
            <CardBody>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Total Components</span>
                  <span className="stat-value">{mockStats.totalComponents}</span>
                </div>
                {mockStats.byStatus.map(stat => (
                  <div key={stat.status} className="stat-item">
                    <span className="stat-label">{WORKFLOW_STATES_LABELS[stat.status]}</span>
                    <span className="stat-value">{stat.count}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Status Distribution Chart */}
        <Card>
          <CardHeader>
            <h3>Components by Status</h3>
          </CardHeader>
          <CardBody>
            <Chart>
              <ChartSeries>
                <ChartSeriesItem
                  type="pie"
                  data={mockStats.byStatus}
                  field="count"
                  categoryField="status"
                  tooltip={{ visible: true }}
                />
              </ChartSeries>
            </Chart>
          </CardBody>
        </Card>

        {/* Recent Components */}
        <Card>
          <CardHeader>
            <h3>Recent Components</h3>
          </CardHeader>
          <CardBody>
            <div className="recent-components-list">
              {mockStats.recentComponents.map(component => (
                <div key={component.id} className="recent-component-item">
                  <span className="component-title">{component.title}</span>
                  <span className="component-type">
                    {COMPONENT_TYPE_DETAILS[component.type].title}
                  </span>
                  <span className={`status-badge status-${component.status}`}>
                    {WORKFLOW_STATES_LABELS[component.status]}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
          <CardActions>
            <Button
              onClick={() => navigate('/components')}
              icon="arrow-right"
            >
              View All Components
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
