import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/students`)
      .then(res => setStudents(res.data))
      .catch(() => alert('Error fetching students'));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_BASE}/students/${id}`)
      .then(() => setStudents(students.filter(s => s._id !== id)))
      .catch(() => alert('Error deleting student'));
  };

  return (
    <div>
      <h2>Student List</h2>
      <Link to="/add">Add Student</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.firstName} {student.lastName}</td>
              <td>{student.email}</td>
              <td>
                <Link to={`/edit/${student._id}`}>Edit</Link>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;

