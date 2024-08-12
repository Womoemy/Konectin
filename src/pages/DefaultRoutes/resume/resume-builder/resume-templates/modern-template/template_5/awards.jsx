function Awards({ awards }) {
  return (
    awards.length >= 1 && (
      <section>
        <h2 className="header">Awards</h2>

        <div>
          {awards.map((award, index) => (
            <div key={index} className="w-full">
              <div>
                <span>{award.awardYear}</span>
                <h3>{award.title}</h3>
              </div>
              <p>{award.organization}</p>
              <div>
                <div className="list-none">
                  {award.description !== "" && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: award.description,
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
export default Awards;
