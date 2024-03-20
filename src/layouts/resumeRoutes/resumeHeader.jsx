import { useEffect, useState } from "react";
import { FaBars, FaCheck, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
// import { konectinIcon } from "../../assets";
import * as MdIcons from "react-icons/md";
import "../header/header.css";
import ProgressWalkthrough from "../../components/resume/walkthrough/progressWalkthrough";
import { useWalkthrough } from "../../middleware/walkthrough";
import { useTemplateContext } from "../../middleware/resume";
import { konectinIcon } from "../../assets";
import { useAuth } from "../../middleware/auth";

function ResumeHeader() {
  const { user } = useAuth();

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

  const [isOpen, setToggle] = useState(false);
  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Internships", link: "/internship" },
    { name: "Resume Builder", link: "/resume" },
    { name: "Blog", link: "/blog" },
    { name: "About Us", link: "/about" },
  ];

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

  const toggle = () => {
    setToggle(!isOpen);
  };

  const backgroundColor = (link) =>
    `${
      completed[link.text.split(" ").join("_")] ||
      (link.text === "finalize" &&
        (pathname === "/resume/builder/preview" ||
          pathname === "/resume/builder/download"))
        ? "bg-success-400"
        : locationNo >= link.no
        ? "bg-white"
        : "bg-neutral-400 "
    }`;

  return (
    <>
      {currentModule === 1 && <ProgressWalkthrough />}
      <header className="relative ">
        <nav className="w-11/12 mx-auto max-w-screen-2xl flex justify-between items-center gap-16 py-4">
          <Link to="/" className="relative z-30 nav-icon block">
            <img
              className={"brightness-[500%] md:filter-none"}
              src={konectinIcon}
              alt="Konectin Logo"
            />
          </Link>

          <nav className="hidden gap-8 transistion-all md:flex flex-row text-sm">
            {navLinks.map((link, index) => (
              <NavLink
                className={({ isActive }) =>
                  (link.link === "/blog" &&
                    pathname.split("/")[1] === "blog") ||
                  isActive
                    ? "py-1 border-b border-secondary-600"
                    : "py-1 hover:border-b border-secondary-600"
                }
                key={index}
                to={link.link === "/blog" ? "/blog/all" : link.link}
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to={user ? "/dashboard/" : "/login"}
              className="lg:hidden hover:border-b border-secondary-600 py-1"
            >
              {user ? "Profile" : "Log In"}
            </Link>
          </nav>

          <nav className="hidden lg:block">
            {user ? (
              <Link
                to="/dashboard/"
                className="relative flex items-center cursor-pointer gap-2 text-xs text-neutral-400"
              >
                <div
                  className={`w-10 h-10 rounded-md flex items-center justify-center text-white bg-primary-700
                `}
                >
                  <MdIcons.MdPerson size="1.5rem" />
                </div>
                <div>
                  <h3
                    className={`"text-neutral-100
                 text-base`}
                  >
                    {user.fullname}
                  </h3>
                  <p>{user.email}</p>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className={`w-full text-sm px-6 py-2 text-black-500 border-secondary-500 border rounded-sm hover:text-white hover:bg-secondary-500 transistion duration-500`}
              >
                Log In
              </Link>
            )}
          </nav>
        </nav>
        <div className="bg-[#191A1F]">
          <nav className=" w-11/12 mx-auto max-w-screen-2xl flex justify-between items-center gap-6 lg:gap-16 py-4">
            {/* Desktop and Tab View  */}

            <nav className="hidden relative md:flex justify-center items-center w-full">
              <nav className=" transistion-all flex  md:gap-3 lg:gap-6 flex-row text-sm">
                {links.map((link, index) => (
                  <Link
                    to={
                      completed[link.text.split(" ").join("_")] ||
                      locationNo >= link.no
                        ? link.path
                        : "#"
                    }
                    key={index}
                    className={`flex cursor-pointer items-center gap-2 text-sm ${
                      completed[link.text.split(" ").join("_")] ||
                      (link.text === "finalize" &&
                        (pathname === "/resume/builder/preview" ||
                          pathname === "/resume/builder/download"))
                        ? "text-success-400 font-semibold"
                        : locationNo >= link.no
                        ? "text-white font-semibold"
                        : "text-neutral-400 font-medium"
                    }`}
                  >
                    <span
                      className={`max-md:hidden circle-orange ${
                        completed[link.text.split(" ").join("_")] ||
                        (link.text === "finalize" &&
                          (pathname === "/resume/builder/preview" ||
                            pathname === "/resume/builder/download"))
                          ? "bg-success-400"
                          : locationNo >= link.no
                          ? "text-white border-white"
                          : "text-neutral-400 border-neutral-400"
                      }`}
                    >
                      {completed[link.text.split(" ").join("_")] ? (
                        <FaCheck color="white" />
                      ) : (
                        link.no
                      )}
                    </span>
                    <span className="flex-1 uppercase">{link.text}</span>
                    <div className=" flex items-center">
                      <div className={`${backgroundColor(link)} h-0.5 w-8 `} />
                      <div
                        className={`${backgroundColor(
                          link
                        )} h-2 w-2 rounded-full`}
                      />
                    </div>
                    {/* {link.no <= links.length - 1 && (
                    <span
                      className={`nav-dotted-line max-xl:hidden relative rounded-xl block w-6 h-0.5 ${
                        completed[link.text.split(" ").join("_")]
                          ? "bg-success-400"
                          : locationNo >= link.no
                          ? "bg-secondary-500"
                          : "bg-secondary-300 inactive"
                      }`}
                    />
                  )} */}
                  </Link>
                ))}
              </nav>
            </nav>

            {/* Mobile View  */}
            <nav
              onClick={toggle}
              className="md:hidden relative z-30 cursor-pointer"
            >
              {isOpen ? (
                <FaTimes size="1.5rem" color="#fff" />
              ) : (
                <FaBars size="1.5rem" color="#332a66" />
              )}
            </nav>
            <nav
              className={
                isOpen
                  ? "flex flex-col gap-8 w-full h-screen items-start pt-36 bg-primary-600 px-6 text-white fixed z-20 top-0 right-0 md:hidden"
                  : "hidden"
              }
            >
              {navLinks.map((link, index) => (
                <Link
                  className={
                    (link.link === "/blog" &&
                      pathname.split("/")[1] === "blog") ||
                    link.link === pathname
                      ? "py-1 border-b border-secondary-600"
                      : "py-1"
                  }
                  onClick={toggle}
                  key={index}
                  to={link.link === "/blog" ? "/blog/all" : link.link}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </nav>
        </div>
      </header>

      {/* Mobile View  */}
      <nav className=" absolute w-full top-24 flex flex-row justify-center gap-6 mx-auto md:hidden px-4">
        {links.map((link, index) => (
          <Link
            to={link.path}
            key={index}
            className={`${
              link.no <= links.length - 1
                ? "flex cursor-pointer items-center gap-2 text-sm"
                : ""
            } ${
              completed[link.text.split(" ").join("_")] ||
              (link.text === "finalize" &&
                (pathname === "/resume/builder/preview" ||
                  pathname === "/resume/builder/download"))
                ? "text-success-400 font-semibold"
                : locationNo >= link.no
                ? "text-secondary-500 font-semibold"
                : "text-secondary-300 font-medium"
            }`}
          >
            <span
              className={`circle-orange ${
                completed[link.text.split(" ").join("_")] ||
                (link.text === "finalize" &&
                  (pathname === "/resume/builder/preview" ||
                    pathname === "/resume/builder/download"))
                  ? "bg-success-400"
                  : locationNo >= link.no
                  ? "text-secondary-500 border-secondary-500"
                  : "text-secondary-300 border-secondary-300"
              }`}
            >
              {completed[link.text.split(" ").join("_")] ? (
                <FaCheck color="white" />
              ) : (
                link.no
              )}
            </span>
            {link.no <= links.length - 1 && (
              <span
                className={`nav-dotted-line relative rounded-xl hidden xxs:block w-4 sm:w-6 h-0.5 ${
                  completed[link.text.split(" ").join("_")]
                    ? "bg-success-400"
                    : locationNo >= link.no
                    ? "bg-secondary-500"
                    : "bg-secondary-300 inactive"
                }`}
              />
            )}
          </Link>
        ))}
      </nav>
    </>
  );
}

export default ResumeHeader;
