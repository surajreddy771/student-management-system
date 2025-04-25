import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      .then(() => navigate('/students'))
      .catch(() => alert('Error adding student'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input name="studentId" placeholder="Student ID" onChange={handleChange} required />
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="dob" type="date" placeholder="DOB" onChange={handleChange} required />
      <input name="department" placeholder="Department" onChange={handleChange} required />
      <input name="enrollmentYear" type="number" placeholder="Enrollment Year" onChange={handleChange} required />
      <label>
        <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} /> Is Active
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddStudent;
