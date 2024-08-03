import { Suspense } from "react";
import ResumeHeader from "./resumeHeader";
import ResumeFooter from "./resumeFooter";
import ResumeLeftbar from "./resumeLeftbar";
import ResumeRightbar from "./resumeRightbar";
import { Outlet, useLocation } from "react-router-dom";
import { BuilderBg, konectinLogo } from "../../assets";
import { useWalkthrough } from "../../middleware/walkthrough";
import LeftSidebarWalkthrough from "../../components/resume/walkthrough/leftSidebarWalkthrough";
import RightSidebarWalkthrough from "../../components/resume/walkthrough/rightSidebarWalkthrough";

function ResumeRoutes() {
  const { pathname } = useLocation();
  const { currentModule } = useWalkthrough();

  return (
    <>
      {pathname.split("/")[3] === "builder" && <ResumeHeader />}
      <div className="flex relative builder-main justify-center">
        {currentModule === 2 && <LeftSidebarWalkthrough />}
        <div className="absolute top-0 left-0 bottom-0 z-40 group pt-[85px] transition-all duration-500 w-14 hover:w-56 bg-white overflow-hidden hidden md:block text-sm">
          {pathname.split("/")[3] === "builder" && <ResumeLeftbar />}
        </div>
        <main
          className={`min-h-screen ${
            pathname.split("/")[3] === "builder" ? "pt-12" : "pt-[134px]"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(249, 249, 249, .98), rgba(249, 249, 249, .98)), url("${BuilderBg}")`,
            backgroundSize: "cover",
          }}
        >
          <Suspense
            fallback={
              <>
                <div className="bg-neutral-100 opacity-40 absolute w-full h-full"></div>
                <div className="relative z-10 w-full h-full flex">
                  <div className="animate-pulse m-auto bg-white p-4 rounded-full">
                    <img className="w-6" src={konectinLogo} alt="" />
                  </div>
                </div>
              </>
            }
          >
            <Outlet />
          </Suspense>
        </main>

        {currentModule === 4 && <RightSidebarWalkthrough />}
        <div className="absolute top-0 right-0 bottom-0 z-50 bg-white group pt-20 hidden md:block transition-all duration-500 w-14 hover:w-56 overflow-hidden text-sm">
          {pathname.split("/")[3] === "builder" && <ResumeRightbar />}
        </div>
      </div>
      <div className="max-md:hidden">
        <ResumeFooter />
      </div>
    </>
  );
}

export default ResumeRoutes;
