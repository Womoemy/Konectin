function Languages({ data, handleInputChange, handleRemove }) {
  return (
    data.additionalInformation?.languages?.length >= 1 &&
    data.additionalInformation?.languages.map((entry, index) => (
      <div
        key={"languages" + index}
        className="bg-white border rounded-xl border-neutral-500 py-6 px-6 sm:py-8 sm:px-12"
      >
        <div className="font-bold mb-4 text-neutral-300 ">Select Languages</div>
        <div className="flex flex-col">
          <input
            className="input-container"
            type="text"
            name="language"
            id="language"
            value={entry.language}
            onChange={(e) =>
              handleInputChange(e.target.value, "languages", index, "language")
            }
            placeholder="Search"
          />
        </div>
        <div
          onClick={() => handleRemove("languages", index)}
          className="text-white bg-red-500 py-2 px-6 rounded w-fit text-sm cursor-pointer"
        >
          Remove
        </div>
      </div>
    ))
  );
}

export default Languages;
