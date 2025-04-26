import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, FormControlLabel, Checkbox, Stack } from "@mui/material";
import MKButton from "./MKButton.jsx";
import MKTypography from "./MKTypography.jsx";
import MKCard from "./MKCard.jsx";
import { toast } from "react-toastify";

function AddStudent() {
  const [form, setForm] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    department: "",
    enrollmentYear: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!form.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    } else if (!/^[a-z0-9]+$/i.test(form.studentId)) {
      newErrors.studentId = "Student ID must be alphanumeric";
    }

    if (!form.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = "First Name must be at least 2 characters";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName = "Last Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!form.dob.trim()) {
      newErrors.dob = "Date of Birth is required";
    }

    if (!form.department.trim()) {
      newErrors.department = "Department is required";
    }

    if (!form.enrollmentYear) {
      newErrors.enrollmentYear = "Enrollment Year is required";
    } else if (form.enrollmentYear < 1965 || form.enrollmentYear > currentYear) {
      newErrors.enrollmentYear = `Enrollment Year must be between 1965 and ${currentYear}`;
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
    <MKCard style={{ maxWidth: '1000px', margin: '2rem auto 2rem', display: 'block', padding: '2rem' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <MKTypography variant="h4" textAlign="center">Add Student</MKTypography>

          <TextField
            name="studentId"
            label="Student ID"
            value={form.studentId}
            onChange={handleChange}
            error={Boolean(errors.studentId)}
            helperText={errors.studentId}
            fullWidth
            required
          />

          <TextField
            name="firstName"
            type='text'
            label="First Name"
            value={form.firstName}
            onChange={handleChange}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            fullWidth
            required
          />

          <TextField
            name="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
            fullWidth
            required
          />

          <TextField
            name="email"
            type="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
            required
          />

          <TextField
            name="dob"
            type="date"
            label="Date of Birth"
            InputLabelProps={{ shrink: true }}
            value={form.dob}
            onChange={handleChange}
            error={Boolean(errors.dob)}
            helperText={errors.dob}
            fullWidth
            required
          />

          <TextField
            name="department"
            label="Department"
            value={form.department}
            onChange={handleChange}
            error={Boolean(errors.department)}
            helperText={errors.department}
            fullWidth
            required
          />

<TextField
  name="enrollmentYear"
  type="number"
  label="Enrollment Year"
  value={form.enrollmentYear}
  onChange={handleChange}
  required
  inputProps={{
    min: 1965,
    max: new Date().getFullYear()
  }}
  fullWidth
/>


          <FormControlLabel
            control={<Checkbox name="isActive" checked={form.isActive} onChange={handleChange} />}
            label="Studying Currently"
          />

          <MKButton type="submit" fullWidth>Add Student</MKButton>
        </Stack>
      </form>
    </MKCard>
  );
}

export default AddStudent;
