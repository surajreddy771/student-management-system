//AddStudent.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControlLabel, Checkbox, Typography, Grid } from '@mui/material';
import { toast } from 'react-toastify';

function AddStudent() {
  const [form, setForm] = useState({
    studentId: '', firstName: '', lastName: '', email: '', dob: '', department: '', enrollmentYear: '', isActive: true
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validate = (fields = form) => {
    const temp = {};
    if (!fields.studentId) temp.studentId = "Student ID is required";
    if (!fields.firstName) temp.firstName = "First name is required";
    if (!fields.lastName) temp.lastName = "Last name is required";
    if (!fields.email) temp.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(fields.email)) temp.email = "Invalid email";
    if (!fields.dob) temp.dob = "Date of birth is required";
    if (!fields.department) temp.department = "Department is required";
    if (!fields.enrollmentYear) temp.enrollmentYear = "Enrollment year is required";
    else if (fields.enrollmentYear < 1900 || fields.enrollmentYear > new Date().getFullYear())
      temp.enrollmentYear = "Enter a valid year";
    return temp;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newForm = { ...form, [name]: type === 'checkbox' ? checked : value };
    setForm(newForm);

    // Validate the input and set error messages
    setErrors({
      ...errors,
      [name]: validate({ ...form, [name]: type === 'checkbox' ? checked : value })[name]
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    // Make the API call to add a student
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
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>Add Student</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField 
            name="studentId" 
            label="Student ID" 
            value={form.studentId} 
            onChange={handleChange} 
            required 
            fullWidth
            error={!!errors.studentId} 
            helperText={errors.studentId} 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            name="dob" 
            type="date" 
            label="Date of Birth" 
            InputLabelProps={{ shrink: true }} 
            value={form.dob} 
            onChange={handleChange} 
            required 
            fullWidth
            error={!!errors.dob} 
            helperText={errors.dob} 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            name="firstName" 
            label="First Name" 
            value={form.firstName} 
            onChange={handleChange} 
            required 
            fullWidth
            error={!!errors.firstName} 
            helperText={errors.firstName} 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            name="lastName" 
            label="Last Name" 
            value={form.lastName} 
            onChange={handleChange} 
            required 
            fullWidth
            error={!!errors.lastName} 
            helperText={errors.lastName} 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            name="department" 
            label="Department" 
            value={form.department} 
            onChange={handleChange} 
            required 
            fullWidth
            error={!!errors.department} 
            helperText={errors.department} 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            name="enrollmentYear" 
            type="number" 
            label="Enrollment Year" 
            value={form.enrollmentYear} 
            onChange={handleChange} 
            required 
            fullWidth
            error={!!errors.enrollmentYear} 
            helperText={errors.enrollmentYear} 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            name="email" 
            type="email" 
            label="Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
            fullWidth
            error={!!errors.email} 
            helperText={errors.email} 
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox name="isActive" checked={form.isActive} onChange={handleChange} />}
            label="Currently Studying"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>Add</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddStudent;
