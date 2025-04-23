import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditStudent() {
  const [form, setForm] = useState({ name: '', email: '', course: '', year: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://student-management-system-0432.onrender.com/students/${id}`)
      .then(res => setForm(res.data))
      .catch(err => alert('Error fetching student data'));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://student-management-system-0432.onrender.com/students/${id}`, form)
      .then(() => navigate('/'))
      .catch(err => alert('Error updating student'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>
      <input name="name" value={form.name} onChange={handleChange} required />
      <input name="email" value={form.email} onChange={handleChange} required />
      <input name="course" value={form.course} onChange={handleChange} required />
      <input name="year" type="number" value={form.year} onChange={handleChange} required />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditStudent;
