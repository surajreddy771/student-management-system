// Dashboard.jsx
import MKTypography from "./MKTypography.jsx";
import MKCard from "./MKCard.jsx";
import { Stack } from "@mui/material";
import MKButton from "./MKButton.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Stack alignItems="center" justifyContent="center" height="80vh">
      <MKCard sx={{ textAlign: "center" }}>
        <MKTypography variant="h3">Welcome to Student Management System</MKTypography>
        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <MKButton onClick={() => navigate('/students')}>View Students</MKButton>
          <MKButton color="secondary" onClick={() => navigate('/add')}>Add New Student</MKButton>
        </Stack>
      </MKCard>
    </Stack>
  );
}

export default Dashboard;
