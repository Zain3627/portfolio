import { Link, Navigate, useParams } from "react-router-dom"
import SiteLayout from "../components/SiteLayout"
import { projects } from "../data/projects"

function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    // Unknown slug — send them back to the list rather than showing a dead end.
    return <Navigate to="/projects" replace />
  }

  return (
    <SiteLayout>
      <section className="page page--project-detail">
        <Link to="/projects" className="back-link">
          ← All projects
        </Link>

        <header className="project-detail-header">
          <p className="card-label">{project.subtitle}</p>
          <h1>{project.title}</h1>
          <p className="project-detail-date">{project.date}</p>
          <p className="project-detail-summary">{project.summary}</p>
        </header>

        {project.media && project.media.length > 0 && (
          <div className="media-grid">
            {project.media.map((media) => (
              <figure key={media.label} className="media-card">
                <img src={media.src} alt={`${project.title} - ${media.label}`} />
                <figcaption>{media.label}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="project-detail-grid">
          <div className="project-detail-box">
            <h4>Technologies</h4>
            <ul className="chip-row">
              {project.technologies.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {project.problem && (
            <div className="project-detail-box">
              <h4>The problem</h4>
              <p>{project.problem}</p>
            </div>
          )}

          {project.development && (
            <div className="project-detail-box">
              <h4>How it was built</h4>
              <ul className="bullet-list">
                {project.development.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.impact && (
            <div className="project-detail-box">
              <h4>Impact</h4>
              <ul className="bullet-list">
                {project.impact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.whatILearned && (
            <div className="project-detail-box">
              <h4>What I learned</h4>
              <ul className="bullet-list">
                {project.whatILearned.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}

export default ProjectDetailPage
