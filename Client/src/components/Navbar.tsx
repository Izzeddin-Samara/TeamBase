import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="w-full">
        <div className="max-w-[95%] mx-auto flex justify-between items-center h-20">
          <Link to="/dashboard">
            <h1 className="text-5xl font-bold">
              Team<span className="text-blue-700">Base</span>
            </h1>
          </Link>

          <LogoutButton />
        </div>
      </div>
    </>
  );
};
export default Navbar;
