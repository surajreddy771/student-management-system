// src/components/layouts/DashboardLayout.jsx
import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, height: '64px', justifyContent: 'center' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Student Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#F4F6F8' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/students">
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem button component={Link} to="/add">
            <ListItemText primary="Add Student" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f9f9f9', p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
