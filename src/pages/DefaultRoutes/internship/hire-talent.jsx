import axios from "axios";
import { MdCheck } from "react-icons/md";
import Step1 from "../../../components/hireTalent/step1";
import Step2 from "../../../components/hireTalent/step2";
import Step3 from "../../../components/hireTalent/step3";
import Step4 from "../../../components/hireTalent/step4";
import Success from "../../../components/hireTalent/success";
import { useSessionStorage } from "../../../middleware/storage";
import { toast } from "react-toastify";

const HireTalent = () => {
  const [formData, setFormData] = useSessionStorage("konectin-profiler-b2b", {
    fullName: "",
    email: "",
    requiredRole: "",
    countryCode: "",
    phoneNumber: "",
    companyName: "",
    companyWebsite: "",
    supportEmail: "",
    companyAddress: "",
    country: "",
    companySize: "",
    hiringFrequency: "",
    internsNeeded: "",
    internshipType: "",
    mouConfirmed: false,
    currentStep: 1,
  });

  const url = import.meta.env.VITE_CLIENT_SERVER_URL;

  const nextStep = () => {
    if (formData.currentStep < 5) {
      setFormData((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
    window.scrollTo({ top: 80, behavior: "smooth" });
  };
  const prevStep = () => {
    if (formData.currentStep > 1) {
      setFormData((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
    window.scrollTo({ top: 80, behavior: "smooth" });
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mouConfirmed) {
      return toast.error("Please read and accept the MOU to proceed...");
    }

    const form = new FormData();
    const duplicateData = { ...formData };
    duplicateData.phoneNumber = `0${duplicateData.phoneNumber}`;

    delete duplicateData.currentStep;

    for (const key in duplicateData) {
      form.append(key, duplicateData[key]);
    }

    try {
      const response = await axios.post(`${url}/partner`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setFormData({
          fullName: "",
          email: "",
          requiredRole: "",
          countryCode: "",
          phoneNumber: "",
          companyName: "",
          companyWebsite: "",
          supportEmail: "",
          companyAddress: "",
          country: "",
          companySize: "",
          logo: null,
          companyDescription: "",
          hiringFrequency: "",
          preferedField: "",
          internshipType: "",
          mouContent: "",
          mouConfirmed: false,
          currentStep: 5,
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Partnership application already exists");
        } else if (error.response.status === 500) {
          toast.error("Internal server error");
        }
      } else {
        toast.error("Error submitting the form");
      }
    }
  };

  const renderStep = () => {
    switch (formData.currentStep) {
      case 1:
        return <Step1 handleChange={handleChange} values={formData} />;
      case 2:
        return <Step2 handleChange={handleChange} values={formData} />;
      case 3:
        return <Step3 handleChange={handleChange} values={formData} />;
      case 4:
        return <Step4 handleChange={handleChange} values={formData} />;
      case 5:
        return <Success handleChange={handleChange} values={formData} />;
      default:
        return <Step1 handleChange={handleChange} values={formData} />;
    }
  };

  return (
    <main className="flex bg-neutral-50 justify-center items-center">
      <div className="w-full max-w-2xl px-4">
        <h1 className="text-3xl font-semibold mb-2">
          Internship Partnership Form
        </h1>
        <h4 className="text-3xl font-semibold mb-6 max-sm:hidden">
          Connecting Employers with Emerging Talents
        </h4>
        <p className="text-gray-600 mb-4">
          Join us in shaping the future workforce by offering internship
          opportunities.
        </p>
        <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg">
          <div className="flex justify-center w-full">
            <div className="flex items-center w-11/12 sm:w-3/4 justify-center gap-4 mb-8">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex w-full items-center mb-2 gap-3">
                  <span
                    className={`h-6 w-6 flex justify-center items-center border-2 ${
                      formData.currentStep > num
                        ? "bg-primary-500 border-primary-500"
                        : formData.currentStep === num
                        ? "border-primary-500 text-primary-500"
                        : "border-neutral-500 text-neutral-500"
                    } rounded-full text-xs`}
                  >
                    {formData.currentStep > num ? (
                      <MdCheck color="white" />
                    ) : (
                      num
                    )}
                  </span>
                  <div className="flex-1 flex items-center">
                    <span
                      className={`block flex-1 h-0.5 ${
                        formData.currentStep >= num
                          ? "bg-primary-500"
                          : "bg-neutral-500"
                      } rounded-full`}
                    ></span>
                    <span
                      className={`h-2 w-2 ${
                        formData.currentStep >= num
                          ? "bg-primary-500"
                          : "bg-neutral-500"
                      }  rounded-full`}
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {renderStep()}
        </div>
        {formData.currentStep < 5 && (
          <div className="flex justify-between">
            {formData.currentStep > 1 && (
              <button
                onClick={prevStep}
                className="mt-10 ali p-3 px-10 bg-white text-primary-600 border border-primary-600 font-semibold rounded-lg"
              >
                Previous step
              </button>
            )}
            <button
              onClick={formData.currentStep === 4 ? handleSubmit : nextStep}
              className="mt-10 ali p-3 px-10 bg-primary-600 text-white font-semibold rounded-lg ml-auto"
            >
              {formData.currentStep === 4 ? "Submit" : "Next step"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default HireTalent;
