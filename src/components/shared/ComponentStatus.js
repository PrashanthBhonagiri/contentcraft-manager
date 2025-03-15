import React from 'react';
import { Chip } from "@progress/kendo-react-buttons";
import { WORKFLOW_STATES_COLORS, WORKFLOW_STATES_LABELS } from '../../constants/workflow';

const ComponentStatus = ({ status }) => {
  return (
    <Chip
      text={WORKFLOW_STATES_LABELS[status]}
      themeColor={WORKFLOW_STATES_COLORS[status]}
      size="small"
    />
  );
};

export default ComponentStatus;
