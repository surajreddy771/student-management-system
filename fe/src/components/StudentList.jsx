import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import MKButton from "./MKButton.jsx";
import MKTypography from "./MKTypography.jsx";
import MKCard from "./MKCard.jsx";
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
    <MKCard style={{ maxWidth: '1450px', margin: '2rem auto 2rem', display: 'block', padding: '2rem' }}>
      <MKTypography variant="h4">Student List</MKTypography>
      <MKButton onClick={() => navigate('/add')} color="primary" style={{ marginBottom: "1rem" }}>
        Add New Student
      </MKButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['Student ID', 'First Name', 'Last Name', 'Email', 'Date of Birth', 'Department', 'Enrollment Year', 'Status', 'Actions'].map((header, idx) => (
                <TableCell key={idx} style={{ textAlign: "center" }}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(student => (
              <TableRow key={student._id}>
                <TableCell style={{ textAlign: "center" }}>{student.studentId}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{student.firstName}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{student.lastName}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{student.email}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{student.dob?.substring(0, 10)}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{student.department}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{student.enrollmentYear}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
  {student.isActive ? 'Active' : 'Inactive'}
</TableCell>

                <TableCell style={{ textAlign: "center" }}>
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
