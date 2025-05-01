import { Link } from "react-router-dom";
import InputField from "./InputField";
import { useState } from "react";
import axios from "axios";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateField = (name: string, value: string) => {
    let message = "";

    switch (name) {
      case "firstName":
        if (!value) message = "First Name is required";
        else if (value.length < 2) message = "First Name should be at least 2 characters";
        break;

      case "lastName":
        if (!value) message = "Last Name is required";
        else if (value.length < 2) message = "Last Name should be at least 2 characters";
        break;

      case "email":
        if (!value) message = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) message = "Please enter a valid email";
        break;

      case "password":
        if (!value) message = "Password is required";
        else if (value.length < 8) message = "Password should be at least 8 characters";
        break;

      case "confirmPassword":
        if (!value) message = "Confirm password is required";
        else if (value !== formData.password) message = "Passwords don't match";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);

    // Revalidate confirmPassword when password changes
    if (name === "password" && formData.confirmPassword) {
      validateField("confirmPassword", formData.confirmPassword);
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      validateField(key, value);
      if (value === "" || errors[key as keyof FormErrors]) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:8000/api/users/register", formData);
        console.log(res.data);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setError("");
        setSuccess("Registration successful");
      } catch (err: any) {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center p-8">
      <div className=" w-full max-w-md mx-auto bg-purple-50 p-8 rounded-2xl shadow-blue-900/15 shadow-xl">
        <div className="grid grid-cols-1">
          <h1 className="text-center text-2xl font-bold mb-4">Create New Account</h1>

          {error && <p className="text-red-700 text-center">{error}</p>}
          {success && <p className="text-green-700 text-center">{success}</p>}

          <form  onSubmit={handleSubmit} className="text-center">
              <div>
                <InputField
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  name="firstName"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-xs tet-center mt-2">{errors.firstName}</p>
                )}
              </div>

              <div className="mt-2">
                <InputField
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  name="lastName"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-xs text-center mt-2">{errors.lastName}</p>
                )}
              </div>

            <div className="mt-2">
              <InputField
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
              {errors.email && (
                <p className="text-red-600 text-xs text-center mt-2">{errors.email}</p>
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
                <p className="text-red-600 text-xs text-center mt-2">{errors.password}</p>
              )}
            </div>

            <div className="mt-2">
              <InputField
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs text-center mt-2">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              className="bg-blue-800 font-bold hover:bg-blue-900 p-3 w-[70%] mt-8 text-md text-white rounded-lg focus:ring-4 focus:ring-blue-300 cursor-pointer"
              type="submit"
            >
              {loading ? "Signing up ..." : "Sign up"}
            </button>

            <p className="text-center text-sm mt-8">
              Already have an account?{" "}
              <Link className="text-blue-800 hover:underline ml-1" to="/">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
