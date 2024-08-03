import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import ProgressWalkthrough from "../../components/resume/walkthrough/progressWalkthrough";
import { useWalkthrough } from "../../middleware/walkthrough";
import { useTemplateContext } from "../../middleware/resume";

function ResumeSubHeader() {
  const { templateData, setTemplateData } = useTemplateContext();
  const { currentModule } = useWalkthrough();
  const currentStage = templateData?.currentStage;
  const locationNo = currentStage;

  const [completed, setCompleted] = useState({
    basic_info: false,
    work_history: false,
    education: false,
    skills: false,
    bio: false,
  });

  const { pathname } = useLocation();

  const [links] = useState([
    { path: "/resume/builder", text: "basic info", no: 1 },
    {
      path:
        Object.keys(
          templateData?.jobExperience ? templateData?.jobExperience : []
        ).length <= 0
          ? "/resume/builder/employment-experience"
          : "/resume/builder/employment-experience/job-activities",
      text: "work history",
      no: 2,
    },
    {
      path:
        Object.keys(templateData?.education || []).length <= 0
          ? "/resume/builder/education"
          : "/resume/builder/education/list",
      text: "education",
      no: 3,
    },
    {
      path: "/resume/builder/skills",
      text: "skills",
      no: 4,
    },
    {
      path: "/resume/builder/bio",
      text: "bio",
      no: 5,
    },
    { path: "#", text: "finalize", no: 6 },
  ]);

  useEffect(() => {
    Object.values(completed).map(
      (value, i) =>
        value && setTemplateData((prev) => ({ ...prev, currentStage: i + 2 }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  useEffect(() => {
    setCompleted(templateData?.completed);
  }, [templateData]);

  const backgroundColor = (link) =>
    `${
      completed[link.text.split(" ").join("_")] ||
      (link.text === "finalize" &&
        (pathname === "/resume/builder/preview" ||
          pathname === "/resume/builder/download"))
        ? "bg-primary-500"
        : locationNo >= link.no
        ? "bg-primary-500"
        : "bg-neutral-400"
    }`;

  return (
    <>
      {currentModule === 1 && <ProgressWalkthrough />}
      <header className="relative z-0 bg-neutral-700 py-4">
        <nav className="max-md:hidden w-full px-2 mx-auto max-w-screen-2xl flex justify-between items-center gap-6 lg:gap-16">
          {/* Desktop and Tab View  */}
          <nav className="hidden relative md:flex justify-center items-center w-full">
            <nav className="transistion-all flex gap-4 lg:gap-6 flex-row text-sm">
              {links.map((link, index) => (
                <nav
                  key={index}
                  className={`flex items-end gap-2 text-sm ${
                    completed[link.text.split(" ").join("_")] ||
                    (link.text === "finalize" &&
                      pathname === "/resume/builder/preview")
                      ? "text-primary-500 font-semibold"
                      : locationNo >= link.no
                      ? "text-primary-500 font-semibold"
                      : "text-neutral-400 font-medium"
                  }`}
                >
                  <span
                    className={`max-md:hidden circle-orange ${
                      completed[link.text.split(" ").join("_")] ||
                      (link.text === "finalize" &&
                        pathname === "/resume/builder/preview")
                        ? "bg-primary-500"
                        : locationNo >= link.no
                        ? "text-primary-500 border-primary-500 border-2"
                        : "text-neutral-400 border-neutral-400 border-2"
                    }`}
                  >
                    {completed[link.text.split(" ").join("_")] ? (
                      <FaCheck size="10px" color="white" />
                    ) : (
                      <span className="pt-0.5">{link.no}</span>
                    )}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="flex-1 uppercase">{link.text}</span>
                    {link.no <= links.length - 1 && (
                      <div className="flex items-center max-lg:hidden">
                        <div className={`${backgroundColor(link)} h-0.5 w-6`} />
                        <div
                          className={`${backgroundColor(
                            link
                          )} h-2 w-2 rounded-full`}
                        />
                      </div>
                    )}
                  </div>
                </nav>
              ))}
            </nav>
          </nav>
        </nav>

        {/* Mobile View  */}
        <nav className="w-full flex flex-row justify-center gap-4 sm:gap-6 mx-auto md:hidden px-4">
          {links.map((link, index) => (
            <nav
              key={index}
              className={`${
                link.no <= links.length - 1
                  ? "flex items-center gap-2 text-sm"
                  : ""
              }`}
            >
              <span
                className={`circle-orange ${
                  completed[link.text.split(" ").join("_")] ||
                  (link.text === "finalize" &&
                    (pathname === "/resume/builder/preview" ||
                      pathname === "/resume/builder/download"))
                    ? "bg-primary-500 font-semibold"
                    : locationNo >= link.no
                    ? "text-primary-500 border-primary-500 font-semibold border-2"
                    : "text-neutral-500 border-neutral-500 border-2 inactive"
                }`}
              >
                {completed[link.text.split(" ").join("_")] ? (
                  <FaCheck size="10px" color="white" />
                ) : (
                  <span className="pt-0.5">{link.no}</span>
                )}
              </span>
              {link.no <= links.length - 1 && (
                <span
                  className={`nav-dotted-line relative rounded-xl hidden xxs:block w-4 sm:w-6 h-0.5 ${
                    completed[link.text.split(" ").join("_")]
                      ? "bg-primary-500"
                      : locationNo >= link.no
                      ? "bg-primary-500"
                      : "bg-neutral-500 inactive"
                  }`}
                />
              )}
            </nav>
          ))}
        </nav>
      </header>
    </>
  );
}

export default ResumeSubHeader;
