import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControlLabel, Checkbox, Typography, Stack } from '@mui/material';
import { toast } from 'react-toastify';

function AddStudent() {
  const [form, setForm] = useState({
    studentId: '', firstName: '', lastName: '', email: '', dob: '', department: '', enrollmentYear: '', isActive: true
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_BASE}/students`, form)
      .then(() => {
        toast.success('Student added');
        navigate('/students');
      })
      .catch(() => toast.error('Error adding student'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>Add Student</Typography>
      <Stack spacing={2}>
        <TextField name="studentId" label="Student ID" onChange={handleChange} required />
        <TextField name="firstName" label="First Name" onChange={handleChange} required />
        <TextField name="lastName" label="Last Name" onChange={handleChange} required />
        <TextField name="email" type="email" label="Email" onChange={handleChange} required />
        <TextField name="dob" type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} onChange={handleChange} required />
        <TextField name="department" label="Department" onChange={handleChange} required />
        <TextField name="enrollmentYear" type="number" label="Enrollment Year" onChange={handleChange} required />
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
