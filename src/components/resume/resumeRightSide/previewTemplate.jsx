import { MdClose } from "react-icons/md";
import { useTemplateContext } from "../../../middleware/resume";
import SelectedTemplates from "../../../pages/DefaultRoutes/resume/resume-builder/resume-templates";

function PreviewTemplate({ setPreview }) {
  const { templateData } = useTemplateContext();

  return (
    <div className="fixed w-full h-screen left-0 top-0 z-50 flex items-center justify-center">
      <div
        onClick={() => setPreview(false)}
        className="fixed w-full h-full left-0 top-0 z-50 bg-black bg-opacity-60"
      />
      <div
        onClick={() => setPreview(false)}
        className="cursor-pointer bg-red-500 absolute top-6 right-6 z-[102] flex items-center justify-center text-white rounded-full w-6 h-6"
      >
        <MdClose />
      </div>
      <div className="w-1/2 relative z-[101]">
        <div className="flex items-center justify-center">
          <div className="scale-[30%] xxs:scale-[40%] md:scale-[50%] lg:scale-[55%] mt-10">
            <SelectedTemplates data={templateData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewTemplate;
