import { useRef, useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import BasicInfo from "./basicInfo";
import Contacts from "./contacts";
import Profile from "./profile";
import Education from "./education";
import Experience from "./experience";
import Skills from "./skills";
import { useLocation } from "react-router-dom";

function TemplateTwoA(data) {
  const page = useRef(null);
  const parentPage = useRef(null);
  const { pathname } = useLocation();

  const [pageMax, setPageMax] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const pageContainer = page.current;
    const pageX = Math.ceil(pageContainer.clientHeight / 1056);
    setPageMax(pageX);
    setPageNumber(pageX);
  }, [pathname, data]);

  const nextPage = () => {
    if (pageNumber !== pageMax) setPageNumber((prev) => prev + 1);
  };

  const previousPage = () => {
    if (pageNumber !== 1) setPageNumber((prev) => prev - 1);
  };

  useEffect(() => {
    parentPage.current.scrollTo({
      top: (pageNumber - 1) * 1056,
    });
  }, [pageNumber]);

  return (
    <div className="doc-body">
      <style>
        {`
        .doc-body .adjuster {
          width: 1px;
          height: ${pageMax * 1056}px;
        }
    `}
      </style>

      <div id="template">
        <div className="doc-body">
          <div>
            <style>
              {`
                @import url('https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&family=IBM+Plex+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

                .doc-body * {
                  margin: 0;
                  padding: 0;
                  font-size: 16px;
                  font-family: "Hind", sans-serif;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 21px;
                  color: #212121;
                  list-type: none;
                }

                .doc-body {
                  position: relative;
                }

                .doc-body .parent-container {
                  position: relative;
                  width: 816px;
                  height: 1056px;
                  display: flex;
                  align-items: stretch;
                  background: white;
                }

                .doc-body p, .doc-body span, .doc-body  ul li {
                  color: #7a7a7a;
                }

                .doc-body .top-head {
                  height: 10px;
                  background: #fff;
                }

                .doc-body h1,
                .doc-body h2,
                .doc-body h3,
                .doc-body h4 {
                  font-family: "IBM Plex Sans", sans-serif;
                  opacity: 1;
                }

                .doc-body h1 {   
                  font-size: 48px;
                  font-style: normal;
                  font-weight: 700;
                  line-height: 65px;
                }

                .doc-body h2 {      
                  font-size: 24px;
                  font-weight: 500;
                  line-height: 30px;
                  font-family: poppins;
                  color: #012166;
                  margin-bottom: 10px;
                }

                .doc-body h3 {
                  font-size: 20px;
                  font-weight: 700;
                  line-height: 24px;
                  margin-bttom: 10px;
                  text-transform: capitalize;
                }

                .section-row {
                  display: -webkit-flex; /* WebKit-based browsers */
                  display: flex;
                  padding:20px;
                  padding-bottom:0
                }
            `}
            </style>
          </div>

          {/* Use h-full and then control with max h */}
          <div
            ref={parentPage}
            className="parent-container overflow-y-scroll no-scrollbar pointer-events-none"
          >
            <div ref={page} className="w-full">
              <BasicInfo data={data?.basicInfo} />
              <Profile data={data?.bio} />
              <div className="section-row">
                <Education
                  education={data?.education}
                  currentEditedEducation={data.currentEditedEducation}
                />
                <Experience
                  jobExperience={data?.jobExperience}
                  currentEditedJob={data.currentEditedJob}
                />
              </div>
              <Skills data={data?.skills} />
              <Contacts data={data?.basicInfo} />
            </div>
            <div className="adjuster" />
          </div>
        </div>
      </div>

      <div className="top-head no-scrollbar">
        <div className="main-content"></div>
      </div>

      <div className="flex w-full justify-end items-center gap-2 !mt-4 text-neutral-300">
        <MdIcons.MdArrowBackIos
          onClick={previousPage}
          size="0.6rem"
          className="cursor-pointer text-neutral-200"
        />
        <span className="text-xs">
          {pageNumber} of {pageMax}
        </span>
        <MdIcons.MdArrowForwardIos
          onClick={nextPage}
          size="0.6rem"
          className="text-neutral-200 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default TemplateTwoA;
