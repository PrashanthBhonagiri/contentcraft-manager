import React, { useEffect, useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { useNavigate } from 'react-router-dom';
import { ContentCollectionService } from '../../services/contentCollectionService';

const ContentCollectionsList = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const data = await ContentCollectionService.getAllCollections();
      setCollections(data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/content-collections/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      try {
        await ContentCollectionService.deleteCollection(id);
        fetchCollections();
      } catch (error) {
        console.error('Error deleting collection:', error);
      }
    }
  };

  return (
    <div>
      <h1>Content Collections</h1>
      <Button onClick={() => navigate('/content-collections/new')}>Create New Collection</Button>
      <Grid data={collections}>
        <GridColumn field="name" title="Name" />
        <GridColumn field="description" title="Description" />
        <GridColumn field="settings.layout.type" title="Layout" />
        <GridColumn
          title="Actions"
          cell={(props) => (
            <td>
              <Button onClick={() => handleEdit(props.dataItem._id)}>Edit</Button>
              <Button onClick={() => handleDelete(props.dataItem._id)}>Delete</Button>
            </td>
          )}
        />
      </Grid>
    </div>
  );
};

export default ContentCollectionsList;
