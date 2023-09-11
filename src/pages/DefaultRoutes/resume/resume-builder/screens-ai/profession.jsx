import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import JobTitleInput from "../../../../../components/jobTitleInput";
import { useTemplateContext } from "../../../../../middleware/resume";

const Profession = ({ data }) => {
  const { onInputChange } = useTemplateContext();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!data.fullName) {
      navigate("/resume/ai/");
      return;
    }
  }, [navigate, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.profession) {
      setError("Please enter a profession");
      return;
    }
    navigate("/resume/ai/template-selector");
  };

  useEffect(() => {
    if (data.profession.length !== 0) {
    }
  });

  return (
    <>
      <h2 className="text-2xl lg:text-3xl font-extrabold text-center">
        It's Nice to Meet You
        <span className="text-secondary-500 capitalize">
          {" "}
          {data.fullName.split(" ")[1]}
        </span>
      </h2>

      <p className="font-bold text-center">
        <TypeAnimation
          cursor={false}
          sequence={["What best describes your profession?", 1000]}
        />
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex position relative items-center min-w-[320px] max-w-[722px]"
      >
        <JobTitleInput
          title={data.profession}
          handleInputChange={({ section, subsection, values }) =>
            onInputChange({
              section: section,
              subsection: subsection,
              values: values,
            })
          }
          section="basicInfo"
          subsection="profession"
        />
        <p className="absolute -bottom-5 text-sm text-error-500">{error}</p>
        <button
          onClick={handleSubmit}
          className="absolute -bottom-5 text-primary-600 text-sm text-center w-full"
        >
          Press Enter
        </button>
      </form>
    </>
  );
};

export default Profession;
