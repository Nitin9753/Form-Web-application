// src/components/ViewForm.js
import React, { useState, useEffect } from 'react';
import { getForm } from '../utils/api';
import { useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';

const ViewForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      const response = await getForm(id).then((response)=>{
          setFormData(response.data);
          const initialValues = {};
          response.data.inputs.forEach(input => {
            initialValues[input.title] = '';
          });
          setInputValues(initialValues);

      }).catch((err)=>{
        alert('failed to connect to server!');
        console.log('can not fetch the data');
        console.log(err);
      });
    };
    fetchForm();
  }, [id]);

  const handleInputChange = (title, value) => {
    setInputValues({
      ...inputValues,
      [title]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data: ", inputValues);
    alert('Form submitted! Check console for inputs');
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>{formData.title}</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {formData.inputs && formData.inputs.map((input, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                type={input.type}
                label={input.title}
                placeholder={input.placeholder}
                value={inputValues[input.title]}
                onChange={(e) => handleInputChange(input.title, e.target.value)}
                variant="outlined"
                margin="normal"
                required
              />
            </Grid>
          ))}
        </Grid>
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Submit Form
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ViewForm;
