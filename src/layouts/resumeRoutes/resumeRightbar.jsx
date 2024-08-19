import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Tips from "../../components/resume/resumeRightSide/tips";
import { droplet, eye, page, profileadd, tips, tips2 } from "../../assets";
import StyleResume from "../../components/resume/resumeRightSide/styleResume";
import ChangeTemplate from "../../components/resume/resumeRightSide/changeTemplate";
import EditResumePhoto from "../../components/resume/resumeRightSide/editResumePhoto";
import PreviewTemplate from "../../components/resume/resumeRightSide/previewTemplate";

function ResumeRightbar({ isMobile }) {
  const [hoverIn, setHoverIn] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [preview, setPreview] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const options = [
    { route: "", icon: page, label: "Change Template", option: true },
    { route: "", icon: profileadd, label: "Edit Resume Photo", option: true },
    // { route: "", icon: menu, label: "Rearrange Sections" },
    {
      route: "",
      icon: droplet,
      label: "Style Resume",
      option: true,
    },
  ];

  const handleMouseLeave = () => {
    setHoverIn(false);
    setActiveItem(null);
  };

  return (
    <>
      <div onMouseLeave={handleMouseLeave}>
        <ul className="flex flex-col gap-4">
          {!isMobile && (
            <>
              <li className="relative cursor-pointer mb-4 py-1 px-2">
                <div className="flex items-center">
                  <div
                    onClick={() => setShowTips(!showTips)}
                    className="relative w-[32px] h-[32px] group/tips bg-secondary-200 p-2 rounded-full hover:bg-secondary-600"
                  >
                    <img
                      src={tips}
                      alt={"tips"}
                      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[24px] group-hover/tips:opacity-0"
                    />
                    <img
                      src={tips2}
                      alt={"tips"}
                      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[24px] opacity-0 group-hover/tips:opacity-100"
                    />
                    <div className="absolute z-50 -top-2 text-[8px] w-3.5 h-3.5 flex items-center text-center justify-center right-0 bg-secondary-500 text-white rounded-full">
                      1
                    </div>
                    {showTips && <Tips />}
                  </div>
                </div>
              </li>
              <li>
                <div
                  className="relative cursor-pointer py-3 px-4 hover:border-l-[3px] border-primary-600 hover:bg-gradient-to-l from-transparent to-primary-200 "
                  onClick={() => setPreview(true)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={eye}
                        alt="Preview Resume"
                        className="min-w-[24px]"
                      />
                      <span className="ml-4  whitespace-nowrap text-sm hover:text-primary-600 font-semibold ">
                        Preview Resume
                      </span>
                    </div>
                  </div>
                </div>
                {preview && <PreviewTemplate setPreview={setPreview} />}
              </li>
            </>
          )}
          {options.map((item) => (
            <RightBarOption
              key={item.label}
              item={item}
              hoverIn={!isMobile ? hoverIn : true}
              setHoverIn={!isMobile ? setHoverIn : () => {}}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default ResumeRightbar;

const RightBarOption = ({
  item,
  hoverIn,
  setHoverIn,
  activeItem,
  setActiveItem,
}) => {
  const handleClick = (option) => {
    if (activeItem === option) {
      setHoverIn(false);
      setActiveItem(null);
    } else {
      setActiveItem(option);
      setHoverIn(true);
    }
  };

  return (
    <div>
      <li
        className="relative cursor-pointer py-3 px-4 hover:border-l-[3px] border-primary-600 hover:bg-gradient-to-l from-transparent to-primary-200"
        key={item.route}
        onClick={() => handleClick(item.label)}
      >
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center">
            <img src={item.icon} alt={item.label} className="min-w-[24px]" />
            <span className="ml-4 whitespace-nowrap hover:text-primary-600 font-semibold">
              {item.label}
            </span>
          </div>
          {item.option ? (
            <div className="">
              {activeItem === item.label && hoverIn ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>
          ) : null}
        </div>
      </li>
      {hoverIn &&
        ((item.label === "Change Template" &&
          activeItem === "Change Template" && <ChangeTemplate />) ||
          (item.label === "Edit Resume Photo" &&
            activeItem === "Edit Resume Photo" && <EditResumePhoto />) ||
          (item.label === "Style Resume" && activeItem === "Style Resume" && (
            <StyleResume />
          )))}
    </div>
  );
};
