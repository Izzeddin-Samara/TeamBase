import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export default function TechStack() {
  return (
    <>
      <section className="py-10">
        <h1 className="text-center text-blue-800 text-4xl font-bold">
          Tech Stack
        </h1>
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 mt-25 gap-10">
            <div className="flex flex-col justify-center items-center">
              <FaReact className="text-sky-400" size={60} />
              <h1 className="text-2xl mt-4">React</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <RiTailwindCssFill className="text-blue-500" size={60} />
              <h1 className="text-2xl mt-4">Tailwind CSS</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <SiExpress size={60} />
              <h1 className="text-2xl mt-4">Express</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <SiMongodb className="text-green-700" size={60} />
              <h1 className="text-2xl mt-4">MongoDB</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <FaGitAlt className="text-orange-600" size={60} />
              <h1 className="text-2xl mt-4">Git</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <FaGithub size={60} />
              <h1 className="text-2xl mt-4">GitHub</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
