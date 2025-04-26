import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="add" element={<StudentForm />} />
          <Route path="edit/:id" element={<StudentForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
