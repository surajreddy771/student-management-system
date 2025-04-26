import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Management System
          </Typography>
          <Button color="inherit" component={Link} to="/students">Students</Button>
          <Button color="inherit" component={Link} to="/add">Add Student</Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
