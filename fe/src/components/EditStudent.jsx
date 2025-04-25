import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditStudent() {
  const [form, setForm] = useState({
    studentId: '', firstName: '', lastName: '', email: '', dob: '', department: '', enrollmentYear: '', isActive: true
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/students/${id}`)
      .then(res => setForm(res.data))
      .catch(() => alert('Error fetching student'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_BASE}/students/${id}`, form)
      .then(() => navigate('/students'))
      .catch(() => alert('Error updating student'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>
      <input name="studentId" value={form.studentId} onChange={handleChange} required />
      <input name="firstName" value={form.firstName} onChange={handleChange} required />
      <input name="lastName" value={form.lastName} onChange={handleChange} required />
      <input name="email" type="email" value={form.email} onChange={handleChange} required />
      <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
      <input name="department" value={form.department} onChange={handleChange} required />
      <input name="enrollmentYear" type="number" value={form.enrollmentYear} onChange={handleChange} required />
      <label>
        <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} /> Is Active
      </label>
      <button type="submit">Update</button>
    </form>
  );
}

export default EditStudent;
