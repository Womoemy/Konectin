import Form1 from "./step1/form1";
import Form2 from "./step2/form2";
import Form3 from "./step3/form3";

const Step4 = ({ handleChange, values }) => {
  const handleCheckboxChange = () => {
    handleChange("mouConfirmed", !values.mouConfirmed);
  };

  return (
    <div>
      <div>
        <div className="text-2xl">Review and Confirm</div>
        <div className="mb-8 text-neutral-300">
          Take a moment to review your information. Once confirmed, submit your
          internship request, and we'll be in touch shortly
        </div>
        <div>
          <div className="mb-4">
            <Form1 handleChange={handleChange} values={values} />
            <Form2 handleChange={handleChange} values={values} />
            <Form3 handleChange={handleChange} values={values} />
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={values.mouConfirmed}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span className="ml-2 text-gray-700 text-xs">
                By ticking this box, you confirm that you have read and
                acknowledged the Memorandum of Understanding (MOU).
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
