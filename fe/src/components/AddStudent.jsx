import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControlLabel, Checkbox, Typography, Stack } from '@mui/material';
import { toast } from 'react-toastify';

function AddStudent() {
  const [form, setForm] = useState({
    studentId: '', firstName: '', lastName: '', email: '', dob: '', department: '', enrollmentYear: '', isActive: true
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newForm = { ...form, [name]: type === 'checkbox' ? checked : value };
    setForm(newForm);
    setErrors({
      ...errors,
      [name]: validate({ ...form, [name]: type === 'checkbox' ? checked : value })[name]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

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
      <Stack spacing={2}>
        <TextField name="studentId" label="Student ID" value={form.studentId} onChange={handleChange} required error={!!errors.studentId} helperText={errors.studentId} />
        <TextField name="firstName" label="First Name" value={form.firstName} onChange={handleChange} required error={!!errors.firstName} helperText={errors.firstName} />
        <TextField name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} required error={!!errors.lastName} helperText={errors.lastName} />
        <TextField name="email" type="email" label="Email" value={form.email} onChange={handleChange} required error={!!errors.email} helperText={errors.email} />
        <TextField name="dob" type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} value={form.dob} onChange={handleChange} required error={!!errors.dob} helperText={errors.dob} />
        <TextField name="department" label="Department" value={form.department} onChange={handleChange} required error={!!errors.department} helperText={errors.department} />
        <TextField name="enrollmentYear" type="number" label="Enrollment Year" value={form.enrollmentYear} onChange={handleChange} required error={!!errors.enrollmentYear} helperText={errors.enrollmentYear} />
        <FormControlLabel
          control={<Checkbox name="isActive" checked={form.isActive} onChange={handleChange} />}
          label="Is Active"
        />
        <Button type="submit" variant="contained">Add</Button>
      </Stack>
    </form>
  );
}

export default AddStudent;
