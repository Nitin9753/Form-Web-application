// src/App.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import FormList from './components/FormList';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import ViewForm from './components/ViewForm';
import { Container, CssBaseline, AppBar, Toolbar, Typography, Fab, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';  
import { Home } from '@mui/icons-material';

const App = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
            <Home/>
          <Typography variant="h6" sx={{ margin: "0px 8px", flexGrow: 1 }}>
            Form Builder
          </Typography>
            
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<FormList />} />
          <Route path="/form/create" element={<CreateForm />} />
          <Route path="/form/:id/edit" element={<EditForm />} />
          <Route path="/form/:id" element={<ViewForm />} />
        </Routes>
        
      </Container>
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab color="success" aria-label="create" component={Link} to="/form/create">
          <AddIcon />
        </Fab>
      </Box>
    </>
    
  );
};

export default App;
