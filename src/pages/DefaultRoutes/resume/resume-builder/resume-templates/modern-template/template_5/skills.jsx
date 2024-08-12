function Skills({ data }) {
  return (
    data.length >= 1 && (
      <section className="w-full skills">
        <div>
          <h2 className="header">Skills</h2>
        </div>
        <div className="skill-desc">
          {data.map((item, index) => (
            <div key={index} className="skill">
              <h4>{item.name === "" ? `Skill ${index + 1}` : item.name}</h4>
              <p>{item.lvl}</p>
            </div>
          ))}
        </div>
      </section>
    )
  );
}

export default Skills;
