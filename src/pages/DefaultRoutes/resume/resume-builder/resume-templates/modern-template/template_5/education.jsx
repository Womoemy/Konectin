function Education({ education, currentEditedEducation }) {
  return (
    currentEditedEducation >= 1 && (
      <section className="w-full edu-details">
        <h2 className="header">Education</h2>

        {education.map((edu, index) => (
          <div key={index} className="w-full">
            <div className="school">
              <span className="duration">
                {edu?.startYear && edu?.startYear}
                {" - "}
                {edu?.endYear && edu?.endYear}
                {!edu?.endMonth && !edu?.endYear && `Present`}
              </span>
              <h3>{edu?.schoolName && edu?.schoolName}</h3>
            </div>

            <div className="sub-section">
              <p className="degree">{edu?.degree && edu?.degree}</p>

              <ul className="capitalize list-none sub-section">
                {edu?.relevantCourses?.map(
                  (item, index) =>
                    item.name !== "" && <li key={index}>{item.name}</li>
                )}
              </ul>

              <ul className="capitalize list-none sub-section">
                {edu?.awards?.map(
                  (item, index) =>
                    item.name !== "" && <li key={index}>{item.name}</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </section>
    )
  );
}

export default Education;
