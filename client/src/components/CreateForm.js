// src/components/CreateForm.js
import React, { useState } from 'react';
import { createForm } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import { Button, TextField, Box, Typography, Grid } from '@mui/material';

const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([]);
  const navigate = useNavigate();

  const addInput = (type) => {
    setInputs([...inputs, { type, title: '', placeholder: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  const removeInput = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  const handleSubmit = async () => {
    await createForm({ title, inputs }).then(()=>{
        navigate('/');
    }).catch((err)=>{
        alert('failed to connect to server!');
        console.log('error while fetching the data');
        console.log(err);
    });;
 
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>{title==''?'Create New Form': title}</Typography>
      <TextField
        fullWidth
        label="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Grid container spacing={2}>
        {inputs.map((input, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <InputField
              input={input}
              index={index}
              handleInputChange={handleInputChange}
              removeInput={removeInput}
            />
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <Button sx={{margin: "5px"}} variant="contained" color="primary" onClick={() => addInput('text')}>Text</Button>
        <Button sx={{margin: "5px"}} variant="contained" color="primary" onClick={() => addInput('email')}>Email</Button>
        <Button sx={{margin: "5px"}} variant="contained" color="primary" onClick={() => addInput('password')}>Password</Button>
        <Button sx={{margin: "5px"}} variant="contained" color="primary" onClick={() => addInput('number')}>Number</Button>
        <Button sx={{margin: "5px"}} variant="contained" color="primary" onClick={() => addInput('date')}>Date</Button>
      </Box>
      <Box mt={4}>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Save Form
        </Button>
      </Box>
    </Box>
  );
};

export default CreateForm;
