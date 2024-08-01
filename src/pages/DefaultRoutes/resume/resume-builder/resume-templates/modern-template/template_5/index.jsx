import { useRef, useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import { useLocation } from "react-router-dom";
import BasicInfo from "./basicInfo";
import Profile from "./profile";
import Education from "./education";
import Skills from "./skills";
import Experience from "./experience";
import Projects from "./projects";
// import Awards from "./awards";
import Certificates from "./certificates";
import Languages from "./languages";
import Hobbies from "./hobbies";

function TemplateFive(data) {
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

  console.log(data);
  return (
    <div className="modern-5">
      <style>
        {`
            .modern-5 .adjuster {
            width: 1px;
            height: ${pageMax * 1056}px;
            }
        `}
      </style>
      <div id="template">
        <div className="modern-5">
          <div>
            <style>
              {`
                @import url('https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&family=IBM+Plex+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
                
                @page {
                    size: letter;
                    margin: 0;
                    box-sizing: border-box;
                }
                    
                .modern-5 {
                    position: relative;
                }

                .modern-5 * {
                    margin: 0;
                    padding: 0;
                    font-size: 16px;
                    font-family: "Hind", sans-serif;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 21px;
                    color: #212121;
                }

                .modern-5 .parent-container {
                    position: relative;
                    width: 816px;
                    height: 1056px;
                    display: flex;
                    align-items: stretch;
                    background: white;
                }

                .modern-5 .page {
                    display: flex;
                    flex-direction: column;
                    min-height: 1056px;
                    position: relative;
                    margin: 44px 40px 28px;
                }

                .modern-5 .w-full {
                    width: 100%;
                }

                .modern-5 .header {
                    font-family: "Avenir", sans-serif;
                    font-size: 13px;
                    line-height: 15px;
                    letter-spacing: 0.20000000298023224px;
                }

                .modern-5 .section {
                    display: -webkit-box;
                    display: flex;
                    align-items: start;
                    width: 100%;
                    margin: 0px auto;
                }
                
                .modern-5 .capitalize {
                    text-transform: capitalize;
                }
                
                .modern-5 .img {
                    height: 128px;
                    width: 116px;
                    margin-right: 20px;
                }
                .modern-5 hr {        
                  height: 1px;
                  background-color: black;
                  border: none;
                  margin-top: 28px;
                  margin-bottom: 21px;
                  opacity: 0.1;
                }
                   
                .modern-5 .main-content {
                  width: 70%;
                  display: flex;
                  flex-direction: column;
                  row-gap: 24px;
                }
                .modern-5 .side-content {
                  width: 30%;
                  display: flex;
                  flex-direction: column;
                  row-gap: 36px;
                }
                .modern-5 .line {
                  width: 1px;
                  height: 100%;
                  background-color: black;
                  border: none;
                  opacity: 0.1;
                  margin-left: 28px;
                  margin-right: 14px;
                }
                .modern-5 .basicinfo {
                  display: flex;
                }
                .modern-5 .info-container {
                  display: flex;
                  flex-direction: column;
                  row-gap: 11px;
                }
                .modern-5 .biodata {
                  display: flex;
                  flex-direction: column;
                  row-gap: 9px;
                }
                .modern-5 .biodata > p {
                  font-size: 11px;
                  opacity: 0.6;
                }
                .modern-5 .biodata > h1 {
                  font-size: 24px;
                }
                .modern-5 .contact {
                  display: flex;
                  column-gap: 44px;
                  font-size: 12px;
                }  
                .modern-5 .profile {
                  display: flex;
                  flex-direction: column;
                  row-gap: 10px;
                }
                  .modern-5 .edu-details {
                    display: flex;
                    flex-direction: column;
                    row-gap: 15px;
                  }
                .modern-5 .school {
                  display: flex;
                  column-gap: 5px;
                  align-items: center;
                }
                .modern-5 .school > h3 {
                  font-weight: 500;
                  font-size: 12px;
                }
                .modern-5 .duration {
                  font-size: 11px;
                  opacity: 0.5;
                }
                .modern-5 .degree {
                  font-size: 12px;
                }
                .modern-5 .jobs, .modern-5 .job-details {
                  display: flex;
                  flex-direction: column;
                  row-gap: 15px;
                }
                .modern-5 .jobInfo {
                  display: flex;
                  column-gap: 7px;
                }
                .modern-5 .jobInfo > h3 {
                  font-weight: 500;
                  font-size: 12px;
                }
                .modern-5 .paragraph {
                  font-size: 11px;
                  opacity: 0.6;
                }
                .modern-5 .skills, .modern-5 .certs, .modern-5 .langs, .modern-5 .hobbies {
                  display: flex;
                  flex-direction: column;
                  row-gap: 15px;
                }
                .modern-5 .skill, .modern-5 .list-none {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
                .modern-5 .skill-desc, .modern-5 .list-container {
                  display: flex;
                  flex-direction: column;
                  row-gap: 7px;
                }
                .modern-5 .skill > h4, .modern-5 .list-item {
                  font-size: 11px;
                  font-weight: 500;
                }
                .modern-5 .skill > p {
                  font-size: 10px;
                  opacity: 0.5;
                }
                
            `}
            </style>
          </div>
          <div
            ref={parentPage}
            className="parent-container overflow-y-scroll no-scrollbar pointer-events-none"
          >
            <div ref={page} className="w-full page">
              <BasicInfo data={data?.basicInfo} image={data?.image?.value} />
              <hr />
              <Profile data={data?.bio} />
              <hr />
              <div className="section h-max">
                <div className="main-content">
                  <Education
                    education={data?.education}
                    currentEditedEducation={data.currentEditedEducation}
                  />
                  <Experience
                    jobExperience={data?.jobExperience}
                    currentEditedJob={data.currentEditedJob}
                  />
                  <Projects projects={data?.additionalInformation.projects} />
                  {/* <Awards awards={data?.additionalInformation.awards} /> */}
                </div>

                <div className="line"></div>

                <div className="side-content">
                  <Skills data={data?.skills} />
                  <Certificates
                    data={data?.additionalInformation.certificates}
                  />
                  <Languages
                    languages={data?.additionalInformation.languages}
                  />
                  <Hobbies hobbies={data?.additionalInformation.hobbies} />
                </div>
              </div>
            </div>
            <div className="adjuster" />
          </div>
        </div>

        {pageMax > 1 && (
          <div className="parent-container top-head no-scrollbar">
            <div className="main-content"></div>
            <div className="side-content"></div>
          </div>
        )}
      </div>

      {pageMax > 1 && (
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
      )}
    </div>
  );
}
export default TemplateFive;
