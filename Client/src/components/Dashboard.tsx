import { useState, useEffect } from "react";
import axios from "axios";

type Employee = {
  _id: string;
  employeeId: string
  fullName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  department: string;
  manager: string;
  workLocation: string;
  salary: string;
  hireDate: string;
};

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Failed to fetch employees.");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-8 mt-8 text-center text-blue-700">
        Employees List
      </h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-700 text-white text-md text-center uppercase tracking-wide">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone Number</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Manager</th>
              <th className="px-4 py-3">Work Location</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Hire Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp._id}
                className="text-center border-t hover:bg-blue-50 transition duration-200"
              >
                <td className="px-4 py-3">{emp.employeeId}</td>
                <td className="px-4 py-3">{emp.fullName}</td>
                <td className="px-4 py-3">{emp.jobTitle}</td>
                <td className="px-4 py-3">{emp.email}</td>
                <td className="px-4 py-3">{emp.phoneNumber}</td>
                <td className="px-4 py-3">{emp.department}</td>
                <td className="px-4 py-3">{emp.manager}</td>
                <td className="px-4 py-3">{emp.workLocation}</td>
                <td className="px-4 py-3">{emp.salary}</td>
                <td className="px-4 py-3">{emp.hireDate?.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
