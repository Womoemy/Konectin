import React from "react";
import {
  basicInfo,
  bio,
  education,
  finalize,
  skill,
  workExperience,
} from "../../assets";
import Option from "../../components/resume/resumeLeftSide/Option";
import { useTemplateContext } from "../../middleware/resume";

function ResumeLeftbar() {
  const { templateData } = useTemplateContext();

  const routes = [
    { route: "/", icon: basicInfo, label: "Basic Info" },
    {
      route:
        Object.keys(
          templateData?.jobExperience ? templateData?.jobExperience : []
        ).length <= 0
          ? "/employment-experience"
          : "/employment-experience/job-activities",
      icon: workExperience,
      label: "Work Experience",
    },
    {
      route:
        Object.keys(templateData?.education ? templateData?.education : [])
          .length <= 0
          ? "/education"
          : "/education/list",
      icon: education,
      label: "Education",
    },
    { route: "/skills", icon: skill, label: "Skills" },
    { route: "/bio", icon: bio, label: "Bio" },
    {
      route: "/add-information",
      icon: finalize,
      label: "Finalize",
    },
  ];

  return (
    <>
      <ul className="flex flex-col gap-3 md:gap-4">
        {routes.map((item) => (
          <Option item={item} key={item.route} />
        ))}
      </ul>
    </>
  );
}

export default ResumeLeftbar;
