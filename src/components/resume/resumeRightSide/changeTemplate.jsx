import { useTemplateContext } from "../../../middleware/resume";
import {
  artisticTemplates,
  modernTemplates,
} from "../../../pages/DefaultRoutes/resume/resume-builder/resume-templates/data";

function ChangeTemplate() {
  const { templateData, setTemplateData } = useTemplateContext();

  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[200px] snap-y">
      <div className="flex flex-col gap-4 items-stretch">
        {modernTemplates.concat(artisticTemplates).map((template) => (
          <div
            key={template.name}
            className="h-[270px] flex items-center justify-center bg-neutral-600 group/change-container relative cursor-pointer"
          >
            <div
              className={`bg-neutral-100 bg-opacity-70 absolute w-full h-full z-10 hidden group-hover/change-container:flex justify-center items-center ${
                templateData.selectedTemplate.id === template.id
                  ? "!flex"
                  : "hidden"
              }`}
            >
              <div
                className={`${
                  templateData.selectedTemplate.id === template.id
                    ? "bg-primary-600"
                    : "bg-secondary-600"
                } text-xs px-3 py-2 text-white rounded`}
                onClick={() =>
                  setTemplateData((prev) => ({
                    ...prev,
                    selectedTemplate: {
                      name: template.name,
                      id: template.id,
                      themeColor: template.themeColors[0],
                      themeSet: template.themeColors,
                    },
                  }))
                }
              >
                {templateData.selectedTemplate.id === template.id
                  ? "Selected"
                  : "Select Template"}
              </div>
            </div>
            <div className="scale-[25%]">
              {template.element ? template.element(templateData) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChangeTemplate;
