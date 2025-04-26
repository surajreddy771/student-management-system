import { useMemo } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import MKCard from "./MKCard.jsx";
import MKTypography from "./MKTypography.jsx";

function UpcomingEnrolledThisYear({ students }) {
  const currentYear = new Date().getFullYear();

  const enrolledThisYearStudents = useMemo(() => {
    return students.filter(student => {
      const enrollYear = parseInt(student.enrollmentYear);
      if (isNaN(enrollYear)) return false;
      return enrollYear === currentYear;
    });
  }, [students]);

  return (
    <MKCard sx={{ width: "100%", maxWidth: 800 }}>
      <MKTypography variant="h5" textAlign="center" mb={2}>
        📝 Students Enrolled This Year
      </MKTypography>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}><strong>ID</strong></TableCell>
              <TableCell style={{ textAlign: "center" }}><strong>First Name</strong></TableCell>
              <TableCell style={{ textAlign: "center" }}><strong>Last Name</strong></TableCell>
              <TableCell style={{ textAlign: "center" }}><strong>Department</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrolledThisYearStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center" }}>
                  No students enrolled this year.
                </TableCell>
              </TableRow>
            ) : (
              enrolledThisYearStudents.map((student, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: "center" }}>{student.studentId}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>{student.firstName}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>{student.lastName}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>{student.department}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </MKCard>
  );
}

export default UpcomingEnrolledThisYear;
