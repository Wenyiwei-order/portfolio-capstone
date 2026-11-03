import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <div className="card">
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="card-image" />
      )}
      <div className="card-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="card-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
