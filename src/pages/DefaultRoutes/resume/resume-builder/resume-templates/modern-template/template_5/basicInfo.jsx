function BasicInfo({ data, image }) {
  return (
    <section className="basicinfo">
      <div className="img">
        {image && <img src={image} alt="Profile" className="img" />}
      </div>
      <div className="info-container">
        <div className="biodata">
          <p>{data && data.profession ? data.profession : "Your Profession"}</p>
          <h1 className="capitalize">
            {data && data.firstName && data.lastName
              ? `${data.firstName} ${data.lastName}`
              : data && data.firstName
              ? data.firstName
              : data && data.lastName
              ? data.lastName
              : "Your Name"}
          </h1>
        </div>
        {data &&
          (data.state ||
            data.country ||
            data.email ||
            data.phoneNumber ||
            data.city ||
            data.zipCode) && (
            <div className="contact paragraph">
              <div>
                <p>
                  {data.zipCode && data.zipCode} {data.city && data.city}
                  {(data.zipCode || data.city) && data.state && ", "}
                  {data.state && data.state}
                  {data.state && data.country && ", "}
                  {data.country && data.country}
                </p>
                <p>
                  {data.email && (
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                  )}
                </p>

                <p>
                  {data.phoneNumber && (
                    <a href={`tel:${data.phoneCode}${data.phoneNumber}`}>
                      ({data.phoneCode || `234`}) {data.phoneNumber}
                    </a>
                  )}
                </p>
              </div>

              <div>
                <p>
                  {data.profileUrl && (
                    <a href={data.profileUrl}>{data.profileUrl}</a>
                  )}
                </p>
              </div>
            </div>
          )}
      </div>
    </section>
  );
}

export default BasicInfo;
