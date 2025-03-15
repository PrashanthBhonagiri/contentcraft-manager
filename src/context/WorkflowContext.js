import React, { createContext, useContext, useState } from 'react';
import { WORKFLOW_STATES } from '../constants/workflow';

const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
  const [workflowState, setWorkflowState] = useState({
    components: []
  });

  const updateComponentStatus = async (componentId, newStatus) => {
    try {
      // API call to update status
      const updatedComponents = workflowState.components.map(component => 
        component.id === componentId 
          ? { ...component, status: newStatus }
          : component
      );
      setWorkflowState({ ...workflowState, components: updatedComponents });
      return true;
    } catch (error) {
      console.error('Error updating component status:', error);
      return false;
    }
  };

  const submitForApproval = (componentId) => {
    return updateComponentStatus(componentId, WORKFLOW_STATES.PENDING_APPROVAL);
  };

  const approveComponent = (componentId) => {
    return updateComponentStatus(componentId, WORKFLOW_STATES.PUBLISHED);
  };

  const rejectComponent = (componentId) => {
    return updateComponentStatus(componentId, WORKFLOW_STATES.DRAFT);
  };

  return (
    <WorkflowContext.Provider
      value={{
        components: workflowState.components,
        submitForApproval,
        approveComponent,
        rejectComponent
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => useContext(WorkflowContext);
