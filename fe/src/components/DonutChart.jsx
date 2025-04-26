// components/DepartmentTable.jsx
import { useMemo } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import MKCard from "./MKCard.jsx";
import MKTypography from "./MKTypography.jsx";

function DepartmentTable({ students }) {
  const data = useMemo(() => {
    const counts = {};
    students.forEach(student => {
      if (student.department) {
        counts[student.department] = (counts[student.department] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([dept, count]) => ({ department: dept, count }));
  }, [students]);

  return (
    <MKCard sx={{ width: "100%" }}>
      <MKTypography variant="h6" textAlign="center" mb={2}>
        Students by Department
      </MKTypography>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Number of Students</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MKCard>
  );
}

export default DepartmentTable;
