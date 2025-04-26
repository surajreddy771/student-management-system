import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Typography, Button, Stack
} from '@mui/material';
import { toast } from 'react-toastify';

function StudentList() {
  const [students, setStudents] = useState([]);

  // Fetch students on component mount
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/students`)
      .then(res => setStudents(res.data))
      .catch(() => toast.error('Error fetching students'));
  }, []);

  // Handle student deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete(`${process.env.REACT_APP_API_BASE}/students/${id}`)
        .then(() => {
          setStudents(students.filter(s => s._id !== id));
          toast.success('Student deleted');
        })
        .catch(() => toast.error('Error deleting student'));
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Student List</Typography>
      <Button variant="contained" component={Link} to="/add" sx={{ mb: 2 }}>Add Student</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Enrollment Year</TableCell>
            <TableCell>Active Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <TableRow key={student._id}>
              <TableCell>{student.studentId}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.dob}</TableCell>
              <TableCell>{student.department}</TableCell>
              <TableCell>{student.enrollmentYear}</TableCell>
              <TableCell>{student.isActive ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button component={Link} to={`/edit/${student._id}`} variant="outlined">Edit</Button>
                  <Button onClick={() => handleDelete(student._id)} variant="contained" color="error">Delete</Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StudentList;
