import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/students')
      .then(res => setStudents(res.data))
      .catch(err => alert('Error fetching students'));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://student-management-system-0432.onrender.com`)
      .then(() => setStudents(students.filter(s => s._id !== id)))
      .catch(err => alert('Error deleting student'));
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
            <th>Course</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.year}</td>
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
