import { useEffect } from "react";

const ResumeModal = ({ onClose, children }) => {
  useEffect(() => {
    // Add 'modal-open' class to the body when the modal is open
    document.body.classList.add("modal-open");

    // Remove 'modal-open' class from the body when the modal is closed
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center">
      {/* Dark transparent background overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black opacity-50 cursor-pointer"
      ></div>

      {/* ResumeModal content */}
      <div className="relative z-50 w-[95%] mx-auto lg:max-w-3xl h-[90vh] min-h-[300px] max-h-[450px] bg-white max-xxs:p-4 p-6 rounded shadow-md max-md:overflow-y-auto">
        {/* Close icon button */}
        <button
          className="absolute top-2 right-2 text-white bg-secondary-500 rounded-full p-1  "
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* ResumeModal content passed as children */}
        {children}
      </div>
    </div>
  );
};

export default ResumeModal;
