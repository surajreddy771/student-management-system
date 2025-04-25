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

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/students`)
      .then(res => setStudents(res.data))
      .catch(() => toast.error('Error fetching students'));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_BASE}/students/${id}`)
      .then(() => {
        setStudents(students.filter(s => s._id !== id));
        toast.success('Student deleted');
      })
      .catch(() => toast.error('Error deleting student'));
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Student List</Typography>
      <Button variant="contained" component={Link} to="/add" sx={{ mb: 2 }}>Add Student</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <TableRow key={student._id}>
              <TableCell>{student.firstName} {student.lastName}</TableCell>
              <TableCell>{student.email}</TableCell>
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
