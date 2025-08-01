import { Link } from "react-router-dom";
import InputField from "./InputField";
import { useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import Navbar from "./Navbar";

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
        else if (value.length < 2)
          message = "First Name should be at least 2 characters";
        break;

      case "lastName":
        if (!value) message = "Last Name is required";
        else if (value.length < 2)
          message = "Last Name should be at least 2 characters";
        break;

      case "email":
        if (!value) message = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value))
          message = "Please enter a valid email";
        break;

      case "password":
        if (!value) message = "Password is required";
        else if (value.length < 8)
          message = "Password should be at least 8 characters";
        break;

      case "confirmPassword":
        if (!value) message = "Confirm password is required";
        else if (value !== formData.password) message = "Passwords don't match";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const checkEmailUniqueness = useCallback(
    debounce(async (email: string) => {
      try {
        const res = await axios.get(
          `https://teambase-1.onrender.com/api/users/check-email/${email}`,
          {
            params: { email },
          }
        );
        if (res.data.exists) {
          setErrors((prev) => ({ ...prev, email: "Email already in use" }));
        } else {
          setErrors((prev) => {
            if (prev.email === "Email already in use") {
              return { ...prev, email: "" };
            }
            return prev;
          });
        }
      } catch (err) {
        console.error("Error checking email", err);
      }
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the field immediately for format errors
    validateField(name, value);

    if (name === "email") {
      // If format is invalid, do NOT check uniqueness
      if (/\S+@\S+\.\S+/.test(value)) {
        // Only check uniqueness if format looks valid
        checkEmailUniqueness(value);
      } else {
        // If format invalid, show format error and clear uniqueness error
        setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      }
    }

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
        const res = await axios.post(
          "https://teambase-1.onrender.com/api/users/register",
          formData
        );
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
        setError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex items-start justify-center py-25 md:py-25 p-4">
        
        <div className="md:mt-0 max-w-md w-full mx-auto bg-purple-50 p-8 rounded-2xl shadow-blue-900/15 shadow-xl ">
          <div className="grid grid-cols-1">
            <h1 className="text-center text-2xl md:text-3xl font-bold mb-2">
              Create New Account
            </h1>

            {error && (
              <div className="bg-red-200 text-sm p-4 text-center mb-4 rounded-lg shadow-xl">
                 {error}
              </div>
            )}
            {success && (
              <div className="bg-green-200 text-sm p-4 text-center mb-4 rounded-lg shadow-xl">
                {success}, now you can <Link className="underline hover:no-underline text-green-700" to="/login">Login</Link>
              </div>
            )}

            <form onSubmit={handleSubmit} className="text-center">
                <div>
                  <InputField
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    name="firstName"
                    error={errors.firstName}
                  />
                </div>

                <div>
                  <InputField
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    name="lastName"
                    error={errors.lastName}
                  />
                </div>

              <div className="mt-2">
                <InputField
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  error={errors.email}
                />
              </div>

              <div className="mt-2">
                <InputField
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  error={errors.password}
                />
              </div>

              <div className="mt-2">
                <InputField
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  error={errors.confirmPassword}
                />
              </div>

              <button
                className="bg-blue-800 font-bold hover:bg-blue-900 p-3 md:p-4 w-full mt-8 text-md md:text-md text-white rounded-lg focus:ring-4 focus:ring-blue-300 cursor-pointer"
                type="submit"
              >
                {loading ? "Signing up ..." : "Sign up"}
              </button>

              <p className="text-center text-md md:text-md mt-5">
                Already have an account?{" "}
                <Link
                  className="text-blue-800 hover:underline ml-1"
                  to="/login"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
