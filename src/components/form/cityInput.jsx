import { useRef, useState } from "react";
import { verifyInput } from "../../pages/DefaultRoutes/resume/resume-builder/screens/verification";
import { City } from "country-state-city";

function CityInput({ countryId, stateId, handleChange, city }) {
  const [cityList, setCityList] = useState(
    stateId
      ? City.getCitiesOfState(countryId, stateId)
      : City.getCitiesOfCountry(countryId)
  );
  const [showCity, setShowCity] = useState(false);
  const errorMessage = useRef(null);

  const handleCityInput = (input) => {
    setShowCity(true);

    const filtered = (
      stateId
        ? City.getCitiesOfState(countryId, stateId)
        : City.getCitiesOfCountry(countryId)
    ).filter((city) => city.name.toLowerCase().startsWith(input.toLowerCase()));

    if (filtered.length >= 0) {
      setCityList(filtered);
    }

    handleChange("city", input);

    verifyInput(input, errorMessage.current, "city");
  };

  const handleSelectChange = (name) => {
    handleChange("city", name);
    verifyInput(name, errorMessage.current, "city");
  };

  return (
    <div id="city" className="input-container relative z-10">
      <div
        onClick={() => setShowCity((prev) => !prev)}
        className="cursor-pointer flex flex-col gap-2 w-full"
      >
        <div className="flex items-center">
          <input
            className="bg-transparent outline-none border-none w-full"
            id="cities"
            name="city"
            value={city ? city : ""}
            placeholder="Enter City"
            onChange={(e) => handleCityInput(e.target.value)}
            onInput={(e) => handleCityInput(e.target.value)}
            onBlur={() => setTimeout(() => setShowCity(false), 300)}
          />
        </div>
        <label
          id="cityError"
          htmlFor="cities"
          className="absolute mt-8 text-error-500 hidden"
          ref={errorMessage}
        ></label>
      </div>
      {showCity && (
        <div className="absolute flex flex-col bg-primary-600 text-white left-0 border overflow-y-auto max-h-[30vh] h-fit top-full w-full">
          {cityList.map((item, index) => (
            <div
              className="w-full py-3 px-6 cursor-pointer hover:bg-primary-400"
              key={index}
              onClick={() => {
                setShowCity((prev) => !prev);
                handleSelectChange(item.name);
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

export default CityInput;
