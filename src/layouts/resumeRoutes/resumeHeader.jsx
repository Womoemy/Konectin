import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import { konectinLogo } from "../../assets";

import ResumeSubHeader from "./resumeSubHeader";
import Headline from "../../components/headline";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../middleware/auth";
import ResumeLeftbar from "./resumeLeftbar";
import ResumeRightbar from "./resumeRightbar";

function ResumeHeader() {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sections");

  const { pathname } = useLocation();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="static">
      {!pathname.includes("/internship") && (
        <Headline
          message="Konectin Partners EntryLevel"
          pageTo="/services/internship"
        />
      )}
      <nav className="w-full lg:w-11/12 relative z-10 mx-auto max-w-screen-2xl flex justify-between items-stretch gap-10 lg:gap-12 py-4 px-2 xxs:px-4 lg:px-0">
        <Link to="/" className="nav-icon block">
          <img className="w-[40px]" src={konectinLogo} alt="Konectin Logo" />
        </Link>
        <nav
          onClick={toggle}
          className="md:hidden cursor-pointer flex items-center"
        >
          <FaIcons.FaTimes size="1.5rem" color="#fff" />

          <HiIcons.HiOutlineMenuAlt3 size="1.5rem" color="#332a66" />
        </nav>

        {/* Children when opened */}
        <div
          onClick={toggle}
          className={
            isOpen
              ? "w-full h-screen items-start pt-12 bg-black bg-opacity-50 fixed z-10 top-0 left-0 md:hidden"
              : "hidden"
          }
        ></div>

        <nav
          className={
            isOpen
              ? "flex flex-col gap-6 min-w-[280px] max-w-[420px] w-9/12 h-screen pt-6 bg-whites-200 px-4 xxs:px-6 fixed z-20 top-0 left-0 md:hidden"
              : "hidden"
          }
        >
          <nav className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center cursor-pointer gap-2 text-xs text-neutral-400 w-full">
              <div className="w-10 h-10 rounded-md flex items-center justify-center text-white bg-primary-700">
                <MdIcons.MdPerson size="1.5rem" />
              </div>
              <div>
                <h3 className="text-white md:text-neutral-100 text-base">
                  {user?.fullname}
                </h3>
                <p>{user?.email}</p>
              </div>
            </div>

            <div
              onClick={toggle}
              className="md:hidden relative cursor-pointer flex items-center"
            >
              <FaIcons.FaTimes size="1.5rem" />
            </div>
          </nav>

          <nav className="flex justify-center gap-8 px-4 bg-neutral-900">
            {["sections", "format"].map((tab) => (
              <h4
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-4 capitalize text-sm font-semibold border-b-2 cursor-pointer ${
                  tab === selectedTab
                    ? "text-secondary-400 border-secondary-400"
                    : "border-transparent"
                }`}
              >
                {tab}
              </h4>
            ))}
          </nav>

          <div
            onClick={() =>
              selectedTab === "sections" ? setIsOpen(false) : null
            }
            className="text-sm"
          >
            {selectedTab === "sections" ? (
              <ResumeLeftbar />
            ) : (
              <ResumeRightbar isMobile />
            )}
          </div>
        </nav>
      </nav>

      <ResumeSubHeader />
    </header>
  );
}

export default ResumeHeader;
