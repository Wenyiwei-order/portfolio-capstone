import { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data)
        } else {
          setError(data.message)
        }
      })
      .catch(() => setError('Failed to fetch projects'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">Loading projects...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div>
      <h1 className="page-title">My Projects</h1>
      {projects.length === 0 ? (
        <p>No projects yet. Check back soon!</p>
      ) : (
        <div className="card-grid">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
