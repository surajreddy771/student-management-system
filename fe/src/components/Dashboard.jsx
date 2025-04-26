import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardHeader, CircularProgress, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4C4C'];

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    studentsByDepartment: [],
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalRes = await axios.get(`${process.env.REACT_APP_API_BASE}/students`);
        const activeRes = await axios.get(`${process.env.REACT_APP_API_BASE}/students/active`);
        const departmentsRes = await axios.get(`${process.env.REACT_APP_API_BASE}/students/departments`);
        
        setStats({
          totalStudents: totalRes.data.length,
          activeStudents: activeRes.data.length,
          studentsByDepartment: departmentsRes.data,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    fetchData();
  }, []);

  const renderPieChart = (data) => (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );

  if (stats.isLoading) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h5" color="primary">
            Student Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Total Students */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h4">{stats.totalStudents}</Typography>
            </Card>
          </Grid>

          {/* Active Students */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Active Students
              </Typography>
              <Typography variant="h4">{stats.activeStudents}</Typography>
            </Card>
          </Grid>

          {/* Students by Department Pie Chart */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Students by Department
              </Typography>
              {renderPieChart(stats.studentsByDepartment)}
            </Card>
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button component={Link} to="/students" variant="contained" color="primary" size="large">
                View Students
              </Button>
              <Button component={Link} to="/add" variant="outlined" color="primary" size="large">
                Add Student
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
