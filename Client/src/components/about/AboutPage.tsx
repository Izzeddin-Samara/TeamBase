import Navbar from "../Navbar";
import Aboutus from "./Aboutus";
import Mission from "./Mission";
import Vision from "./Vision";
import OurValues from "./OurValues";
import TechStack from "./TechStack";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-30 ">
        <Aboutus />
        <Mission />
        <Vision />
        <OurValues/>
        <TechStack/>
      </div>
    </>
  );
}
