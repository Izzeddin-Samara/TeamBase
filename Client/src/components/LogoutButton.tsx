// LogoutButton.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LogoutButtonProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);

      // Call the logout API
      await axios.post("http://localhost:8000/api/users/logout");

      // Clear user data from localStorage
      localStorage.removeItem("user");

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Error during logout", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-gray-500 justify-center font-bold hover:bg-gray-600 mt-8 text-xl p-3 w-40 text-white rounded-lg focus:ring-5 focus:ring-gray-300 cursor-pointer"
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
