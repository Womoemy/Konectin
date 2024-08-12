function Projects({ data, handleInputChange, handleRemove }) {
  return (
    data.additionalInformation?.projects?.length >= 1 &&
    data.additionalInformation?.projects.map((entry, index) => (
      <div
        key={"projects" + index}
        className="bg-white border rounded-xl border-neutral-500 py-6 px-6 sm:py-8 sm:px-12"
      >
        <div className="font-bold mb-4 text-neutral-300">Projects</div>

        <div className="flex flex-col">
          <input
            className="input-container"
            type="text"
            name="title"
            id="title"
            value={entry.title}
            onChange={(e) =>
              handleInputChange(e.target.value, "projects", index, "title")
            }
            placeholder="Project Title"
          />
        </div>
        <div className="flex flex-col">
          <input
            className="input-container"
            type="text"
            name="role"
            id="role"
            value={entry.role}
            onChange={(e) =>
              handleInputChange(e.target.value, "projects", index, "role")
            }
            placeholder="Role in the project"
          />
        </div>
        <div className="flex flex-col">
          <input
            className="input-container"
            type="text"
            name="duration"
            id="duration"
            value={entry.duration}
            onChange={(e) =>
              handleInputChange(e.target.value, "projects", index, "duration")
            }
            placeholder="Project Duration"
          />
        </div>
        <div className="flex flex-col">
          <input
            className="input-container"
            type="text"
            name="link"
            id="link"
            value={entry.link}
            onChange={(e) =>
              handleInputChange(e.target.value, "projects", index, "link")
            }
            placeholder="Link to project (Optional)"
          />
        </div>
        <div className="flex flex-col">
          <input
            className="input-container"
            type="text"
            name="description"
            id="description"
            value={entry.description}
            onChange={(e) =>
              handleInputChange(
                e.target.value,
                "projects",
                index,
                "description"
              )
            }
            placeholder="Brief Description"
          />
        </div>

        <div
          onClick={() => handleRemove("projects", index)}
          className="text-white bg-red-500 py-2 px-6 rounded w-fit text-sm cursor-pointer"
        >
          Remove
        </div>
      </div>
    ))
  );
}

export default Projects;
