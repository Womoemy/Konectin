import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

const hireNeeds = ["Always hiring", "Hiring frequently", "Hire few months"];
const roles = ["Less than 5", "5 - 10", "10 - 20", "More than 20"];
const types = ["Paid", "Unpaid", "Both"];

function Form3({ handleChange, values }) {
  const [showData, setShowData] = useState({
    hireNeed: false,
    role: false,
    type: false,
  });
  return (
    <div>
      <div className="flex flex-col gap-2 min-w-[160px] relative">
        <div
          onClick={() =>
            setShowData((prev) => ({ ...prev, hireNeed: !prev.hireNeed }))
          }
          className="flex items-center relative cursor-pointer"
        >
          <input
            className="input-container"
            value={values.hiringFrequency}
            name="hireNeed"
            id="hireNeed"
            placeholder="Industry Hiring needs*"
            readOnly
          />
          <MdArrowDropDown
            className={`${
              showData.hireNeed ? "rotate-180" : "rotate-0"
            } absolute right-2 top-3 duration-300 text-neutral-300`}
            size="1.5rem"
          />
        </div>
        {showData.hireNeed && (
          <div className="bg-neutral-100 w-full max-h-48 z-10 overflow-y-auto text-white py-1 rounded flex flex-col -translate-y-6">
            {hireNeeds.map((hireNeed) => (
              <div
                key={hireNeed}
                onClick={() => {
                  handleChange("hiringFrequency", hireNeed);
                  setShowData((prev) => ({
                    ...prev,
                    hireNeed: !prev.hireNeed,
                  }));
                }}
                className={`${
                  values?.hiringFrequency === hireNeed
                    ? "bg-primary-500"
                    : "hover:bg-neutral-200"
                } flex gap-2 items-center py-3 px-4 cursor-pointer`}
              >
                <span
                  className={`${
                    values?.hiringFrequency === hireNeed
                      ? "bg-secondary-600 border-transparent"
                      : "border-white"
                  } rounded-full block w-4 h-4 border`}
                />
                <div className="truncate">{hireNeed}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 min-w-[160px] relative">
        <div
          onClick={() => setShowData((prev) => ({ ...prev, role: !prev.role }))}
          className="flex items-center relative cursor-pointer"
        >
          <input
            className="input-container"
            value={values.internsNeeded}
            name="internsNeeded"
            id="internsNeeded"
            placeholder="How many interns are you looking to hire?*"
            readOnly
          />
          <MdArrowDropDown
            className={`${
              showData.role ? "rotate-180" : "rotate-0"
            } absolute right-2 top-3 duration-300 text-neutral-300`}
            size="1.5rem"
          />
        </div>
        {showData.role && (
          <div className="bg-neutral-100 w-full max-h-48 z-10 overflow-y-auto text-white py-1 rounded flex flex-col -translate-y-6">
            {roles.map((role) => (
              <div
                key={role}
                onClick={() => {
                  handleChange("internsNeeded", role);
                  setShowData((prev) => ({ ...prev, role: !prev.role }));
                }}
                className={`${
                  values?.internsNeeded === role
                    ? "bg-primary-500"
                    : "hover:bg-neutral-200"
                } flex gap-2 items-center py-3 px-4 cursor-pointer`}
              >
                <span
                  className={`${
                    values?.internsNeeded === role
                      ? "bg-secondary-600 border-transparent"
                      : "border-white"
                  } rounded-full block w-4 h-4 border`}
                />
                <div className="truncate">{role}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 min-w-[160px] relative">
        <div
          onClick={() => setShowData((prev) => ({ ...prev, type: !prev.type }))}
          className="flex items-center relative cursor-pointer"
        >
          <input
            className="input-container"
            value={values.internshipType}
            name="type"
            id="type"
            placeholder="Internship Type*"
            readOnly
          />
          <MdArrowDropDown
            className={`${
              showData.type ? "rotate-180" : "rotate-0"
            } absolute right-2 top-3 duration-300 text-neutral-300`}
            size="1.5rem"
          />
        </div>
        {showData.type && (
          <div className="bg-neutral-100 w-full max-h-48 z-10 overflow-y-auto text-white py-1 rounded flex flex-col -translate-y-6">
            {types.map((type) => (
              <div
                key={type}
                onClick={() => {
                  handleChange("internshipType", type);
                  setShowData((prev) => ({ ...prev, type: !prev.type }));
                }}
                className={`${
                  values?.internshipType === type
                    ? "bg-primary-500"
                    : "hover:bg-neutral-200"
                } flex gap-2 items-center py-3 px-4 cursor-pointer`}
              >
                <span
                  className={`${
                    values?.internshipType === type
                      ? "bg-secondary-600 border-transparent"
                      : "border-white"
                  } rounded-full block w-4 h-4 border`}
                />
                <div className="truncate">{type}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Form3;
