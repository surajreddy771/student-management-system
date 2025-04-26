// components/UpcomingPassedOut.jsx
import { useMemo } from "react";
import { Stack } from "@mui/material";
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

  if (passingStudents.length === 0) return null;

  return (
    <MKCard sx={{ width: "100%", maxWidth: 800 }}>
      <MKTypography variant="h5" mb={2}>
        🎓 Students Passing Out Next Month
      </MKTypography>
      <Stack spacing={1}>
        {passingStudents.map(student => (
          <MKTypography key={student._id} variant="body1">
            {student.firstName} {student.lastName} ({student.department})
          </MKTypography>
        ))}
      </Stack>
    </MKCard>
  );
}

export default UpcomingPassedOut;
