import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, FormControlLabel, Checkbox, Typography, Stack } from '@mui/material';
import { toast } from 'react-toastify';

function EditStudent() {
  const [form, setForm] = useState({
    studentId: '', firstName: '', lastName: '', email: '', dob: '', department: '', enrollmentYear: '', isActive: true
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_BASE}/students/${id}`, form)
      .then(() => {
        toast.success('Student updated');
        navigate('/students');
      })
      .catch(() => toast.error('Error updating student'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>Edit Student</Typography>
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
        <Button type="submit" variant="contained">Update</Button>
      </Stack>
    </form>
  );
}

export default EditStudent;
