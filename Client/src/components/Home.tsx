import Navbar from "./Navbar";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center h-[500px]">
        <div className="text-center w-full">
          <h1 className="text-4xl  mx-auto font-bold sm:text-6xl lg:text-7xl leading-tight">
            Your Team, Organized.
          </h1>
          <p className="text-md sm:text-2xl lg:text-2xl text-gray-600 mt-8 w-3/4 mx-auto">
            TeamBase helps you manage your team's details effortlessly — from
            job titles to contact info — all in one place.
          </p>
        </div>
      </div>

      <div className="w-full mt-[30px] py-16">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Why TeamBase?
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            <div className="bg-gray-100 p-8 rounded-lg shadow-xl text-center">
              <h1 className="text-xl md:text-2xl font-bold ">
                {" "}
                <FaUser className="mx-auto mb-2 text-blue-800" size={40} />
                Simple Team Management
              </h1>
              <p className="mt-4">
                Add, edit, and delete team members effortlessly in a clean
                dashboard
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-xl text-center">
              <h1 className="text-xl md:text-2xl font-bold">
                {" "}
                <FaSearch className="mx-auto mb-2 text-blue-800" size={40} />
                Smart Search
              </h1>
              <p className="mt-4">
                Quickly find anyone by name, title, or contact info.
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-xl text-center">
              <h1 className="text-xl md:text-2xl font-bold">
                {" "}
                <FaMobileScreen
                  className="mx-auto mb-2 text-blue-800"
                  size={40}
                />
                Mobile-Friendly
              </h1>
              <p className="mt-4">
                Built with responsive design so you can manage your team
                anywhere.
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-xl text-center">
              <h1 className="text-xl md:text-2xl font-bold">
                {" "}
                <FaLock className="mx-auto mb-2 text-blue-800" size={40} />
                Secure & Private
              </h1>
              <p className="mt-4">
                Your team data stays safe — nothing shared without your control.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:mt-30 w-full flex  items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-xl md:text-4xl  font-bold w-full mx-auto">
            Tired of juggling spreadsheets and losing track of your team’s info?
          </h1>
          <p className="text-xs md:text-xl mt-8 p-1 ">
            Try TeamBase and simplify the way you work
          </p>
          <Link to="/login">
            <button className="bg-blue-800 font-bold hover:bg-blue-900 p-4 md:w-1/5 mt-8  text-md md:text-xl text-white rounded-lg focus:ring-4 focus:ring-blue-500 cursor-pointer">
              Get Started now!
            </button>
          </Link>
        </div>
      </div>

      <footer className="mt-20">
        <p className="text-center">© 2025 TeamBase. All rights reserved.</p>
      </footer>
    </>
  );
};
export default Home;
