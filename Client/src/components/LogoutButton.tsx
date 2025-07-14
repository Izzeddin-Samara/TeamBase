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
      await axios.post("https://teambase-1.onrender.com/api/users/logout");

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
      className="flex items-center gap-2 bg-gray-500 justify-center mx-auto font-bold hover:bg-gray-600 md:mt-8 text-md p-3 w-24 text-white rounded-lg focus:ring-5 focus:ring-gray-300 cursor-pointer mb-8"
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
