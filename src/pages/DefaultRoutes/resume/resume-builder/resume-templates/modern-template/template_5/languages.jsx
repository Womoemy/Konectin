function Languages({ languages }) {
    return (
      languages && (
        <section className="langs">
          <h2 className="header">Languages</h2>
  
          <div className="list-container">
            {languages.map((lang, index) => (
              <div key={index} className="w-full list-none">
                <p className="list-item">{lang.language}</p>
              </div>
            ))}
          </div>
        </section>
      )
    );
  }
  export default Languages;
  