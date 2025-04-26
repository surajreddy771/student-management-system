import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKCard from "components/MKCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/students`)
      .then(res => setStudents(res.data))
      .catch(() => toast.error('Error fetching students'));
  }, []);

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
    <MKCard>
      <MKTypography variant="h4">Student List</MKTypography>
      <MKButton onClick={() => navigate('/add')} color="primary" style={{ marginBottom: "1rem" }}>
        Add New Student
      </MKButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
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
                <TableCell>
                  <MKButton size="small" color="primary" onClick={() => navigate(`/edit/${student._id}`)}>Edit</MKButton>
                  &nbsp;
                  <MKButton size="small" color="error" onClick={() => handleDelete(student._id)}>Delete</MKButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MKCard>
  );
}

export default StudentList;
