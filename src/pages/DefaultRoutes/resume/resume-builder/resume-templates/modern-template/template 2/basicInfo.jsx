function BasicInfo({ data }) {
  return (
    <section className="section-top text-center">
      <style>{`
        .modern-two .section-top {
          width: 100%;
        }

        .text-center {
          text-align: center;
        }
      `}</style>
      <h1 className="capitalize">
        {data.firstName && data.lastName
          ? `${data.firstName} ${data.lastName}`
          : data.firstName
          ? data.firstName
          : data.lastName
          ? data.lastName
          : "Your Name"}
        {", "}
        {data.profession ? data.profession : "Your Profession"}
      </h1>

      {/* Contact */}
      {(data.state ||
        data.country ||
        data.email ||
        data.city ||
        data.phoneNumber ||
        data.zipCode) && (
        <p>
          {/* Address */}
          {data.zipCode && data.zipCode}&#160; {data.city && data.city}
          {(data.zipCode || data.city) && data.state && ", "}
          {data.state && data.state}
          {data.state && data.country && ", "}
          {data.country && data.country}
          {((data.email &&
            (data.state || data.country || data.city || data.zipCode)) ||
            (data.phoneNumber &&
              (data.state || data.country || data.city || data.zipCode))) &&
            ", "}
          {/* Email */}
          {data.email && (
            <a href={`mailto:${data.phoneNumber}`}>{data.email}</a>
          )}
          {data.email && data.phoneNumber && ", "}
          {data.phoneNumber && (
            <a href={`tel:${data.phoneCode}${data.phoneNumber}`}>
              +{data.phoneCode} {data.phoneNumber}
            </a>
          )}
        </p>
      )}
    </section>
  );
}

export default BasicInfo;
