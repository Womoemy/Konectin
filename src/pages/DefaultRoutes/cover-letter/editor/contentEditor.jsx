/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from "react";
import { useCVContext } from "../../../../middleware/cv";
import { AzureKeyCredential, OpenAIClient } from "@azure/openai";

function ContentEditor() {
  const { CVData, setCVData } = useCVContext();

  const [editorValue, setEditorValue] = useState();
  const [dirty, setDirty] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const azureApiKey = import.meta.env.VITE_OPENAI_KEY;

  useEffect(() => {
    const interval = setInterval(() => {
      setCVData((prev) => ({ ...prev, content: editorValue }));
      setDirty(false);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [editorValue]);

  const generateCV = async () => {
    const messages = [
      {
        role: "user",
        content: `I am ${CVData.details.fullName}, who is applying for the position of ${CVData.details.jobPosition} at ${CVData.details.companyName}. The job description provided is as follows: ${CVData.description.jobDescription}. The professional bio of the user is: ${CVData.professionalBio}. The information provided about the company is: ${CVData.description.companyInfo}. Write a concise cover letter for me`,
      },
    ];

    const client = new OpenAIClient(
      "https://azure-openai-konectin.openai.azure.com/",
      new AzureKeyCredential(azureApiKey)
    );
    const deploymentId = "35Turbo";
    await client
      .getChatCompletions(deploymentId, messages, {
        temperature: 0.4,
        top_p: 0.5,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 800,
        stop: null,
      })
      .then(async (result) => {
        const content = result.choices[0].message.content
          .trimStart()
          .replaceAll("\n", "<br>");
        setEditorValue(content);
        setCVData((prev) => ({
          ...prev,
          content,
        }));
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Encountered Error. Try Again");
        console.log(err);
      });
  };

  useEffect(() => {
    if (CVData.content === "" || CVData.content === undefined) {
      console.log("Generating CV content....", CVData.content);
      generateCV();
    }
  }, [CVData]);

  return (
    <div className="flex-1">
      <Editor
        apiKey="muetp0kpit1cdofn0tsv7aym5shbxqnxzglv3000ilo9pc0m"
        onInit={(_, editor) => (editorRef.current = editor)}
        init={{
          menubar: false,
          resize: true,
          branding: false,
          plugins: "lists wordcount",
          elementpath: false,
          toolbar:
            "bold italic underline undo redo fontfamily fontsize alignleft aligncenter alignright alignjustify bullets",
          height: 600,
          content_style: "body { font-family: Comic Sans MS; font-size: 12px }",
        }}
        initialValue=""
        value={editorValue}
        onEditorChange={() => {
          setEditorValue(editorRef.current.getContent());
          editorRef.current.setDirty(true);
          setDirty(true);
          setErrorMessage("You have unsaved content!");
        }}
        onDirty={() => setDirty(true)}
      />
      {dirty && <p className="ml-auto w-max text-error-500">{errorMessage}</p>}
    </div>
  );
}

export default ContentEditor;
