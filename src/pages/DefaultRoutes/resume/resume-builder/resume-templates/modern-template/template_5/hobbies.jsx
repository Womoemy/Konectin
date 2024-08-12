function Hobbies({ hobbies }) {
  return (
    hobbies && (
      <section className="hobbies">
        <h2 className="header">Hobbies</h2>

        <div className="list-container">
          {hobbies.map((item, index) => (
            <div key={index} className="w-full list-none">
              <p className="list-item">{item.hobby}</p>
            </div>
          ))}
        </div>
      </section>
    )
  );
}
export default Hobbies;
