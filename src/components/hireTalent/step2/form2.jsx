import { useEffect, useState } from "react";
import { GetCountries } from "react-country-state-city/dist/cjs";
import { MdArrowDropDown } from "react-icons/md";

const sizes = ["1-10", "11-50", "51-100", "100+"];

const Form2 = ({ handleChange, values }) => {
  const [showData, setShowData] = useState({
    location: false,
    size: false,
  });
  const [country, setCountry] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountry(result);
    });
  }, []);

  return (
    <div>
      <input
        type="text"
        className="input-container"
        required
        placeholder="Company’s Name*"
        value={values.companyName}
        onChange={(e) => handleChange("companyName", e.target.value)}
      />

      <input
        type="url"
        className="input-container"
        onChange={(e) => handleChange("companyWebsite", e.target.value)}
        placeholder="Company’s Website"
        value={values.companyWebsite}
      />

      <input
        type="text"
        className="input-container"
        placeholder="Company’s Support Email*"
        onChange={(e) => handleChange("supportEmail", e.target.value)}
        value={values.supportEmail}
        required
      />

      <input
        type="text"
        className="input-container"
        placeholder="Company Address"
        onChange={(e) => handleChange("companyAddress", e.target.value)}
        value={values.companyAddress}
      />

      <div className="flex flex-col gap-2 min-w-[160px] relative">
        <div
          onClick={() =>
            setShowData((prev) => ({ ...prev, location: !prev.location }))
          }
          className="flex items-center relative cursor-pointer"
        >
          <input
            className="input-container"
            value={values.country}
            name="location"
            id="location"
            placeholder="Country Located*"
            readOnly
          />
          <MdArrowDropDown
            className={`${
              showData.location ? "rotate-180" : "rotate-0"
            } absolute right-2 top-3 duration-300 text-neutral-300`}
            size="1.5rem"
          />
        </div>
        {showData.location && (
          <div className="bg-neutral-100 w-full max-h-48 z-10 overflow-y-auto text-white py-1 rounded flex flex-col -translate-y-6">
            {country.map((location) => (
              <div
                key={location.name}
                onClick={() => {
                  handleChange("country", location.name);
                  setShowData((prev) => ({
                    ...prev,
                    location: !prev.location,
                  }));
                }}
                className={`${
                  values?.country === location.name
                    ? "bg-primary-500"
                    : "hover:bg-neutral-200"
                } flex gap-2 items-center py-3 px-4 cursor-pointer`}
              >
                <img
                  alt="img"
                  src={location.image}
                  className={`
                  } w-4 h-4 `}
                />
                <div className="truncate">{location.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 min-w-[160px] relative">
        <div
          onClick={() => setShowData((prev) => ({ ...prev, size: !prev.size }))}
          className="flex items-center relative cursor-pointer"
        >
          <input
            className="input-container"
            value={values.companySize}
            name="size"
            id="size"
            placeholder="Company’s Size*"
            readOnly
          />
          <MdArrowDropDown
            className={`${
              showData.size ? "rotate-180" : "rotate-0"
            } absolute right-2 top-3 duration-300 text-neutral-300`}
            size="1.5rem"
          />
        </div>
        {showData.size && (
          <div className="bg-neutral-100 w-full max-h-48 z-10 overflow-y-auto text-white py-1 rounded flex flex-col -translate-y-6">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => {
                  handleChange("companySize", size);
                  setShowData((prev) => ({ ...prev, size: !prev.size }));
                }}
                className={`${
                  values?.companySize === size
                    ? "bg-primary-500"
                    : "hover:bg-neutral-200"
                } flex gap-2 items-center py-3 px-4 cursor-pointer`}
              >
                <span
                  className={`${
                    values?.companySize === size
                      ? "bg-secondary-600 border-transparent"
                      : "border-white"
                  } rounded-full block w-4 h-4 border`}
                />
                <div className="truncate">{size}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Form2;
