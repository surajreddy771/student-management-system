// src/components/Navbar.js
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Students List", path: "/students" },
    { label: "Add Student", path: "/add" },
  ];

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" color="primary">
          🎓 Student Database Management System
        </Typography>

        <Stack direction="row" spacing={2}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              color={location.pathname === item.path ? "primary" : "inherit"}
              sx={{ fontWeight: "bold" }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
