import { Link } from "react-router-dom";
import InputField from "./InputField";
import React, { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted");
    }
  };

  return (
    <div className="w-full h-screen flex items-center p-4">
      <div className="max-w-7xl mx-auto bg-blue-50 rounded-2xl shadow-xl shadow-blue-900/15 p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-30">
          <div className="items-center flex mb-20 justify-center">
            <div className="text-center mt-20 md:mt-0">
              <h1 className="text-4xl font-extrabold lg:text-5xl text-blue-800">
                Welcome to Postly
              </h1>
              <p className="text-xl mt-4 text-gray-500">Share your thoughts with the world</p>
            </div>
          </div>
          <div className="rounded-xl md:w-3/4 mx-auto">
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
                  <p className="text-red-600 text-sm">{errors.email}</p>
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
                  <p className="text-red-600 text-sm">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-800 font-bold hover:bg-blue-900 p-3 w-full mt-8 text-md text-white rounded-lg focus:ring-5 focus:ring-blue-300 cursor-pointer"
              >
                Log In
              </button>
            </form>
            <div className="w-full h-0.5 bg-gray-400 mt-10"></div>
            <Link to="/signup">
              <button className="bg-gray-800 hover:bg-gray-950 font-bold p-3 w-full mt-8 text-md text-white rounded-lg focus:ring-5 focus:ring-gray-300 cursor-pointer">
                Create new account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
