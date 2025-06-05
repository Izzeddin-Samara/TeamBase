import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { FaCheckCircle } from "react-icons/fa";

type Employee = {
  _id: string;
  employeeId: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  department: string;
  manager: string;
  salary: string;
  hireDate: string;
};

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState<string>("");

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/"); // Not logged in, redirect to home/login
      return;
    }

    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "https://teambase-production.up.railway.app/api/employees", {withCredentials: true}
        );
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Failed to fetch employees.");
      }
    };

    fetchEmployees();
  }, [navigate]);

  const handleDelete = async () => {
    if (!selectedEmployee) return;
    try {
      await axios.delete(
        `https://teambase-production.up.railway.app/api/employees/${selectedEmployee._id}`, {withCredentials: true}
      );
      setEmployees((prev) =>
        prev.filter((emp) => emp._id !== selectedEmployee._id)
      );
      setSuccess("Employee deleted successfully");
      closeModal();
    } catch (err) {
      console.error("Error deleting employee", err);
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mt-15 text-center mb-20">
          Employees List
        </h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && (
          <div className="w-2/4 mx-auto bg-green-100 text-lg text-green-800 p-3 rounded-md border border-green-300 text-center flex gap-2 justify-center">
            {success} <FaCheckCircle size={20} className="mt-1" />
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-20 gap-4 sm:gap-0">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search by name, email, ID, etc."
              className="w-full pl-10 pr-4 py-2 border text-lg border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Search Icon */}
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button
            onClick={() => navigate("/employee")}
            className="bg-gray-800 hover:bg-gray-900 font-bold p-3 w-48 text-md text-white rounded-lg focus:ring-5 mr-8 focus:ring-gray-300 cursor-pointer"
          >
            + Add New
          </button>
        </div>

        {filteredEmployees.length === 0 ? (
          <div>
            <table className="w-full table-auto border-collapse mt-8">
              <thead>
                <tr className="bg-gray-400 text-white text-md text-center uppercase tracking-wide">
                  <th className="px-4 py-3 w-8">ID</th>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Job Title</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone Number</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Manager</th>
                  <th className="px-4 py-3">Salary</th>
                  <th className="px-4 py-3">Hire Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
            </table>
            <p className="text-center text-lg text-gray-500 mt-10">
              No employees added yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full table-auto border-collapse mt-8">
              <thead>
                <tr className="bg-gray-400 text-white text-md text-center uppercase tracking-wide">
                  <th className="px-4 py-3 w-8">ID</th>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Job Title</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone Number</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Manager</th>
                  <th className="px-4 py-3">Salary</th>
                  <th className="px-4 py-3">Hire Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="text-center border-t hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-4 py-3 w-8">{emp.employeeId}</td>
                    <td className="px-4 py-3">{emp.fullName}</td>
                    <td className="px-4 py-3">{emp.jobTitle}</td>
                    <td className="px-4 py-3">{emp.email}</td>
                    <td className="px-4 py-3">{emp.phoneNumber}</td>
                    <td className="px-4 py-3">{emp.department}</td>
                    <td className="px-4 py-3">{emp.manager}</td>
                    <td className="px-4 py-3">{emp.salary}</td>
                    <td className="px-4 py-3">{emp.hireDate?.split("T")[0]}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => navigate(`/employee/${emp._id}`)}
                        className="bg-blue-800 font-bold hover:bg-blue-900 p-3 w-20 text-md text-white rounded-lg focus:ring-5 focus:ring-blue-300 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEmployee(emp);
                          openModal();
                        }}
                        className="bg-red-800 font-bold hover:bg-red-900 p-3 w-20 text-md text-white rounded-lg focus:ring-5 focus:ring-red-300 cursor-pointer"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isOpen && selectedEmployee && (
              <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={closeModal}
                      className="absolute top-3 end-2.5 cursor-pointer focus:ring-4 focus:outline-none focus:ring-gray-300 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>

                    {/* Modal Content */}
                    <div className="p-4 md:p-5 text-center">
                      <svg
                        className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <h3 className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete{" "}
                        <span className="font-bold">
                          {selectedEmployee?.fullName}
                        </span>
                        ?
                      </h3>
                      <button
                        onClick={handleDelete}
                        type="button"
                        className="text-white cursor-pointer bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                      >
                        Yes, I'm sure
                      </button>
                      <button
                        onClick={closeModal}
                        type="button"
                        className="py-2.5 px-5 cursor-pointer ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
