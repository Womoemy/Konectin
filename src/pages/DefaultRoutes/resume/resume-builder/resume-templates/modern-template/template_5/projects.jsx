function Projects({ projects }) {
  return (
    projects >= 1 && (
      <section>
        <h2>Projects</h2>

        <div>
          {projects.map((project, index) => (
            <div key={index} className="w-full">
              <span>{project.title}</span>
            </div>
          ))}
        </div>
      </section>
    )
  );
}

export default Projects;
