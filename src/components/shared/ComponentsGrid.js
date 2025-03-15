import React from 'react';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from 'react-router-dom';
import ComponentStatus from './ComponentStatus';
import { COMPONENT_TYPE_DETAILS } from '../../constants/componentTypes';

const ComponentsGrid = ({ data, onStatusChange, allowEdit = true }) => {
  const navigate = useNavigate();

  const ActionCell = (props) => {
    const { dataItem } = props;
    return (
      <td>
        {allowEdit && (
          <Button
            icon="edit"
            onClick={() => navigate(`/components/edit/${dataItem.id}`)}
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          >
            Edit
          </Button>
        )}
        {dataItem.status === 'draft' && (
          <Button
            onClick={() => onStatusChange(dataItem.id, 'pending_approval')}
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-info"
          >
            Submit for Approval
          </Button>
        )}
        {dataItem.status === 'pending_approval' && (
          <>
            <Button
              onClick={() => onStatusChange(dataItem.id, 'published')}
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-success"
            >
              Approve
            </Button>
            <Button
              onClick={() => onStatusChange(dataItem.id, 'draft')}
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-error"
            >
              Reject
            </Button>
          </>
        )}
      </td>
    );
  };

  return (
    <Grid
      data={data}
      sortable={true}
      filterable={true}
      pageable={{ pageSizes: true }}
    >
      <GridColumn field="title" title="Title" />
      <GridColumn 
        field="type" 
        title="Type"
        cell={(props) => (
          <td>{COMPONENT_TYPE_DETAILS[props.dataItem.type]?.title}</td>
        )}
      />
      <GridColumn
        field="status"
        title="Status"
        cell={(props) => (
          <td>
            <ComponentStatus status={props.dataItem.status} />
          </td>
        )}
      />
      <GridColumn 
        field="updatedAt" 
        title="Last Updated" 
        format="{0:dd MMM yyyy}"
      />
      <GridColumn title="Actions" cell={ActionCell} />
    </Grid>
  );
};

export default ComponentsGrid;
