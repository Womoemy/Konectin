import axios from "axios";
import { useState } from "react";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiDownload } from "react-icons/hi";
import { FaCircleNotch } from "react-icons/fa6";
import SelectedTemplates from "../../resume-templates";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useAuthContext } from "../../../../../../middleware/auth";
import { toast } from "react-toastify";

const Preview = ({ data }) => {
  const { user } = useAuthContext();

  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showFeedBackModal, setShowFeedBackModal] = useState(false);

  const handleDownload = async () => {
    const doc = document.getElementById("template");
    setIsDownloading(true);
    const url = import.meta.env.VITE_CLIENT_SERVER_URL;

    try {
      let res = await axios.post(
        `${url}/v2/createPdf?resumeId=${data._id}`,
        {
          resumeHtml: `
                <!DOCTYPE html>
                  <html lang="en">
                    <head>
                      <meta charset="UTF-8" />
                      <link rel="icon" type="image/png" href="/konectin.png" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      <title>Konectin | Home</title>
                      <meta name="description"
                        content="Get matched easily with recruiters who see value in your experience amidst other great Career oppurtunities." />
                    </head>

                    <body>
                      ${doc.innerHTML}
                    </body>
                  </html>
        `,
        },
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      var blob = new Blob([res.data], { type: "application/pdf" });
      saveAs(
        blob,
        `${data.basicInfo.lastName} resume (Konectin Generated).pdf`
      );

      // if successful download then check userflow
      setIsDownloaded(true);
      setIsDownloading(false);

      setTimeout(() => {
        setIsDownloaded(false);
        setShowFeedBackModal(true);
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsDownloaded(false);
      setIsDownloading(false);
      // setMessage("error");
      toast.error("Couldn't download");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col mb-4 lg:flex-row items-start justify-between self-center gap-10">
        <div className="flex flex-col justify-center w-full">
          <Link
            to="/services/resume/builder/add-information/awards"
            className="flex items-center gap-2 font-medium text-sm"
          >
            <IoArrowBackCircleOutline size="1.5rem" />
            <span>Go Back</span>
          </Link>

          {(isDownloading || isDownloaded || showFeedBackModal) && (
            <div className="fixed w-full h-screen left-0 top-0 z-[101] flex items-center justify-center">
              <div
                onClick={() =>
                  showFeedBackModal ? setShowFeedBackModal(false) : null
                }
                className="absolute w-full h-full left-0 top-0 bg-black bg-opacity-60"
              />

              {showFeedBackModal && (
                <FeedbackModal
                  closeModal={() => setShowFeedBackModal(false)}
                  user={user}
                />
              )}

              {(isDownloaded || isDownloading) && (
                <div className="relative z-[101] bg-white rounded-md max-w-[90%] p-4 sm:py-6 sm:px-12 flex flex-col items-center text-center text-sm gap-2 sm:gap-4">
                  {isDownloading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="35"
                      viewBox="0 0 36 35"
                      fill="none"
                    >
                      <path
                        d="M17.5 3C25.7843 3 32.5 9.71573 32.5 18C32.5 26.2843 25.7843 33 17.5 33C9.21573 33 2.5 26.2843 2.5 18C2.5 9.71573 9.21573 3 17.5 3Z"
                        stroke="#3DF110"
                        strokeOpacity="0.3"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M17.5 3C25.7843 3 32.5 9.71573 32.5 18"
                        stroke="#30C10B"
                        strokeWidth="6"
                        strokeLinecap="round"
                        className="animate-spin origin-center"
                      />
                    </svg>
                  ) : isDownloaded ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      className="sm:scale-150"
                      fill="none"
                    >
                      <path
                        d="M15.5 1.875C18.981 1.875 22.3194 3.25781 24.7808 5.71922C27.2422 8.18064 28.625 11.519 28.625 15C28.625 18.481 27.2422 21.8194 24.7808 24.2808C22.3194 26.7422 18.981 28.125 15.5 28.125C12.019 28.125 8.68064 26.7422 6.21922 24.2808C3.75781 21.8194 2.375 18.481 2.375 15C2.375 11.519 3.75781 8.18064 6.21922 5.71922C8.68064 3.25781 12.019 1.875 15.5 1.875ZM13.865 17.5894L10.9494 14.6719C10.8449 14.5674 10.7208 14.4844 10.5842 14.4279C10.4476 14.3713 10.3013 14.3422 10.1534 14.3422C10.0056 14.3422 9.85925 14.3713 9.72268 14.4279C9.58611 14.4844 9.46202 14.5674 9.3575 14.6719C9.1464 14.883 9.02781 15.1693 9.02781 15.4678C9.02781 15.7663 9.1464 16.0527 9.3575 16.2638L13.07 19.9762C13.1742 20.0813 13.2982 20.1647 13.4348 20.2216C13.5714 20.2785 13.718 20.3078 13.8659 20.3078C14.0139 20.3078 14.1604 20.2785 14.297 20.2216C14.4337 20.1647 14.5576 20.0813 14.6619 19.9762L22.3494 12.2869C22.4553 12.1828 22.5396 12.0588 22.5973 11.9219C22.6551 11.7851 22.6851 11.6382 22.6858 11.4897C22.6865 11.3412 22.6578 11.194 22.6013 11.0567C22.5449 10.9193 22.4618 10.7945 22.3568 10.6895C22.2519 10.5844 22.1271 10.5011 21.9899 10.4445C21.8526 10.3879 21.7054 10.359 21.5569 10.3595C21.4084 10.36 21.2615 10.3899 21.1246 10.4475C20.9877 10.5051 20.8636 10.5892 20.7594 10.695L13.865 17.5894Z"
                        fill="#30C10B"
                      />
                    </svg>
                  ) : null}
                  {isDownloading
                    ? "Please wait while your file is being downloaded."
                    : isDownloaded
                    ? "File download complete. Please check your downloads."
                    : null}
                </div>
              )}
            </div>
          )}

          <h2 className="max-w-[30ch] text-3xl leading-tight font-semibold md:leading-snug mt-16">
            Preview Resume
          </h2>
          <p className="max-w-[60ch] font-bold text-neutral-300 text-sm tracking-[-0.01rem] mt-3 mb-5">
            You've made it to the end! Now, take a moment to review your
            complete resume. Check for any mistakes and make sure everything is
            just how you want it. This is your last chance to make changes
            before your resume is ready to impress employers.
          </p>

          <div className="lg:hidden w-full max-w-[90vw] flex items-center justify-center">
            <div className="w-1/2 h-[400px] sm:h-[550px] flex items-center justify-center">
              <div className="scale-[40%] md:scale-[50%]  mt-10">
                <SelectedTemplates data={data} />
              </div>
            </div>
          </div>

          <div
            onClick={handleDownload}
            className="rounded-md text-sm cursor-pointer text-neutral-900 pt-3 pb-3.5 px-4 bg-primary-500 w-fit flex gap-1 items-center mt-12"
          >
            <HiDownload size="1rem" />
            <span>Download Resume</span>
          </div>
        </div>

        <div className="max-lg:hidden w-1/2">
          <div className="h-[360px] sm:h-[300px] md:h-[500px] lg:h-[580px] lg:w-[500px] flex items-center justify-center">
            <div className="md:scale-[42%] lg:scale-[50%]">
              <SelectedTemplates data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

const FeedbackModal = ({ closeModal, user }) => {
  const [rating, setRating] = useState({
    rate: "",
    satisfied: "",
    suggestion: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);

    axios
      .post()
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          closeModal();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        toast.error("Unable to give feedback, try again later");
      });
  };

  return (
    <div className="w-[92%] mx-auto max-w-[450px] bg-black py-6 sm:py-8 md:py-12 px-4 sm:px-8 absolute rounded-lg text-white sm:bottom-4 sm:right-4">
      <div className="max-h-[85dvh] overflow-y-auto">
        <div
          onClick={() => (isSubmitting ? null : closeModal())}
          className="cursor-pointer absolute top-3 sm:top-6 right-3 sm:right-6"
        >
          <MdClose />
        </div>
        <div className="relative space-y-4 text-sm">
          {isSubmitted ? (
            <>
              <div className="bg-green-700 rounded-full flex items-center justify-center w-16 h-16 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="91"
                  height="90"
                  viewBox="0 0 91 90"
                  fill="none"
                  className="w-8"
                >
                  <path
                    d="M75.4997 22.5L34.2498 63.75L15.4998 45"
                    stroke="#F5F5F5"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="max-sm:text-center">
                Thank you for your feedback! Your submission has been
                successfully received. We appreciate your input and will use it
                to improve our services.
                <br />
                <br />
                Thanks for being a part of the Konectin community 😉
              </p>
            </>
          ) : (
            <>
              <h4 className="text-secondary-500 font-semibold text-xl">
                Your Feedback is important to us
              </h4>
              <p>
                Hello {user?.fullname.split(" ")[1]}! We hope you found our
                resume builder helpful! Please, rate your experience below.. 😉
              </p>

              <div className="space-y-2">
                <span>
                  1. Rate your experience using our resume builder (1 - 10)
                </span>
                <div className="flex flex-wrap gap-2 md:gap-3 sm:pl-4">
                  {new Array(10).fill("").map((_, id) => (
                    <div
                      key={id}
                      className={`px-2 py-1 border duration-500 cursor-pointer rounded ${
                        rating.rate === id + 1
                          ? "bg-primary-500 text-white border-primary-500"
                          : "bg-whites-200 text-black"
                      }`}
                      onClick={() =>
                        isSubmitting
                          ? null
                          : setRating((rates) => ({ ...rates, rate: id + 1 }))
                      }
                    >
                      {id + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span>2. Are you satisfied with your final resume?</span>
                <div className="flex flex-wrap gap-2 md:gap-3 sm:pl-4">
                  <div
                    className={`px-2 py-1 border duration-500 cursor-pointer rounded ${
                      rating.satisfied === "Yes"
                        ? "bg-primary-500 text-white border-primary-500"
                        : "bg-whites-200 text-black"
                    }`}
                    onClick={() =>
                      isSubmitting
                        ? null
                        : setRating((rates) => ({ ...rates, satisfied: "Yes" }))
                    }
                  >
                    Yes
                  </div>
                  <div
                    className={`px-2 py-1 border duration-500 cursor-pointer rounded ${
                      rating.satisfied === "No"
                        ? "bg-primary-500 text-white border-primary-500"
                        : "bg-whites-200 text-black"
                    }`}
                    onClick={() =>
                      isSubmitting
                        ? null
                        : setRating((rates) => ({ ...rates, satisfied: "No" }))
                    }
                  >
                    No
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <span>3. Any suggestions for improvements?</span>
                <textarea
                  className="sm:h-[70px] bg-transparent text-white border outline-none px-4 py-3 rounded w-full text-xs"
                  placeholder="Suggestions"
                  value={rating.suggestion}
                  disabled={isSubmitting}
                  onChange={(e) =>
                    setRating((rates) => ({
                      ...rates,
                      suggestion: e.target.value,
                    }))
                  }
                />
              </div>
              <div
                onClick={() => (isSubmitting ? null : handleSubmit())}
                className="py-2 px-8 bg-primary-500 text-white text-xs w-fit rounded cursor-pointer flex gap-2 items-center"
              >
                {isSubmitting && <FaCircleNotch className="animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit"}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
