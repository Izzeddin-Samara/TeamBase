import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";

function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
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
