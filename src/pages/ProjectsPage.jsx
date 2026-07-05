import { Link } from "react-router-dom"
import SiteLayout from "../components/SiteLayout"
import SectionHeader from "../components/SectionHeader"
import { projects } from "../data/projects"

function ProjectsPage() {
  return (
    <SiteLayout>
      <section className="page page--projects">
        <SectionHeader
          eyebrow="Projects"
          title="A quick look at what I've built."
          description="Click any project to see the full story — the problem, how it was built, and what came out of it."
        />
        <div className="project-grid">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="project-card-link"
            >
              <article className="project-card project-card--compact">
                {project.thumbnail && (
                  <div className="project-card-media">
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} cover`}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="project-card-body">
                  <div className="project-card-heading">
                    <h3>{project.title}</h3>
                    <span className="project-card-date">{project.date}</span>
                  </div>
                  <p className="project-card-summary">{project.summary}</p>
                  <ul className="chip-row">
                    {project.technologies.slice(0, 4).map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                    {project.technologies.length > 4 && (
                      <li className="chip chip--muted">
                        +{project.technologies.length - 4}
                      </li>
                    )}
                  </ul>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}

export default ProjectsPage
