import {
  Route,
  Routes,
  Outlet,
  NavLink,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import NavigationButton from "../navigationButton";
import SelectedTemplates from "../../resume-templates";

import Awards from "./Awards";
import Selector from "./Selector";
import Languages from "./Languages";
import Hobbies from "./Hobbies";
import Certification from "./Certification";
import Projects from "./Projects";

const AdditionInformation = ({ data, updateResume }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleAddSection = (sectionName) => {
    const newData = { ...data };

    // Ensure that newData.additionalInformation exists
    if (!newData.additionalInformation) {
      newData.additionalInformation = {};
    }

    // Check if the section already exists, if not, initialize it as an empty array
    if (!newData.additionalInformation[sectionName]) {
      newData.additionalInformation[sectionName] = [];
    }

    // Define the structure for each section
    const sectionStructure = {
      awards: { title: "", organization: "", awardYear: "", description: "" },
      certificates: {
        name: "",
        authority: "",
        license: "",
        startDate: "",
        endDate: "",
      },
      hobbies: { hobby: "" },
      languages: { language: "" },
      projects: {
        title: "",
        description: "",
        role: "",
        link: "",
        duration: "",
      },
    };

    // Create a new entry in the specified section
    newData.additionalInformation[sectionName].push({
      ...sectionStructure[sectionName],
    });

    // Update the state with the new data
    updateResume(newData);
    // navigate(`/resume/builder/add-information/${sectionName}`);
  };

  const handleInputChange = (value, section, index, field) => {
    // Copy the existing state to avoid mutating it directly
    const newData = { ...data };
    // Update the specific field for the given section and index
    newData.additionalInformation[section][index][field] = value;
    // Update the state with the new data
    updateResume(newData);
  };

  const handleSubmit = () => {
    navigate("/resume/builder/preview");
  };

  return (
    <Routes>
      <Route
        element={
          <div className="max-w-6xl mx-auto ">
            <div className=" flex flex-col mb-4 lg:flex-row items-start justify-between self-center gap-10">
              <div className=" w-full">
                <h2 className="text-xl md:text-3xl leading-tight font-semibold md:leading-snug">
                  Additional Information
                </h2>
                <p className="text-secondary-500 text-sm font-medium tracking-wide mt-3 mb-5">
                  Optional
                </p>
                <div className="flex gap-3 items-center">
                  {[
                    "awards",
                    "certificates",
                    "hobbies",
                    "languages",
                    "projects",
                  ].map((item) => (
                    <NavLink
                      to={`/services/resume/builder/add-information/${item}`}
                      className={({ isActive }) =>
                        isActive
                          ? "px-4 py-2 capitalize text-white bg-secondary-500 rounded flex items-center"
                          : "px-4 py-2 capitalize text-neutral-100 bg-neutral-600 rounded flex items-center"
                      }
                    >
                      {item}
                    </NavLink>
                  ))}
                </div>
                <Outlet />

                {pathname.split("/")[5] !== null && (
                  <div
                    onClick={() => handleAddSection(pathname.split("/")[5])}
                    className="flex items-center gap-2 text-primary-600 cursor-pointer font-bold mt-6"
                  >
                    <BsPlus className="bg-primary-600 text-lg rounded-full text-white" />
                    Add section
                  </div>
                )}
              </div>

              <div className="max-lg:hidden w-1/2">
                <div className="h-[360px] sm:h-[300px] md:h-[500px] lg:h-[580px] lg:w-[500px] flex items-center justify-center">
                  <div className="md:scale-[42%] lg:scale-[50%] mt-10">
                    <SelectedTemplates data={data} />
                  </div>
                </div>
              </div>
            </div>
            <NavigationButton
              back={() => navigate("/resume/ai/template-selector")}
              cont={handleSubmit}
            />
          </div>
        }
      >
        <Route path="/" element={<Selector data={data} />} />
        <Route
          path="/awards"
          element={<Awards data={data} handleInputChange={handleInputChange} />}
        />
        <Route
          path="/languages"
          element={
            <Languages data={data} handleInputChange={handleInputChange} />
          }
        />
        <Route
          path="/hobbies"
          element={
            <Hobbies data={data} handleInputChange={handleInputChange} />
          }
        />
        <Route
          path="/certificates"
          element={
            <Certification data={data} handleInputChange={handleInputChange} />
          }
        />
        <Route
          path="/projects"
          element={
            <Projects data={data} handleInputChange={handleInputChange} />
          }
        />
        <Route
          path="*"
          element={<Navigate to="/services/resume/builder/add-information" />}
        />
      </Route>
    </Routes>
  );
};

export default AdditionInformation;
