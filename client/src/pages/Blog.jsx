import { useState, useEffect } from 'react'
import BlogPostCard from '../components/BlogPostCard'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPosts(data.data)
        } else {
          setError(data.message)
        }
      })
      .catch(() => setError('Failed to fetch blog posts'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">Loading blog...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div>
      <h1 className="page-title">Blog</h1>
      {posts.length === 0 ? (
        <p>No blog posts yet. Check back soon!</p>
      ) : (
        <div className="card-grid">
          {posts.map(post => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
