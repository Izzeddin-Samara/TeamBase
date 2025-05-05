import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

type FormData = {
  employeeId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  department: string;
  hireDate: string;
  salary: string;
  workLocation: string;
  manager: string;
  profilePicture: string;
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
    workLocation: "",
    manager: "",
    profilePicture: "",
    notes: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<FormData | null>(null);

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
        .get(`http://localhost:8000/api/employees/${employeeId}`)
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
          setOriginalData(updatedData); // Store original data for comparison
        })
        .catch(() => {
          setError("Failed to fetch employee data.");
        });
    }
  }, [employeeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (employeeId) {
        if (JSON.stringify(formData) === JSON.stringify(originalData)) {
          setSuccess("");
          setError("No changes made.");
          setLoading(false);
          return;
        }

        await axios.patch(
          `http://localhost:8000/api/employees/${employeeId}`,
          formData
        );
        setSuccess("Employee updated successfully!");
      } else {
        await axios.post("http://localhost:8000/api/employees", formData);
        setSuccess("Employee added successfully!");
      }

      setError("");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error("Error saving employee:", err);
      setSuccess("");
      setError("Failed to save employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-blue-50 rounded-2xl shadow-xl shadow-blue-900/15 p-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard">
            <button className="flex items-center gap-2 cursor-pointer text-xl text-blue-700 font-semibold hover:underline">
              <FaArrowLeft className="w-5 h-5" />
              Back
            </button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-800">
            {employeeId ? "Edit Employee" : "Create Employee"}
          </h1>
          <div className="w-14" />
        </div>
        {error && <p className="text-red-700 text-center">{error}</p>}
        {success && <p className="text-green-700 text-center">{success}</p>}
        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="w-full rounded-xl mx-auto">
            <form onSubmit={handleSubmit} className="text-center">
              <div className="flex gap-6 mb-2">
                <InputField
                  type="text"
                  placeholder="Employee ID"
                  value={formData.employeeId}
                  onChange={handleChange}
                  name="employeeId"
                />
                <InputField
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  name="fullName"
                />
              </div>
              <div className="flex gap-6 mb-2">
                <InputField
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                />
                <InputField
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  name="phoneNumber"
                />
              </div>
              <div className="flex gap-6 mb-2">
                <InputField
                  type="text"
                  placeholder="Job Title"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  name="jobTitle"
                />
                <InputField
                  type="text"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  name="department"
                />
              </div>

              <div className="flex gap-6 mb-2">
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
              <div className="flex gap-6 mb-2">
                <InputField
                  type="text"
                  placeholder="Work Location"
                  value={formData.workLocation}
                  onChange={handleChange}
                  name="workLocation"
                />
                <InputField
                  type="text"
                  placeholder="Manager"
                  value={formData.manager}
                  onChange={handleChange}
                  name="manager"
                />
              </div>

              <div className="flex gap-6 mb-2">
                <InputField
                  type="text"
                  placeholder="Profile Picture URL"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  name="profilePicture"
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
                className="bg-blue-800 font-bold hover:bg-blue-900 p-3 w-2/4 mt-10 text-xl text-white rounded-lg focus:ring-5 focus:ring-blue-300 cursor-pointer"
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
  );
};

export default EmployeeForm;
