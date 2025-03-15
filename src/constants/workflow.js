export const WORKFLOW_STATES = {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    PUBLISHED: 'published'
  };
  
  export const WORKFLOW_STATES_LABELS = {
    [WORKFLOW_STATES.DRAFT]: 'Draft',
    [WORKFLOW_STATES.PENDING_APPROVAL]: 'Pending Approval',
    [WORKFLOW_STATES.PUBLISHED]: 'Published'
  };
  
  export const WORKFLOW_STATES_COLORS = {
    [WORKFLOW_STATES.DRAFT]: 'warning',
    [WORKFLOW_STATES.PENDING_APPROVAL]: 'info',
    [WORKFLOW_STATES.PUBLISHED]: 'success'
  };
  