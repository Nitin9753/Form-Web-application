// src/components/InputField.js
import React from 'react';
import { TextField, Box, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const InputField = ({ input, index, handleInputChange, removeInput }) => {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <TextField
        label="Input Title"
        value={input.title}
        onChange={(e) => handleInputChange(index, 'title', e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Placeholder"
        value={input.placeholder}
        onChange={(e) => handleInputChange(index, 'placeholder', e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label={input.title || 'Input'}
        type={input.type}
        placeholder={input.placeholder}
        variant="outlined"
        margin="normal"
        fullWidth
        InputProps={{ readOnly: true }}
      />
      <IconButton color="secondary" onClick={() => removeInput(index)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default InputField;
