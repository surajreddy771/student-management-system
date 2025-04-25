import { Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Welcome to the Student Management System</Typography>
      <Typography variant="body1">Manage your student records easily using the buttons below.</Typography>
      <Stack direction="row" spacing={2} mt={4}>
        <Button component={Link} to="/students" variant="contained">View Students</Button>
        <Button component={Link} to="/add" variant="outlined">Add Student</Button>
      </Stack>
    </div>
  );
}

export default Dashboard;
