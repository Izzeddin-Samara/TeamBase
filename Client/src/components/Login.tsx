import { Link } from "react-router-dom";
import InputField from "./InputField";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// Define types for form data and errors
type FormData = {
  email: string;
  password: string;
};

type FormErrors = {
  email: string;
  password: string;
};

const Home: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const formErrors: FormErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        // Make a POST request to the backend
        const res = await axios.post(
          "https://teambase-production.up.railway.app/api/users/login",
          formData
        );
        console.log(res.data); // For debugging

        setFormData({
          email: "",
          password: "",
        });
        setError(""); // Clear any error messages
        setSuccess("Login successful!"); // Display success message
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard"); // Navigate to dashboard
      } catch (err) {
        setError("Login failed. Please check your credentials."); // Display error message
        setSuccess(""); // Clear success message
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex items-start p-4 mt-30">
        <div className="max-w-sm w-full mx-auto bg-blue-50 rounded-2xl shadow-xl shadow-blue-900/15 p-8">
          <div className="grid grid-cols-1">
            <h1 className="text-center text-2xl font-bold mb-4">
              Login to your Account
            </h1>
            <div className="w-full md:mt-0 rounded-xl md4 mx-auto">
              {error && <p className="text-red-700 text-center">{error}</p>}{" "}
              {/* Display error */}
              {success && (
                <p className="text-green-700 text-center">{success}</p>
              )}{" "}
              {/* Display success */}
              <form onSubmit={handleSubmit}>
                <div>
                  <InputField
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm text-center mt-2">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  <InputField
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm text-center mt-2">
                      {errors.password}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-blue-800 font-bold hover:bg-blue-900 p-3 md:p-4 w-full mt-8 text-md text-white rounded-lg focus:ring-5 focus:ring-blue-300 cursor-pointer"
                >
                  {loading ? "Logining in ..." : "Login"}
                </button>
              </form>
              <div className="w-full h-0.5 bg-gray-400 mt-10"></div>
              <Link to="/signup">
                <button className="bg-gray-800 hover:bg-gray-950 font-bold md:p-4 p-3 w-full mt-8 text-md text-white rounded-lg focus:ring-5 focus:ring-gray-300 cursor-pointer">
                  Create new account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
