import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AboutPage from "./components/about/AboutPage";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<EmployeeForm />} />
          <Route path="/employee/:id" element={<EmployeeForm />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
