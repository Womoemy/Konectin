import { useEffect, useState } from "react";
import { GetCountries } from "react-country-state-city/dist/cjs";
import { MdArrowDropDown } from "react-icons/md";

const Form1 = ({ handleChange, values }) => {
  const [countriesList, setCountriesList] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  return (
    <div>
      <input
        type="email"
        className="input-container"
        required
        placeholder="Email Address*"
        value={values?.email ? values.email : ""}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        type="text"
        className="input-container"
        required
        placeholder="Full Name*"
        value={values?.fullName ? values.fullName : ""}
        onChange={(e) => handleChange("fullName", e.target.value)}
      />

      <input
        type="text"
        className="input-container"
        placeholder="Role*"
        value={values?.requiredRole ? values.requiredRole : ""}
        required
        onChange={(e) => handleChange("requiredRole", e.target.value)}
      />

      <div className="flex max-xxs:flex-col gap-3">
        <div className="flex flex-col gap-2 relative">
          <div
            onClick={() => setShowList((prev) => !prev)}
            className="flex items-center relative cursor-pointer"
          >
            <input
              className="input-container"
              value={values?.countryCode ? values.countryCode : ""}
              name="countryCode"
              id="countryCode"
              placeholder="Country Code*"
              readOnly
            />
            <MdArrowDropDown
              className={`${
                showList ? "rotate-180" : "rotate-0"
              } absolute right-2 top-3 duration-300 text-neutral-300`}
              size="1.5rem"
            />
          </div>
          {showList && (
            <div className="absolute top-full -translate-y-[20px] bg-neutral-100 w-full max-h-48 z-10 overflow-y-auto text-white py-1 rounded flex flex-col">
              {countriesList.map((location) => (
                <div
                  key={location.name}
                  onClick={() => {
                    handleChange("countryCode", `+ ${location.phone_code}`);
                    handleChange("country", location.name);
                    setShowList((prev) => !prev);
                  }}
                  className={`${
                    values?.countryCode === location.phone_code
                      ? "bg-primary-500"
                      : "hover:bg-neutral-200"
                  } py-3 px-4 cursor-pointer`}
                >
                  + {location.phone_code}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="tel"
          className="input-container"
          placeholder="Phone Number*"
          min={10}
          maxLength={16}
          value={values?.phoneNumber ? values.phoneNumber : ""}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            handleChange("phoneNumber", digits);
          }}
          required
        />
      </div>
    </div>
  );
};

export default Form1;
