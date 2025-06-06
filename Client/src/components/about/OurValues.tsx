import { FaEye } from "react-icons/fa";
import { FaHandRock } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";

export default function OurValues() {
  return (
    <>
      <section className="py-30">
        <h1 className="text-blue-800 text-center text-4xl font-bold">
          Our Values
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 gap-16 p-6">
          <div>
            <FaEye size={40} className="mx-auto text-blue-800 mb-2" />
            <h1 className="text-center text-xl text-blue-800 font-bold mb-4">
              Transparency
            </h1>
            <p className="text-justify">
              We promote open communication and accountability. Everyone should
              know who does what and why it matters
            </p>
          </div>
          <div>
            <FaHandRock size={40} className="mx-auto text-blue-800 mb-2" />

            <h1 className="text-center text-xl text-blue-800 font-bold mb-4">
              Empowerment
            </h1>
            <p className="text-justify">
              We want teams to feel confident and supported. TeamBase helps
              reduce micromanagement and boosts team ownership
            </p>
          </div>
          <div>
            <IoSparkles size={40} className="mx-auto text-blue-800 mb-2" />
            <h1 className="text-center text-xl text-blue-800 font-bold mb-4">
              Simplicity
            </h1>{" "}
            <p className="text-justify">
              Complex tools create friction. We focus on simple, user-friendly
              experiences that actually make your life easier
            </p>
          </div>
          <div>
            <FaGlobe size={40} className="mx-auto text-blue-800 mb-2" />

            <h1 className="text-center text-xl text-blue-800 font-bold mb-4">
              Inclusivity
            </h1>
            <p className="text-justify">
              Built with teams of different backgrounds, cultures, and workflows
              in mind
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
