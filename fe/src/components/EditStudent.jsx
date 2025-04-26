import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, FormControlLabel, Checkbox, Stack } from "@mui/material";
import MKButton from "./MKButton.jsx";
import MKTypography from "./MKTypography.jsx";
import MKCard from "./MKCard.jsx";
import { toast } from "react-toastify";

function EditStudent() {
  const [form, setForm] = useState({
    studentId: "", firstName: "", lastName: "", email: "", dob: "", department: "", enrollmentYear: "", isActive: true
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/students/${id}`)
      .then((res) => {
        const studentData = res.data;
        // Format dob to YYYY-MM-DD if it exists
        if (studentData.dob) {
          studentData.dob = studentData.dob.substring(0, 10); // Take only the first 10 characters
        }
        setForm(studentData);
      })
      .catch((error) => {
        toast.error('Error fetching student');
      });
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });

    // Clear error as user types
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();
  
    if (!form.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    } else if (!/^[a-z0-9]+$/i.test(form.studentId)) {
      newErrors.studentId = "Student ID must be alphanumeric";
    }
  
    if (!form.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = "First Name must be at least 2 characters";
    }
  
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName = "Last Name must be at least 2 characters";
    }
  
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email format is invalid";
    }
  
    if (!form.dob.trim()) {
      newErrors.dob = "Date of Birth is required";
    }
  
    if (!form.department.trim()) {
      newErrors.department = "Department is required";
    }
  
    if (!form.enrollmentYear) {
      newErrors.enrollmentYear = "Enrollment Year is required";
    } else if (form.enrollmentYear < 1965 || form.enrollmentYear > currentYear) {
      newErrors.enrollmentYear = `Enrollment Year must be between 1965 and ${currentYear}`;
    }
  
    // isActive is optional, no error required
  
    return newErrors;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.put(`${process.env.REACT_APP_API_BASE}/students/${id}`, form)
      .then(() => {
        toast.success('Student updated');
        navigate('/students');
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Error updating student');
      });
  };

  return (
    <MKCard style={{ maxWidth: '1000px', margin: '2rem auto 2rem', padding: '2rem', display: 'block' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <MKTypography variant="h4" textAlign="center">Edit Student</MKTypography>

          <TextField
            name="studentId"
            label="Student ID"
            value={form.studentId}
            onChange={handleChange}
            error={Boolean(errors.studentId)}
            helperText={errors.studentId}
            fullWidth
          />
          <TextField
            name="firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            fullWidth
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
            fullWidth
          />
          <TextField
            name="email"
            type="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
          />
          <TextField
            name="dob"
            type="date"
            label="Date of Birth"
            InputLabelProps={{ shrink: true }}
            value={form.dob}
            onChange={handleChange}
            error={Boolean(errors.dob)}
            helperText={errors.dob}
            fullWidth
          />
          <TextField
            name="department"
            label="Department"
            value={form.department}
            onChange={handleChange}
            error={Boolean(errors.department)}
            helperText={errors.department}
            fullWidth
          />
          <TextField
  name="enrollmentYear"
  type="number"
  label="Enrollment Year"
  value={form.enrollmentYear}
  onChange={handleChange}
  required
  inputProps={{
    min: 1965,
    max: new Date().getFullYear()
  }}
  fullWidth
/>

          
          <FormControlLabel
            control={<Checkbox name="isActive" checked={form.isActive} onChange={handleChange} />}
            label="Studying Currently"
          />

          <MKButton type="submit" fullWidth>Update Student</MKButton>
        </Stack>
      </form>
    </MKCard>
  );
}

export default EditStudent;
