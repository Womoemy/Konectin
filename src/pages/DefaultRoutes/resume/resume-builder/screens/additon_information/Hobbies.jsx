function Hobbies({ data, handleInputChange, handleRemove }) {
  return (
    data.additionalInformation?.hobbies?.length >= 1 &&
    data.additionalInformation?.hobbies.map((entry, index) => (
      <div
        key={"hobbies" + index}
        className="bg-white border rounded-xl border-neutral-500 py-6 px-6 sm:py-8 sm:px-12"
      >
        <div className="font-bold mb-4 text-neutral-300 ">Select Hobbies</div>
        <div className="flex flex-col">
          <input
            className="input-container"
            type="text"
            name="hobby"
            id="hobby"
            value={entry.hobby}
            onChange={(e) =>
              handleInputChange(e.target.value, "hobbies", index, "hobby")
            }
            placeholder="Search"
          />
        </div>
        <div
          onClick={() => handleRemove("hobbies", index)}
          className="text-white bg-red-500 py-2 px-6 rounded w-fit text-sm cursor-pointer"
        >
          Remove
        </div>
      </div>
    ))
  );
}

export default Hobbies;
