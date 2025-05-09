import { useMemo } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import MKCard from "./MKCard.jsx";
import MKTypography from "./MKTypography.jsx";

function UpcomingPassedOut({ students }) {
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const passingStudents = useMemo(() => {
    return students.filter(student => {
      const enrollYear = parseInt(student.enrollmentYear);
      if (isNaN(enrollYear)) return false;
      const passOutYear = enrollYear + 4;
      return passOutYear === nextMonth.getFullYear();
    });
  }, [students]);

  return (
    <MKCard sx={{ width: "100%", maxWidth: 800 }}>
      <MKTypography variant="h5" textAlign="center" mb={2}>
        🎓 Students Passing Out This Year
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
            {passingStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center" }}>
                  No students passing out this year.
                </TableCell>
              </TableRow>
            ) : (
              passingStudents.map((student, index) => (
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

export default UpcomingPassedOut;
