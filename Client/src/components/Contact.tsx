import Navbar from "./Navbar";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import InputField from "./InputField";
import { useState } from "react";
import axios from "axios";

type formData = {
  name: string;
  email: string;
  message: string;
};

type formErrors = {
  name: string;
  email: string;
  message: string;
};

type formField = "name" | "email" | "message";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<formData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<formErrors>({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateField = (name: string, value: string) => {
    let message = "";

    switch (name) {
      case "name":
        if (!value) message = "Name is required";
        else if (value.length < 2)
          message = "Name should be at least 2 characters";
        break;

      case "email":
        if (!value) message = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value))
          message = "Please enter a valid email";
        break;

      case "message":
        if (!value) message = "Message is required";
        else if (value.length < 30)
          message = "Message should be at least 30 characters";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

   const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the field immediately for format errors
    validateField(name, value);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      validateField(key, value);
      if (value === "" || errors[key as formField]) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const res = await axios.post(
          "https://teambase-production.up.railway.app/api/contact",
          formData
        );

        console.log(res)
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        setError("");
        setSuccess(
          "Thanks for contacting us! we will get back to you as soon as possible"
        );
      } catch (error) {
        console.log("Error", error);
        setError("Something went wrong, please try again later");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />

      {/* Contact Header */}
      <div className=" max-w-6xl mx-auto h-auto p-8 ">
        <div className="flex items-center h-[200px]">
          <div className="text-center w-full">
            <h1 className="text-4xl font-bold mb-4 text-blue-800 lg:text-5xl md:text-3xl sm:text-lg">
              Contact Us
            </h1>
            <p className="text-md sm:text-lg lg:text-lg text-gray-600 mt-8 mx-auto">
              Got a technical issue? Want to send feedback about our Website?
              Let us know
            </p>
          </div>
        </div>
        {success && (
          <div className="bg-green-200 p-4 text-center mb-4 rounded-lg shadow-xl">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-200 p-4 text-center mb-4 rounded-lg shadow-xl">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Contact body*/}
        <div className="w-full">
          <div className="max-w-7xl bg-gray-100 mx-auto h-auto p-4 rounded-lg shadow-xl ">
            <div className="grid grid-cols-1 sm:grid-col-2 lg:grid-cols-2 gap-8">
              {/* Contact Form*/}
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 p-4 text-center"
                >
                  <div>
                    <label className="text-xl">Name</label>

                    <InputField
                      type="text"
                      name="name"
                      placeholder="eg: John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                  </div>
                  <div>
                    <label className="text-xl">Email</label>

                    <InputField
                      type="text"
                      name="email"
                      placeholder="eg: johndoe@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                  </div>
                  <div>
                    <label className="text-xl">Message</label>

                    <textarea
                      id="message"
                      name="message"
                      className="w-full h-48 p-3 bg-gray-100 border text-md outline-none rounded-lg border-gray-300 mt-2 resize-none focus:ring-3 focus:ring-blue-800"
                      placeholder="Write your message here"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors && <p className="text-red-600 text-md">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className=" w-full bg-blue-800 hover:bg-blue-900 text-white p-4 rounded-lg font-bold focus:ring-4 focus:ring-blue-300 cursor-pointer text-xl"
                  >
                    {loading ? "Sending your Message" : "Send Message"}
                  </button>
                </form>
              </div>
              {/* Contact Information*/}
              <div className="space-y-8 mt-10">
                <div className="text-center">
                  <FaEnvelope
                    className="mx-auto text-blue-800 rounded-lg"
                    size={60}
                  />
                  <h1 className="font-bold">Email us:</h1>
                  <p className="font-bold text-blue-800 mt-4">
                    support@teambase.com
                  </p>
                </div>
                <div className="text-center">
                  <FaLocationDot
                    className="mx-auto text-blue-800 p-2 rounded-lg"
                    size={60}
                  />
                  <h1 className="font-bold">Address:</h1>
                  <p className="text-blue-800 font-bold mt-4">
                    123 TeamBase Street, City, Country
                  </p>
                </div>
                <div className="text-center">
                  <FaPhoneAlt
                    className="mx-auto text-blue-800 p-2 rounded-lg"
                    size={60}
                  />
                  <h1 className="font-bold">Call us:</h1>
                  <p className="mt-4">
                    Call us to speak to a member of our team. We are
                    <span className="block">always happy to help.</span>
                  </p>
                  <p className="text-blue-800 font-bold mt-4">+123-456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
