import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardHeader, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    studentsByCourse: [],
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalRes = await axios.get(`${process.env.REACT_APP_API_BASE}/students`);
        const activeRes = await axios.get(`${process.env.REACT_APP_API_BASE}/students/active`);
        const coursesRes = await axios.get(`${process.env.REACT_APP_API_BASE}/students/courses`);
        
        setStats({
          totalStudents: totalRes.data.length,
          activeStudents: activeRes.data.length,
          studentsByCourse: coursesRes.data,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  const renderPieChart = (data) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
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
  };

  return (
    <div>
      <AppBar position="sticky" sx={{ height: '80px' }}>
        <Toolbar>
          <Typography variant="h6">Student Management System</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Total Students Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Total Students" />
              <CardContent>
                {stats.isLoading ? (
                  <CircularProgress />
                ) : (
                  <Typography variant="h5">{stats.totalStudents}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Active Students Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Active Students" />
              <CardContent>
                {stats.isLoading ? (
                  <CircularProgress />
                ) : (
                  <Typography variant="h5">{stats.activeStudents}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Students by Course Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Students by Course" />
              <CardContent>
                {stats.isLoading ? (
                  <CircularProgress />
                ) : (
                  renderPieChart(stats.studentsByCourse)
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Additional statistics */}
          {/* Example: Students by Department */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Students by Department" />
              <CardContent>
                {/* Render bar chart or other type of statistics here */}
              </CardContent>
            </Card>
          </Grid>
          
          {/* Example: Average Enrollment Year */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Average Enrollment Year" />
              <CardContent>
                {/* Calculate and display average enrollment year */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Actions */}
        <Grid container spacing={2} mt={4}>
          <Grid item>
            <Link to="/students">
              <Card sx={{ width: 200, padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">View Students</Typography>
              </Card>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/add">
              <Card sx={{ width: 200, padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">Add Student</Typography>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;
