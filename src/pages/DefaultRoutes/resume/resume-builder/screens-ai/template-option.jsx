import { template_images } from "../../../../../assets/resume";
import { useTemplateContext } from "../../../../../middleware/resume";

// Import Swiper styles
import "swiper/swiper.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FieldForm } from "../../../../../components/form";
import * as FaIcon from "react-icons/fa";
import axios from "axios";
import { konectinIcon } from "../../../../../assets";
import { loginForm } from "../../../../sign/signData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { onSectionComplete } from "../screens/verification";

const TemplateOption = ({ sectionName, sectionType }) => {
  const [customTemplate, setCustomTemplate] = useState({
    basicInfo: {
      city: "",
      country: "Indonesia",
      email: "hani.husa@gmail.com",
      firstName: "Hani",
      lastName: "Husamuddin",
      phoneNumber: "822 2045 4652",
      phoneCode: " 62",
      profession: "Frontend Developer",
      profileUrl: "",
      state: "Yogakarta",
      zipCode: "33323D",
    },
    theme: {
      color: "blue",
      font: {
        family: "",
        size: {
          heading: "",
          paragraph: "",
        },
        weight: "normal",
      },
    },
    image: {
      show: false,
      value: "",
    },
    currentEditedJob: 1,
    currentEditedEducation: 1,
    jobExperience: [
      {
        jobTitle: "Web Strategist",
        company: "Freelance",
        country: "Indonesia",
        city: "Yogakatra",
        state: "",
        startMonth: "April",
        startYear: "2010",
        endMonth: "November",
        endYear: "2011",
        workDesc:
          "<ul><li>Implemented brand positioning strategy for two public institutions that increased brand awareness by 25% within two quarters</li><li>Redesigned&nbsp; a comprehensive brand guideline for an organisation resulting in a 30% increase in brand recognition within six months&nbsp;</li><li>Scrutinized ongoing brand communications by collaborators to achieve consistency and effective delivery.&nbsp;&nbsp;</li></ul>",
        current: false,
      },
    ],
    education: [
      {
        city: "Accra",
        country: "Indonesia",
        degree: "M.A Business Psychology ",
        startMonth: "February",
        startYear: 2034,
        schoolName: "University of Management, Poland",
        state: "",
        endMonth: "April",
        endYear: 2036,
        awards: [],
        relevantCourses: [],
      },
    ],
    skills: [
      { name: "REACT", lvl: "100" },
      { name: "Vue js", lvl: "60" },
      { name: "Assembly Language", lvl: "10" },
      { name: "JAVA", lvl: "45" },
    ],
    additionalInformation: {},
    bio: "See for yourself how Konectin can transform your job application. Check out samples of professional resumes that have landed users interviews with top companies.",
    currentStage: 0,
  });

  const url = import.meta.env.VITE_CLIENT_SERVER_URL;
  const { templateData, setTemplateData } = useTemplateContext();

  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  async function createResume(user_id) {
    const data = { ...templateData };

    delete data.completed;
    delete data._id;
    delete data.userId;
    delete data.__v;

    await axios
      .post(`${url}/resume?userId=${user_id}`, {
        ...data,
        currentStage: 1,
      })
      .then((res) => {
        const resume = res.data.cv;
        setTemplateData((prev) => ({
          ...prev,
          ...resume,
          selectedTemplate: selectedTemplate,
        }));

        navigate("/services/resume/builder");
      });
  }

  const handleSelect = (value) => {
    // const { currentStage, selectedTemplate } = templateData;
    // const { _id } =
    //   JSON.parse(localStorage.getItem("konectin-profiler-user")) || "";

    setSelectedTemplate(value);

    // Remove this after the testing
    setTemplateData((prev) => ({
      ...prev,
      selectedTemplate: value,
    }));

    navigate("/services/resume/builder");

    // if (_id === undefined) {
    //   setPopUp(true);
    // } else if (selectedTemplate.id !== "") {
    //   // if coming from other section
    //   setTemplateData((prev) => ({
    //     ...prev,
    //     selectedTemplate: value,
    //   }));

    //   onSectionComplete(
    //     { ...templateData, selectedTemplate: value },
    //     currentStage
    //   );

    //   navigate("/services/resume/builder");
    // } else {
    //   createResume(_id);
    // }
  };

  const handleSubmit = async (data) => {
    setLoading(true);

    try {
      await axios.post(`${url}/login`, data).then((res) => {
        const user = { ...res.data.data };
        user.token = res.data.token;

        localStorage.setItem("konectin-profiler-user", JSON.stringify(user));
        setLoading(false);
        createResume(selectedTemplate, user._id);
      });
    } catch (err) {
      setLoading(false);
      setPopUp(false);
      setSelectedTemplate({ name: "", id: "", themeColors: [] });
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-start w-full max-w-[1000px] justify-start gap-4">
      <h3 className="text-xl lg:text-2xl font-bold capitalize">
        {sectionName}
      </h3>
      <div className="max-w-[100%] mx-auto grid grid-cols-4 gap-4">
        <div className="flex gap-3 items-stretch">
          {sectionType.map((template) => (
            <div
              key={template.name}
              className="h-[200px] w-[150px] md:h-[270px] md:w-[200px] flex items-center justify-center group relative cursor-pointer"
            >
              <div
                className={`bg-neutral-100 bg-opacity-70 absolute w-full h-full z-10 hidden group-hover:flex justify-center items-center ${
                  selectedTemplate.name === template.name ? "!flex" : "hidden"
                }`}
              >
                <div
                  className={`${
                    selectedTemplate.name === template.name
                      ? "bg-primary-400"
                      : "bg-secondary-600"
                  } text-xs px-3 py-2 text-white rounded`}
                  onClick={() =>
                    selectedTemplate.name === template.name
                      ? null
                      : handleSelect({
                          name: template.name,
                          id: template.id,
                          themeSet: template.themeColors,
                        })
                  }
                >
                  {selectedTemplate.name === template.name
                    ? "Selected"
                    : "Select Template"}
                </div>
              </div>

              <div className="scale-[18%] md:scale-[24%]">
                {template.element
                  ? template.element({
                      ...customTemplate,
                      theme: {
                        ...customTemplate.theme,
                        color: template.themeColors[0],
                      },
                    })
                  : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {popUp && (
        <div className="fixed no-scrollbar w-full h-screen top-0 left-0 z-[100] flex">
          <div className="bg-neutral-100 opacity-70 absolute w-full h-full"></div>
          <div className="w-3/12 min-w-[280px] sm:min-w-[350px] max-w-screen-xl m-auto bg-neutral-1000 flex flex-col md:flex-row items-stretch min-h-[40vh] z-20 relative rounded-sm">
            <div className="flex flex-col gap-4 md:gap-6 my-auto py-8 sm:py-6 px-6 md:px-8">
              <Link to="/">
                <img src={konectinIcon} alt="Konectin Logo" />
              </Link>
              <p className="w-full text-sm">
                To continue using our free services, you have to be logged into
                your account.
              </p>

              <div className="w-full flex flex-col items-stretch text-xs md:text-sm">
                {isloading && <p className="text-xs">Logging you in now...</p>}
                <FieldForm
                  handleSubmit={handleSubmit}
                  params={loginForm}
                  formFor="Sign in"
                  errorMessage={errorMessage}
                ></FieldForm>

                {/* Log In Link */}
                <p className="self-center mt-6">
                  You don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-secondary-600 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>

            <div
              onClick={() => {
                setPopUp(false);
                setSelectedTemplate({ name: "", id: "", themeColors: [] });
              }}
              className="absolute cursor-pointer right-3 top-3"
            >
              <FaIcon.FaTimesCircle color="#F11010" size="1.3rem" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateOption;
