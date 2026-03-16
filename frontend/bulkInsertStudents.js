import axios from "axios";

const login = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email: "john@school.com",
      password: "123456" // <-- replace with John's password
    });
    return res.data.token;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    process.exit(1);
  }
};

const students = [
{
  admissionNo: "S001",
  firstName: "Thabo",
  surname: "Nkosi",
  gender: "male",
  dateOfBirth: "2013-01-01",
  classId: 1
},
{
  admissionNo: "S002",
  firstName: "Lerato",
  surname: "Molefe",
  gender: "female",
  dateOfBirth: "2013-01-01",
  classId: 1
},
{
  admissionNo: "S003",
  firstName: "Sipho",
  surname: "Dlamini",
  gender: "male",
  dateOfBirth: "2013-01-01",
  classId: 1
},
{
  admissionNo: "S004",
  firstName: "Nomsa",
  surname: "Ndlovu",
  gender: "female",
  dateOfBirth: "2013-01-01",
  classId: 1
}
];
  
const insertStudents = async () => {
  const token = await login();

  for (const student of students) {
    try {
      await axios.post("http://localhost:5000/api/students", student, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`Added: ${student.firstName} ${student.surname}`);
    } catch (err) {
      console.error(`Error adding ${student.full_name}:`, err.response?.data || err.message);
    }
  }
};

insertStudents();