function Profile({ data }) {
  return (
    data && (
      <section className="profile">
        <h2 className="header">Profile</h2>

        <div dangerouslySetInnerHTML={{ __html: data }} className="paragraph" />
      </section>
    )
  );
}

export default Profile;
