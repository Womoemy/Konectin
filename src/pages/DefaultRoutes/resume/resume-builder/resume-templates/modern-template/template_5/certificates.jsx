function Certificates({ data }) {
  return (
    data && (
      <section className="certs">
        <h2 className="header">Certificates</h2>

        <div>
          {data.map((cert, index) => (
            <div key={index} className="w-full list-none">
              <p className="list-item">{cert.name}</p>
            </div>
          ))}
        </div>
      </section>
    )
  );
}
export default Certificates;
