import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const [form, setForm] = useState({ name: '', email: '', course: '', year: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/students', form)
      .then(() => navigate('/'))
      .catch(err => alert('Error adding student'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="course" placeholder="Course" onChange={handleChange} required />
      <input name="year" type="number" placeholder="Year" onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddStudent;

