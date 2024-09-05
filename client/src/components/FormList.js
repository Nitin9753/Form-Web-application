// src/components/FormList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { getForms, deleteForm } from '../utils/api';

const FormList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const response = await getForms();
      setForms(response.data);
    };
    fetchForms().catch((err)=>{
        alert('failed to connect to server!');
        console.log('error while fetching the data');
        console.log(err);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteForm(id).catch((err)=>{
        alert('failed to connect to server!');
        console.log('error while fetching the data');
        console.log(err);
    });;
      setForms(forms.filter((form) => form._id !== id)); // Update the UI after deletion
    } catch (error) {
      console.error('Failed to delete the form:', error);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Available Forms
      </Typography>
      <Grid container spacing={3}>
        {forms.map((form) => (
          <Grid item xs={12} sm={6} md={4} key={form._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {form.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" component={Link} to={`/form/${form._id}`}>
                  View
                </Button>
                <Button size="small" color="secondary" component={Link} to={`/form/${form._id}/edit`}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={() => handleDelete(form._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FormList;
