import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Admin() {
  const { token } = useAuth()
  const [projects, setProjects] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Project form state
  const [projForm, setProjForm] = useState({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' })
  const [editingProj, setEditingProj] = useState(null)

  // Blog form state
  const [blogForm, setBlogForm] = useState({ title: '', content: '' })
  const [editingPost, setEditingPost] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [projRes, blogRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/blog')
      ])
      const projData = await projRes.json()
      const blogData = await blogRes.json()
      if (projData.success) setProjects(projData.data)
      if (blogData.success) setPosts(blogData.data)
    } catch (err) {
      console.error('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  // Project handlers
  const handleProjSubmit = async (e) => {
    e.preventDefault()
    const url = editingProj ? `/api/projects/${editingProj._id}` : '/api/projects'
    const method = editingProj ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(projForm)
    })

    setProjForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' })
    setEditingProj(null)
    fetchData()
  }

  const handleEditProj = (proj) => {
    setProjForm({
      title: proj.title,
      description: proj.description,
      imageUrl: proj.imageUrl || '',
      repoUrl: proj.repoUrl || '',
      liveUrl: proj.liveUrl || ''
    })
    setEditingProj(proj)
  }

  const handleDeleteProj = async (id) => {
    await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchData()
  }

  // Blog handlers
  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    const url = editingPost ? `/api/blog/${editingPost._id}` : '/api/blog'
    const method = editingPost ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(blogForm)
    })

    setBlogForm({ title: '', content: '' })
    setEditingPost(null)
    fetchData()
  }

  const handleEditPost = (post) => {
    setBlogForm({ title: post.title, content: post.content })
    setEditingPost(post)
  }

  const handleDeletePost = async (id) => {
    await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchData()
  }

  if (loading) return <div className="loading">Loading admin dashboard...</div>

  return (
    <div>
      <h1 className="page-title">Admin Dashboard</h1>

      {/* Projects Section */}
      <div className="admin-section">
        <h2>Manage Projects</h2>
        <form onSubmit={handleProjSubmit} style={{ marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label>Project Title</label>
            <input
              value={projForm.title}
              onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={projForm.description}
              onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Image URL</label>
              <input
                value={projForm.imageUrl}
                onChange={(e) => setProjForm({ ...projForm, imageUrl: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Repo URL</label>
              <input
                value={projForm.repoUrl}
                onChange={(e) => setProjForm({ ...projForm, repoUrl: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Live URL</label>
              <input
                value={projForm.liveUrl}
                onChange={(e) => setProjForm({ ...projForm, liveUrl: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">
            {editingProj ? 'Update Project' : 'Add Project'}
          </button>
          {editingProj && (
            <button
              type="button"
              onClick={() => { setEditingProj(null); setProjForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' }) }}
              className="btn btn-outline btn-sm"
              style={{ marginLeft: '0.5rem' }}
            >
              Cancel
            </button>
          )}
        </form>

        {projects.map(proj => (
          <div key={proj._id} className="admin-item">
            <div>
              <strong>{proj.title}</strong>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{proj.description.substring(0, 60)}...</p>
            </div>
            <div className="admin-item-actions">
              <button onClick={() => handleEditProj(proj)} className="btn btn-outline btn-sm">Edit</button>
              <button onClick={() => handleDeleteProj(proj._id)} className="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Blog Section */}
      <div className="admin-section">
        <h2>Manage Blog Posts</h2>
        <form onSubmit={handleBlogSubmit} style={{ marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label>Post Title</label>
            <input
              value={blogForm.title}
              onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={blogForm.content}
              onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
              required
              style={{ minHeight: '100px' }}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">
            {editingPost ? 'Update Post' : 'Add Post'}
          </button>
          {editingPost && (
            <button
              type="button"
              onClick={() => { setEditingPost(null); setBlogForm({ title: '', content: '' }) }}
              className="btn btn-outline btn-sm"
              style={{ marginLeft: '0.5rem' }}
            >
              Cancel
            </button>
          )}
        </form>

        {posts.map(post => (
          <div key={post._id} className="admin-item">
            <div>
              <strong>{post.title}</strong>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{post.content.substring(0, 60)}...</p>
            </div>
            <div className="admin-item-actions">
              <button onClick={() => handleEditPost(post)} className="btn btn-outline btn-sm">Edit</button>
              <button onClick={() => handleDeletePost(post._id)} className="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
