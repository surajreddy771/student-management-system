// EditStudent.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, FormControlLabel, Checkbox, Typography, Stack } from '@mui/material';
import { toast } from 'react-toastify';

function EditStudent() {
  const [form, setForm] = useState({
    studentId: '', firstName: '', lastName: '', email: '', dob: '', department: '', enrollmentYear: '', isActive: true
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/students/${id}`)
      .then(res => setForm(res.data))
      .catch(() => toast.error('Error fetching student'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const validate = () => {
    const errors = {};
    const currentYear = new Date().getFullYear();

    if (!form.studentId.match(/^[a-zA-Z0-9]+$/)) errors.studentId = "Student ID must be alphanumeric.";
    if (form.firstName.length < 2) errors.firstName = "First name must be at least 2 characters.";
    if (form.lastName.length < 2) errors.lastName = "Last name must be at least 2 characters.";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Invalid email format.";
    if (!form.dob) errors.dob = "Date of Birth is required.";
    if (!form.department) errors.department = "Department is required.";
    if (form.enrollmentYear < 2000 || form.enrollmentYear > currentYear) errors.enrollmentYear = "Enrollment year must be between 2000 and current year.";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    axios.put(`${process.env.REACT_APP_API_BASE}/students/${id}`, form)
      .then(() => {
        toast.success('Student updated');
       setTimeout(() => navigate('/students'), 2000);
      })
      .catch(() => toast.error('Error updating student'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>Edit Student</Typography>
      <Stack spacing={2}>
        <TextField name="studentId" label="Student ID" value={form.studentId} onChange={handleChange} error={Boolean(formErrors.studentId)} helperText={formErrors.studentId} required />
        <TextField name="firstName" label="First Name" value={form.firstName} onChange={handleChange} error={Boolean(formErrors.firstName)} helperText={formErrors.firstName} required />
        <TextField name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} error={Boolean(formErrors.lastName)} helperText={formErrors.lastName} required />
        <TextField name="email" type="email" label="Email" value={form.email} onChange={handleChange} error={Boolean(formErrors.email)} helperText={formErrors.email} required />
        <TextField name="dob" type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} value={form.dob} onChange={handleChange} error={Boolean(formErrors.dob)} helperText={formErrors.dob} required />
        <TextField name="department" label="Department" value={form.department} onChange={handleChange} error={Boolean(formErrors.department)} helperText={formErrors.department} required />
        <TextField name="enrollmentYear" type="number" label="Enrollment Year" value={form.enrollmentYear} onChange={handleChange} error={Boolean(formErrors.enrollmentYear)} helperText={formErrors.enrollmentYear} required />
        <FormControlLabel
          control={<Checkbox name="isActive" checked={form.isActive} onChange={handleChange} />}
          label="Is Active"
        />
        <Button type="submit" variant="contained">Update</Button>
      </Stack>
    </form>
  );
}

export default EditStudent;
