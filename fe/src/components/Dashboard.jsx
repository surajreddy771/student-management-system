import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardHeader, CircularProgress, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import DashboardLayout from './layouts/DashboardLayout';

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

  const renderPieChart = (data) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4C4C'];
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
    <DashboardLayout>
      <Grid container spacing={3}>
        {/* Total Students Card */}
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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

        {/* Students by Department Card */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Students by Department" />
            <CardContent>
              {stats.isLoading ? (
                <CircularProgress />
              ) : (
                renderPieChart(stats.studentsByDepartment)
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Average Enrollment Year Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Average Enrollment Year" />
            <CardContent>
              {/* Calculate and display average enrollment year */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Dashboard;
