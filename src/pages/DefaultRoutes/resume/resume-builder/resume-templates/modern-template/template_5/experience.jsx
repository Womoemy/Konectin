function Experience({ jobExperience, currentEditedJob }) {
  return (
    currentEditedJob >= 1 && (
      <section className="jobs">
        <h2 className="header">Employment</h2>

        <div className="job-details">
          {jobExperience.map((experience, index) => (
            <div key={index} className="w-full">
              <div className="jobInfo">
                <p className="duration">
                  {experience.startYear !== "" && <>{experience.startYear}</>}
                  {" - "}
                  {experience.current ? "Present" : `${experience.endYear}`}
                </p>
                <h3>
                  {experience.jobTitle && experience.jobTitle}

                  {experience.jobTitle && experience.company && " at "}

                  {experience.company && experience.company}
                </h3>
              </div>

              <div>
                <div className="list-none">
                  {experience.workDesc !== "" && (
                    <div
                      className="paragraph"
                      dangerouslySetInnerHTML={{
                        __html: experience.workDesc,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  );
}

export default Experience;
