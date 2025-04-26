import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, FormControlLabel, Checkbox, Stack } from "@mui/material";
import MKButton from "../MKButton.jsx";
import MKTypography from "../MKTypography.jsx";
import MKCard from "../MKCard.jsx";
import { toast } from "react-toastify";

function AddStudent() {
  const [form, setForm] = useState({
    studentId: "", firstName: "", lastName: "", email: "", dob: "", department: "", enrollmentYear: "", isActive: true
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_BASE}/students`, form)
      .then(() => {
        toast.success('Student added');
        navigate('/students');
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Error adding student');
      });
  };

  return (
    <MKCard>
      <form onSubmit={handleSubmit}>
        <MKTypography variant="h4">Add Student</MKTypography>
        <Stack spacing={2}>
          <TextField name="studentId" label="Student ID" value={form.studentId} onChange={handleChange} required />
          <TextField name="firstName" label="First Name" value={form.firstName} onChange={handleChange} required />
          <TextField name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} required />
          <TextField name="email" type="email" label="Email" value={form.email} onChange={handleChange} required />
          <TextField name="dob" type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} value={form.dob} onChange={handleChange} required />
          <TextField name="department" label="Department" value={form.department} onChange={handleChange} required />
          <TextField name="enrollmentYear" type="number" label="Enrollment Year" value={form.enrollmentYear} onChange={handleChange} required />
          <FormControlLabel
            control={<Checkbox name="isActive" checked={form.isActive} onChange={handleChange} />}
            label="Is Active"
          />
          <MKButton type="submit">Add Student</MKButton>
        </Stack>
      </form>
    </MKCard>
  );
}

export default AddStudent;
