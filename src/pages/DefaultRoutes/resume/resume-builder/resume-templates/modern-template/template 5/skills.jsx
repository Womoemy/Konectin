function Skills({ data }) {
  return (
    data.length >= 1 && (
      <section className="section">
        <style>{``}</style>

        <div className="side-content">
          <h2>Skills</h2>
        </div>

        <div className="main-content">
          <div className="separated-div list-none skills">
            {data.map((item, index) => (
              <div key={index} className="mb-2 separated-div">
                <h3>{item.name === "" ? `Skill ${index + 1}` : item.name}</h3>
                {item.lvl !== "" && (
                  <span>
                    {item.lvl <= 70 && item.lvl > 40
                      ? "Proficient"
                      : item.lvl <= 40
                      ? "Novice"
                      : "Expert"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
}

export default Skills;
