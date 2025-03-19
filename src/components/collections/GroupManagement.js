import React, { useState, useEffect } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { ComponentService } from '../../services/api';
import { ContentCollectionService } from '../../services/contentCollectionService';

const GroupManagement = ({ collectionId, existingGroups, onGroupsUpdate }) => {
  const [availableComponents, setAvailableComponents] = useState([]);
  const [showComponentSelector, setShowComponentSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);

  // Fetch available post components
  useEffect(() => {
    fetchAvailableComponents();
  }, []);

  const fetchAvailableComponents = async () => {
    try {
      setLoading(true);
      // Fetch only post type components
      const components = await ComponentService.getAllComponents({ type: 'post' });
      setAvailableComponents(components);
    } catch (error) {
      console.error('Error fetching components:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComponents = async () => {
    try {
      setLoading(true);
      // Create a new group with selected components
      const newGroup = {
        type: 'single',
        components: selectedComponents.map(comp => comp._id),
        settings: {
          layout: 'full-width'
        }
      };

      await ContentCollectionService.addGroup(collectionId, newGroup);
      setShowComponentSelector(false);
      setSelectedComponents([]);
      onGroupsUpdate(); // Trigger parent refresh
    } catch (error) {
      console.error('Error adding components:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveGroup = async (groupId, componentId) => {
    // logic to remove any component from a group 
  };

  const ComponentSelector = () => (
    <Dialog title="Add Components" onClose={() => setShowComponentSelector(false)}>
      <Grid
        data={availableComponents}
        selectedField="selected"
        onSelectionChange={(e) => {
          const selectedItems = e.dataItems;
          setSelectedComponents(selectedItems);
        }}
        selectable={{
          enabled: true,
          mode: 'multiple'
        }}
      >
        <GridColumn field="title" title="Component Title" />
        <GridColumn field="status" title="Status" />
        <GridColumn 
          field="createdAt" 
          title="Created At"
          format="{0:dd MMM yyyy}"
        />
      </Grid>
      <DialogActionsBar>
        <Button 
          onClick={handleAddComponents} 
          disabled={selectedComponents.length === 0 || loading}
          themeColor="primary"
        >
          Add Selected Components
        </Button>
        <Button onClick={() => setShowComponentSelector(false)}>Cancel</Button>
      </DialogActionsBar>
    </Dialog>
  );

  return (
    <div className="group-management">
      <h3>Components in Collection</h3>
      <Button
        onClick={() => setShowComponentSelector(true)}
        icon="plus"
        themeColor="primary"
      >
        Add Components
      </Button>

      {existingGroups?.map((group, index) => (
        <div key={group._id || index} className="group-item">
          <h4>Group {index + 1}</h4>
          {/* {console.log('group.components:', group.components)} */}
          {group.components ? (
            <Grid
            data={group.components.map(id =>({id:id}))}
          >
            <GridColumn 
                field="id" 
                title="Component ID" 
                width="400px"
                cell={(props) => (
                    <td>{props.dataItem.id}</td>
                )}
            />
            <GridColumn 
              title="Actions" 
              width="200px"
              cell={(props) => (
                <td>
                  <Button
                    onClick={() => handleRemoveGroup(group._id, props.dataItem.id)}
                    icon="trash"
                    themeColor="error"
                  >
                    Remove
                  </Button>
                </td>
              )}
            />
          </Grid>
          ): (
            <div>No components available</div>
          )}
        </div>
      ))}

      {showComponentSelector && <ComponentSelector />}
    </div>
  );
};

export default GroupManagement;
