import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

export default function AboutTheDeveloper() {
  return (
    <>
      <section className="py-15 bg-blue-200 rounded-lg shadow-xl my-50">
        <h1 className="text-center text-blue-800 text-4xl font-bold mb-20">
          About the Developer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 px-4">
          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src="izzeddin-image.jpg"
              className="rounded-full md:w-80 md:h-80 h-60 w-60 object-cover"
              alt="izzeddin"
            />
          </div>

          {/* PARAGRAPH */}
          <div className="p-4">
            <p className="text-md md:text-xl text-justify">
              Hey there! I’m Izzeddin, a frontend developer who’s passionate
              about turning clean designs into smooth, functional web
              experiences. I enjoy working with React and Tailwind CSS, and I
              love making tools that are not only beautiful but also meaningful.
              TeamBase is a project I created to solve real problems I saw in
              team management — and to showcase my skills as a developer who
              pays attention to design, usability, and detail.
            </p>
          </div>
        </div>

        <p className="text-center mt-16 text-md md:text-lg text-blue-800 font-bold">
          TeamBase reflects my belief that great teamwork starts with clarity.
        </p>
        <p className="text-center mt-10 mb-4">You can find me here</p>
        <ul className="flex gap-4 justify-center">
          <li>
            <a
              className="hover:text-gray-600" target="_blank" rel="noopener noreferrer"
              href="https://github.com/Izzeddin-Samara"
            >
              <FaGithub size={25} />
            </a>
          </li>
          <li>
            <a
              className="hover:text-gray-600" target="_blank" rel="noopener noreferrer"
              href="https://www.linkedin.com/in/izzeddin-samara"
            >
              <FaLinkedin size={25} />
            </a>
          </li>
          <li>
            <a
              className="hover:text-gray-600"
              href="mailto:izzidinsamara@gmail.com"
            >
              <FaEnvelope size={25} />
            </a>
          </li>
          <li>
            <a
              className="hover:text-gray-600" target="_blank" rel="noopener noreferrer"
              href="https://api.whatsapp.com/send/?phone=00972595484832&text&type=phone_number&app_absent=0"
            >
              <FaWhatsapp size={25} className="social-icon" />
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
