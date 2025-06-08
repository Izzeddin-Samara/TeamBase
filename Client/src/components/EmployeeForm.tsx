import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "./Navbar";

type FormData = {
  employeeId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  department: string;
  hireDate: string;
  salary: string;
  manager: string;
  notes: string;
  user?: string;
};

const EmployeeForm: React.FC = () => {
  const navigate = useNavigate();
  const { id: employeeId } = useParams(); // Get the ID from the URL

  const [formData, setFormData] = useState<FormData>({
    employeeId: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    department: "",
    hireDate: "",
    salary: "",
    manager: "",
    notes: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/"); // Redirect if no user is logged in
    } else {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser._id) {
        setFormData((prev) => ({
          ...prev,
          user: parsedUser._id,
        }));
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (employeeId) {
      axios
        .get(
          `https://teambase-production.up.railway.app/api/employees/${employeeId}`,
          { withCredentials: true }
        )
        .then((response) => {
          const employee = response.data;
          const formattedDate = employee.hireDate
            ? new Date(employee.hireDate).toISOString().split("T")[0]
            : "";

          const updatedData = {
            ...employee,
            hireDate: formattedDate,
          };

          setFormData(updatedData);
          setOriginalData(updatedData);
        })
        .catch(() => {
          setError("Failed to fetch employee data.");
        });
    }
  }, [employeeId]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required.";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    } else {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(formData.fullName)) {
        newErrors.fullName = "Invalid name format";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email address.";
      }
    }

    if (formData.phoneNumber.trim()) {
      const phoneRegex = /^\d+$/;
      if (!phoneRegex.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Phone number must contain digits only.";
      }
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job Title is required.";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Live validation
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      switch (name) {
        case "employeeId":
          if (!value.trim()) newErrors.employeeId = "Employee ID is required.";
          else delete newErrors.employeeId;
          break;

        case "fullName":
          if (!value.trim()) newErrors.fullName = "Full Name is required.";
          else {
            const nameRegex = /^[\p{L}\s]+$/u;
            if (!nameRegex.test(value)) {
              newErrors.fullName = "Invalid name format";
            } else delete newErrors.fullName;
          }
          break;

        case "email":
          if (!value.trim()) {
            newErrors.email = "Email is required.";
          } else {
            const emailRegex =
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value))
              newErrors.email = "Invalid email address.";
            else delete newErrors.email;
          }
          break;

        case "phoneNumber":
          if (value.trim()) {
            const phoneRegex = /^\d+$/;
            if (!phoneRegex.test(value))
              newErrors.phoneNumber = "Phone number must contain digits only.";
            else delete newErrors.phoneNumber;
          } else {
            delete newErrors.phoneNumber;
          }
          break;

        case "jobTitle":
          if (!value.trim()) newErrors.jobTitle = "Job Title is required.";
          else delete newErrors.jobTitle;
          break;

        case "department":
          if (!value.trim()) newErrors.department = "Department is required.";
          else delete newErrors.department;
          break;
      }

      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setErrors({});

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (employeeId) {
        if (JSON.stringify(formData) === JSON.stringify(originalData)) {
          setSuccess("");
          setError("No changes made.");
          setLoading(false);
          return;
        }

        await axios.patch(
          `https://teambase-production.up.railway.app/api/employees/${employeeId}`,
          formData,
          { withCredentials: true }
        );
        setSuccess("Employee updated successfully.");
      } else {
        await axios.post(
          "https://teambase-production.up.railway.app/api/employees",
          formData,
          { withCredentials: true }
        );
        setSuccess("Employee added successfully.");
      }

      setError("");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error("Error saving employee:", err);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex items-center justify-center p-4 py-30 md:py-25">
        <div className="max-w-2xl w-full bg-blue-50 rounded-2xl shadow-2xl shadow-blue-900/15 p-8">
          <div className="flex items-center justify-between mb-8">
            <Link to="/dashboard">
              <button className="flex items-center gap-2 cursor-pointer text-sm md:text-md text-blue-700 font-semibold hover:underline">
                <FaArrowLeft className="w-5 h-5" />
                Back
              </button>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {employeeId ? "Edit Employee" : "Add Employee"}
            </h1>
            <div className="w-14" />
          </div>
          {error && (
            <div className="bg-red-200 text-sm p-4 text-center mb-4 rounded-lg shadow-xl">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-200 text-sm p-4 text-center mb-4 rounded-lg shadow-xl">
              {success}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 mt-8">
            <div className="w-full rounded-xl mx-auto">
              <form onSubmit={handleSubmit} className="text-center">
                <div className="flex flex-col md:flex-row md:gap-6 md:mb-2">
                  <InputField
                    type="text"
                    placeholder="Employee ID"
                    value={formData.employeeId}
                    onChange={handleChange}
                    name="employeeId"
                    error={errors.employeeId}
                  />
                  <InputField
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    name="fullName"
                    error={errors.fullName}
                  />
                </div>
                <div className="flex flex-col md:flex-row md:gap-6 md:mb-2">
                  <InputField
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    error={errors.email}
                  />
                  <InputField
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                    error={errors.phoneNumber}
                  />
                </div>
                <div className="flex flex-col md:flex-row md:gap-6 md:mb-2">
                  <InputField
                    type="text"
                    placeholder="Job Title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    name="jobTitle"
                    error={errors.jobTitle}
                  />
                  <InputField
                    type="text"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                    name="department"
                    error={errors.department}
                  />
                </div>

                <div className="flex flex-col md:flex-row md:gap-6 md:mb-2">
                  <InputField
                    type="date"
                    placeholder="Hire Date"
                    value={formData.hireDate}
                    onChange={handleChange}
                    name="hireDate"
                  />
                  <InputField
                    type="text"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={handleChange}
                    name="salary"
                  />
                </div>
                <div className="flex flex-col md:flex-row md:gap-6 md:mb-2">
                  <InputField
                    type="text"
                    placeholder="Manager"
                    value={formData.manager}
                    onChange={handleChange}
                    name="manager"
                  />
                  <InputField
                    type="text"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={handleChange}
                    name="notes"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-800 font-bold hover:bg-blue-900 p-3 w-2/4 mt-10 text-sm md:text-md text-white rounded-lg focus:ring-5 focus:ring-blue-300 cursor-pointer"
                >
                  {loading
                    ? employeeId
                      ? "Updating employee ..."
                      : "Adding employee ..."
                    : employeeId
                    ? "Update Employee"
                    : "Add Employee"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
