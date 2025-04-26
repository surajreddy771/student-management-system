// Dashboard.jsx
import { useEffect, useState } from "react";
import { Stack, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import MKTypography from "./MKTypography.jsx";
import MKCard from "./MKCard.jsx";
import MKButton from "./MKButton.jsx";
import StatsCard from "./StatsCard.jsx";
import DepartmentTable from "./DonutChart.jsx";  // Changed the name for clarity
import UpcomingPassedOut from "./UpcomingPassedOut.jsx";
import UpcomingEnrolledThisYear from "./UpcomingEnrolledThisYear.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/students`)
      .then(res => setStudents(res.data))
      .catch(() => toast.error("Failed to load students"));
  }, []);

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.isActive).length;
  const departments = [...new Set(students.map(s => s.department))];

  return (
    <Stack spacing={6} alignItems="center" padding={4}>
      {/* Quick Stats Cards */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Total Students" value={totalStudents} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Active Students" value={activeStudents} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* Render Department Table */}
          <DepartmentTable students={students} />
        </Grid>
      </Grid>

      {/* Upcoming Passed Out Students */}
      <UpcomingPassedOut students={students} />
      {/* Upcoming Enrolled Students This Year */}
      <UpcomingEnrolledThisYear students={students} />
    </Stack>
  );
}

export default Dashboard;
