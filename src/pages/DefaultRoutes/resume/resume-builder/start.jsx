import { useState } from "react";
import * as FaIcon from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StartBuilder = () => {
  const [popUp, setPopUp] = useState(false);
  const { jobExperience, basicInfo } =
    JSON.parse(localStorage.getItem("konectin-profiler-data-template")) || "";

  const links = [
    "/services/resume/builder",
    jobExperience
      ? Object.keys(jobExperience).length <= 1
        ? "/services/resume/builder/employment-experience"
        : "/services/resume/builder/employment-experience/job-activities"
      : "/services/resume/builder/employment-experience",
    "/services/resume/builder/education",
    "/services/resume/builder/skills",
    "/services/resume/builder/bio",
    "/services/resume/builder/download",
  ];

  const navigate = useNavigate();

  const handleContinueEdit = () => {
    const { currentStage } =
      JSON.parse(localStorage.getItem("konectin-profiler-data-template")) || "";
    const { token } =
      JSON.parse(localStorage.getItem("konectin-profiler-user")) || "";

    if (!token) {
      handleAfresh();
      return;
    }

    for (let index = 1; index <= links.length; index++) {
      if (index === currentStage) {
        navigate(links[index - 1]);
      }
    }
  };

  const handleAfresh = () => {
    localStorage.setItem(
      "konectin-profiler-data-template",
      JSON.stringify({
        completed: {
          basic_info: false,
          work_history: false,
          education: false,
          skills: false,
          bio: false,
        },
        basicInfo: {
          city: "",
          country: "",
          email: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          profession: "",
          state: "",
          zipCode: "",
        },
        currentEditedJob: 0,
        currentEditedEducation: 0,
        jobExperience: [],
        education: [],
        skills: [],
        bio: "",
        selectedTemplate: "",
        currentStage: 0,
      })
    );

    navigate("/services/resume/ai");
  };

  return (
    <section className="flex flex-col relative">
      <div className="w-9/12 min-w-fit mx-auto max-w-screen-xl flex flex-col justify-center items-center gap-8 m-8 py-24 px-7 rounded-xl bg-white md:w-6/12">
        <h1 className="text-[20px] md:text-[28px] leading-tight font-semibold md:leading-snug">
          Welcome back{" "}
          {basicInfo?.lastName.charAt(0).toUpperCase() +
            basicInfo?.lastName.slice(1)}
        </h1>
        <p className="md:w-[420px] tracking-wider text-sm text-center text-neutral-400">
          Continue from where you left off. By selecting create new resume, your
          previous content will be permanently deleted.
        </p>
        <div className="flex flex-col gap-4 md:flex-row">
          <div
            onClick={() => setPopUp(true)}
            className="bg-transparent border border-primary-600 cursor-pointer py-4 px-8 flex items-center justify-center text-sm rounded text-primary-600"
          >
            CREATE NEW RESUME
          </div>

          <div
            onClick={() => handleContinueEdit()}
            className="text-white cursor-pointer py-4 px-8 flex items-center justify-center text-sm rounded bg-primary-600"
          >
            CONTINUE EDITING
          </div>
        </div>

        {popUp && (
          <div className="fixed no-scrollbar w-full h-screen top-0 left-0 z-[100] flex">
            <div className="bg-neutral-100 opacity-70 absolute w-full h-full"></div>
            <div className="w-3/12 min-w-[250px] max-w-screen-xl m-auto bg-neutral-1000 flex flex-col md:flex-row items-stretch min-h-[40vh] z-20 relative rounded-sm">
              <div className="flex flex-col gap-4 md:gap-6 my-auto py-8 sm:py-6 px-6 md:px-12">
                <p className="w-full text-sm">
                  By selecting this option, your content will be permanently
                  deleted. Do you still wish to create a new resume
                </p>
                <div
                  onClick={() => handleAfresh()}
                  className="bg-neutral-1000 cursor-pointer border border-primary-400 py-4 px-8 flex items-center justify-center text-sm rounded text-primary-600"
                >
                  Yes, Continue
                </div>

                <div
                  onClick={() => setPopUp(false)}
                  className="bg-error-500 cursor-pointer py-4 px-8 flex items-center justify-center text-sm rounded text-neutral-1000"
                >
                  No, Go back
                </div>
              </div>

              <div
                onClick={() => setPopUp(false)}
                className="absolute cursor-pointer right-3 top-3"
              >
                <FaIcon.FaTimesCircle color="#F11010" size="1.3rem" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StartBuilder;
