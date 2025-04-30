import { Link } from "react-router-dom";
import InputField from "./InputField";
import { useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const formErrors: FormErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!formData.firstName) {
      formErrors.firstName = "First Name is required";
      isValid = false;
    } else if (formData.firstName.length < 2) {
      formErrors.firstName = "First Name should be al least 2 characters";
      isValid = false;
    }

    if (!formData.lastName) {
      formErrors.lastName = "Last Name is required";
      isValid = false;
    } else if (formData.firstName.length < 2) {
      formErrors.lastName = "Last Name should be al least 2 characters";
      isValid = false;
    }

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
    } else if (formData.password.length < 8) {
      formErrors.password = "Password should be at least 8 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      formErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords don't match";
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
    <>
      <div className="w-full h-screen flex items-center">
        <div className="max-w-[30%] mx-auto bg-purple-50 p-8 rounded-2xl shadow-blue-900/15 shadow-xl">
          <div className="grid grid-cols-1">
            <div>
              <h1 className="text-center text-2xl font-bold mb-4">
                Create New Account
              </h1>
              <form onSubmit={handleSubmit} className="text-center">
                <div className="flex gap-4">
                  <div>
                    <InputField
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      name="firstName"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-[13px] text-center mt-2">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <InputField
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      name="lastName"
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-[13px] text-center mt-2">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <InputField
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-[13px] text-center mt-2">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <InputField
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-[13px] text-center mt-2">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <InputField
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                  />

                  {errors.confirmPassword && (
                    <p className="text-red-600 text-[13px] text-center mt-2">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button className="bg-blue-800  font-bold hover:bg-blue-900 p-3 w-[70%]  mt-8 text-md text-white rounded-lg focus:ring-4 focus:ring-blue-300 cursor-pointer">
                  Sign up
                </button>
                <p className="text-center text-sm mt-8">
                  Already Have an account?{" "}
                  <Link
                    className="text-blue-800 underline hover:no-underline ml-1"
                    to="/"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
