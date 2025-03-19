import React, { useState, useEffect } from 'react';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';
import { useNavigate, useParams } from 'react-router-dom';
import { ContentCollectionService } from '../../services/contentCollectionService';
import GroupManagement from '../../components/collections/GroupManagement';

const ContentCollectionForm = () => {
  const [collection, setCollection] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchCollection();
    }
  }, [id]);

  const fetchCollection = async () => {
    try {
      const data = await ContentCollectionService.getCollectionById(id);
      setCollection(data);
    } catch (error) {
      console.error('Error fetching collection:', error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (id) {
        await ContentCollectionService.updateCollection(id, data);
      } else {
        await ContentCollectionService.createCollection(data);
      }
      navigate('/content-collections');
    } catch (error) {
      console.error('Error saving collection:', error);
    }
  };

  return (
    <div className="collection-form-container">
      <h1>{id ? 'Edit' : 'Create'} Content Collection</h1>
      <div className="collection-form-section">
        <Form
          onSubmit={handleSubmit}
          initialValues={collection || {}}
          render={(formRenderProps) => (
            <FormElement>
              <Field name="name" component={Input} label="Name" />
              <Field name="description" component={Input} label="Description" />
              <Field
                name="settings.layout.type"
                component={DropDownList}
                label="Layout Type"
                data={['flexible', 'grid', 'list']}
              />
              <Field
                name="settings.layout.columns"
                component={NumericTextBox}
                label="Columns"
                min={1}
                max={6}
              />
              <Field
                name="settings.layout.displayStyle"
                component={DropDownList}
                label="Display Style"
                data={['cards', 'minimal', 'detailed']}
              />
              <Button type="submit" disabled={!formRenderProps.allowSubmit}>
                {id ? 'Update' : 'Create'} Collection
              </Button>
            </FormElement>
          )}
        />
      </div>

      {id && (
        <div className="collection-groups-section">
          <GroupManagement
            collectionId={id}
            existingGroups={collection?.groups || []}
            onGroupsUpdate={fetchCollection}
          />
        </div>
      )}
    </div>
  );
};

export default ContentCollectionForm;
