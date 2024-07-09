import { artisticTemplates, modernTemplates } from "./data";

function SelectedTemplates({ data }) {
  const [templateType, templateIndex] = data?.selectedTemplate.id.split("_");

  const [ExactTemplate] =
    templateType === "modern"
      ? modernTemplates.filter((_, index) => index === templateIndex - 1)
      : artisticTemplates.filter((_, index) => index === templateIndex - 1);

  return ExactTemplate?.element(data);
}

export default SelectedTemplates;
