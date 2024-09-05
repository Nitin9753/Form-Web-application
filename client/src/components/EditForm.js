// src/components/EditForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getForm, updateForm } from '../utils/api';
import { Box, Button, Grid, TextField, MenuItem, Typography } from '@mui/material';

const inputTypes = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'password', label: 'Password' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
];

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', inputs: [] });
  const [newInputType, setNewInputType] = useState('text');
  const [newInputTitle, setNewInputTitle] = useState('');
  const [newInputPlaceholder, setNewInputPlaceholder] = useState('');

  useEffect(() => {
    const fetchForm = async () => {
      const response = await getForm(id);
      setFormData(response.data);
    };
    fetchForm().catch((err)=>{
        console.log('error while fetching the data');
        console.log(err);
    });;
  }, [id]);

  const handleInputChange = (index, key, value) => {
    const updatedInputs = [...formData.inputs];
    updatedInputs[index][key] = value;
    setFormData({ ...formData, inputs: updatedInputs });
  };

  const handleAddInput = () => {
    if (formData.inputs.length < 20) {
      const newInput = {
        type: newInputType,
        title: newInputTitle,
        placeholder: newInputPlaceholder,
      };
      setFormData({
        ...formData,
        inputs: [...formData.inputs, newInput],
      });
      setNewInputTitle('');
      setNewInputPlaceholder('');
    } else {
      alert('Maximum of 20 inputs allowed.');
    }
  };

  const handleDeleteInput = (index) => {
    const updatedInputs = formData.inputs.filter((_, i) => i !== index);
    setFormData({ ...formData, inputs: updatedInputs });
  };

  const handleSaveForm = async () => {
    await updateForm(id, formData).then(()=>{
        navigate('/');
    }).catch((err)=>{
        alert('failed to connect to server!');
        console.log('error while fetching the data');
        console.log(err);
    });;
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>Edit Form</Typography>
      <TextField
        fullWidth
        label="Form Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        variant="outlined"
        margin="normal"
      />
      <Grid container spacing={2}>
        {formData.inputs.map((input, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              fullWidth
              type={input.type}
              label={input.title}
              placeholder={input.placeholder}
              value={input.title}
              onChange={(e) => handleInputChange(index, 'title', e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <Button
              color="error"
              onClick={() => handleDeleteInput(index)}
              sx={{ mt: 1 }}
            >
              Delete
            </Button>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} mb={4}>
        <Typography variant="h6">Add New Input</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              select
              label="Input Type"
              value={newInputType}
              onChange={(e) => setNewInputType(e.target.value)}
              variant="outlined"
              margin="normal"
            >
              {inputTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Input Title"
              value={newInputTitle}
              onChange={(e) => setNewInputTitle(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Placeholder"
              value={newInputPlaceholder}
              onChange={(e) => setNewInputPlaceholder(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddInput}
              sx={{ mt: 2 }}
              fullWidth
            >
              Add Input
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveForm}
      >
        Save Form
      </Button>
    </Box>
  );
};

export default EditForm;
