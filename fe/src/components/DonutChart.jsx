import { useMemo } from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
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
    return counts;
  }, [students]);

  const departments = Object.keys(data);
  const counts = Object.values(data);

  return (
    <MKCard sx={{ width: "100%", p: 2 }}>
      <MKTypography variant="h6" textAlign="center" mb={2}>
        Students by Department
      </MKTypography>
      
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Dept</TableCell>
              {departments.map((dept, index) => (
                <TableCell key={index} style={{ textAlign: "center" }}>
                  {dept}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Students</TableCell>
              {counts.map((count, index) => (
                <TableCell key={index} style={{ textAlign: "center" }}>
                  {count}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </MKCard>
  );
}

export default DepartmentTable;
