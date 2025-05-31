import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";

function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<EmployeeForm />} />
          <Route path="/employee/:id" element={<EmployeeForm />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
