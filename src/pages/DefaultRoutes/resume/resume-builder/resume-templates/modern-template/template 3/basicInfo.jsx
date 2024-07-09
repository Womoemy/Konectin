function BasicInfo({ data, image }) {
  return (
    <section className="flex gap-4">
      <div>{image && <img src={image} alt="Profile" className="image" />}</div>
      <section>
        <h1 className="capitalize">
          {data.firstName && data.lastName
            ? `${data.firstName} ${data.lastName}`
            : data.firstName
            ? data.firstName
            : data.lastName
            ? data.lastName
            : "Your Name"}
        </h1>
        <p>{data.profession ? data.profession : "Your Profession"}</p>
      </section>
    </section>
  );
}

export default BasicInfo;
