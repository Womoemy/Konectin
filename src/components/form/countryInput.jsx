import { Country } from "country-state-city";
import { useState, useRef } from "react";
import { verifyInput } from "../../pages/DefaultRoutes/resume/resume-builder/screens/verification";

function CountryInput({ setCode, handleChange, country, setCountryId }) {
  const [countriesList, setCountriesList] = useState(Country.getAllCountries());
  const [showCountry, setShowCountry] = useState(false);
  const errorMessage = useRef(null);

  const handleCountryInput = (input) => {
    if (countriesList.length === 0) {
      setCountriesList(Country.getAllCountries());
    }

    setShowCountry(true);
    handleChange("country", input);
    verifyInput(input, errorMessage.current, "country");
  };

  const handleSelectChange = (name) => {
    handleChange("country", name);
    verifyInput(name, errorMessage.current, "country");
  };

  return (
    <div id="country" className="input-container relative">
      <div
        onClick={() => setShowCountry((prev) => !prev)}
        className="cursor-pointer flex flex-col gap-2 w-full"
      >
        <div className="flex items-center">
          <input
            className="bg-transparent outline-none border-none w-full h-full"
            value={country ? country : ""}
            id="countries"
            autoComplete="country"
            name="country"
            placeholder="Country"
            onChange={(e) => handleCountryInput(e.target.value)}
            onInput={(e) => handleCountryInput(e.target.value)}
            onBlur={() => setTimeout(() => setShowCountry(false), 300)}
            required
          />
        </div>
        <label
          htmlFor="countries"
          id="countryError"
          className="absolute mt-8 text-error-500 hidden"
          ref={errorMessage}
        >
          Country required
        </label>
      </div>
      {showCountry && countriesList.length >= 1 && (
        <div className="absolute z-30 flex flex-col bg-primary-600 text-white left-0 border overflow-y-auto max-h-[30vh] h-fit top-full w-full duration-300">
          {countriesList
            .filter((countries) =>
              countries.name.toLowerCase().startsWith(country.toLowerCase())
            )
            .map((item, index) => (
              <div
                className="w-full py-3 px-6 cursor-pointer hover:bg-primary-400"
                key={index}
                onClick={() => {
                  handleSelectChange(item.name);
                  setCountryId(item.isoCode);
                  setCode && setCode(`${item.phonecode}`);
                  setShowCountry((prev) => !prev);
                }}
              >
                {item.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default CountryInput;
