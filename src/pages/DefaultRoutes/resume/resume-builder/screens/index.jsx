/* eslint-disable react-hooks/exhaustive-deps */
import { FaRegEye } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import BasicInformation from "./basicinfo";
import EmploymentExperience from "./experience";
import Education from "./education";
import Skills from "./skills";
import Bio from "./bio";
import Preview from "./preview";
import AdditionInformation from "./additon_information";

import { useAuthContext } from "../../../../../middleware/auth";
import { useTemplateContext } from "../../../../../middleware/resume";
import { useWalkthrough } from "../../../../../middleware/walkthrough";

import WelcomeWalkthrough from "../../../../../components/resume/walkthrough/welcomeWalkthrough";
import TipsWalkthrough from "../../../../../components/resume/walkthrough/tipsWalkthrough";
import DownloadWalkthrough from "../../../../../components/resume/walkthrough/downloadWalkthrough";
import FinishWalkthrough from "../../../../../components/resume/walkthrough/finishWalkthrough";
import PreviewTemplate from "../../../../../components/resume/resumeRightSide/previewTemplate";

function Builder() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [preview, setPreview] = useState(false);

  const { currentModule } = useWalkthrough();

  const { templateData, onInputChange, setTemplateData } = useTemplateContext();

  useEffect(() => {
    if (!templateData || user === null) {
      navigate("/services/resume/ai");
    } else if (user._id === (null || undefined)) {
      setTemplateData({
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
          phoneCode: "",
          profession: "",
          profileUrl: "",
          state: "",
          zipCode: "",
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
        currentEditedJob: 0,
        currentEditedEducation: 0,
        jobExperience: [],
        education: [],
        skills: [],
        additionalInformation: {},
        bio: "",
        selectedTemplate: { name: "", id: "", themeSet: [] },
        currentStage: 0,
      });
      navigate("/services/resume/ai/template-selector");
    }
  }, [templateData, navigate, user]);

  const component_list = [
    {
      element: BasicInformation,
      link: "/",
    },
    {
      element: EmploymentExperience,
      link: "/employment-experience/*",
    },
    {
      element: Education,
      link: "/education/*",
    },
    {
      element: Skills,
      link: "/skills",
    },
    {
      element: Bio,
      link: "/bio",
    },
    {
      element: AdditionInformation,
      link: "/add-information/*",
    },
    {
      element: Preview,
      link: "/preview",
    },
  ];

  // Function to check if a step is completed
  // const isStepCompleted = (step) => {
  //   if (step === "") {
  //     return templateData.completed["basic_info"] === true;
  //   } else if (step === "employment-experience/*") {
  //     return templateData.completed["work_history"] === true;
  //   } else if (step === "education/*") {
  //     return templateData.completed["education"] === true;
  //   } else if (step === "add_information/*") {
  //     return true;
  //   } else if (step === "preview") {
  //     return true;
  //   } else if (step === "download") {
  //     return true;
  //   }
  //   return templateData.completed[step] === true;
  // };

  return (
    <div className="px-4 sm:px-6 md:px-0 md:w-[calc(90%_-_88px)] md:mx-auto">
      <div className="relative md:hidden">
        <div
          className="absolute cursor-pointer right-0 -top-4 bg-black w-9 h-9 rounded-full flex items-center justify-center"
          onClick={() => setPreview(true)}
        >
          <FaRegEye className="text-white" />
        </div>
        {preview && <PreviewTemplate setPreview={setPreview} />}
      </div>
      {currentModule === 0 && <WelcomeWalkthrough />}
      {currentModule === 3 && <TipsWalkthrough />}
      {currentModule === 5 && <DownloadWalkthrough />}
      {currentModule === 6 && <FinishWalkthrough />}
      <Routes>
        {component_list.map((component) => {
          return (
            <Route
              key={component.link}
              path={component.link}
              element={
                <component.element
                  data={templateData}
                  onInputChange={onInputChange}
                  updateResume={setTemplateData}
                />
              }
            />
          );
        })}

        <Route path="*" element={<Navigate to="/services/resume/builder" />} />
      </Routes>
    </div>
  );
}

export default Builder;
