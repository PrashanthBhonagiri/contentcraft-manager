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


// import React, { useState } from 'react';
// import { Grid, GridColumn } from "@progress/kendo-react-grid";
// import { Button } from "@progress/kendo-react-buttons";
// import { Chip } from "@progress/kendo-react-buttons";
// import { WORKFLOW_STATES_COLORS, WORKFLOW_STATES_LABELS } from '../constants/workflow';
// import { COMPONENT_TYPE_DETAILS } from '../constants/componentTypes';

// const ComponentsListPage = () => {
//   const [components, setComponents] = useState([]); // This would be fetched from your API

//   const StatusCell = (props) => {
//     const { dataItem } = props;
//     return (
//       <td>
//         <Chip
//           text={WORKFLOW_STATES_LABELS[dataItem.status]}
//           themeColor={WORKFLOW_STATES_COLORS[dataItem.status]}
//         />
//       </td>
//     );
//   };

//   const ActionCell = (props) => {
//     const { dataItem } = props;
    
//     const handleStatusChange = (newStatus) => {
//       // API call to update status
//       console.log(`Updating status to ${newStatus} for component ${dataItem.id}`);
//     };

//     return (
//       <td>
//         <Button
//           icon="edit"
//           onClick={() => console.log('Edit', dataItem)}
//           className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
//         >
//           Edit
//         </Button>
//         {dataItem.status === 'draft' && (
//           <Button
//             onClick={() => handleStatusChange('pending_approval')}
//             className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-info"
//           >
//             Submit for Approval
//           </Button>
//         )}
//         {dataItem.status === 'pending_approval' && (
//           <>
//             <Button
//               onClick={() => handleStatusChange('published')}
//               className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-success"
//             >
//               Approve
//             </Button>
//             <Button
//               onClick={() => handleStatusChange('draft')}
//               className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-error"
//             >
//               Reject
//             </Button>
//           </>
//         )}
//       </td>
//     );
//   };

//   return (
//     <div className="components-list">
//       <h2>Components</h2>
//       <Grid
//         data={components}
//         sortable={true}
//         filterable={true}
//         pageable={{ pageSizes: true }}
//       >
//         <GridColumn field="title" title="Title" />
//         <GridColumn
//           field="type"
//           title="Type"
//           cell={(props) => (
//             <td>{COMPONENT_TYPE_DETAILS[props.dataItem.type]?.title}</td>
//           )}
//         />
//         <GridColumn
//           field="status"
//           title="Status"
//           cell={StatusCell}
//         />
//         <GridColumn
//           field="createdAt"
//           title="Created At"
//           format="{0:dd/MM/yyyy}"
//         />
//         <GridColumn
//           title="Actions"
//           cell={ActionCell}
//         />
//       </Grid>
//     </div>
//   );
// };

// export default ComponentsListPage;
