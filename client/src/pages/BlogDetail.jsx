import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function BlogDetail() {
  const { id } = useParams()
  const { user, token } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commentBody, setCommentBody] = useState('')
  const [commentError, setCommentError] = useState('')

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPost(data.data)
        } else {
          setError(data.message)
        }
      })
      .catch(() => setError('Failed to fetch post'))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    setCommentError('')

    if (!commentBody.trim()) {
      setCommentError('Comment cannot be empty')
      return
    }

    const res = await fetch(`/api/blog/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ body: commentBody })
    })
    const data = await res.json()

    if (data.success) {
      setPost(prev => ({
        ...prev,
        comments: [data.data, ...prev.comments]
      }))
      setCommentBody('')
    } else {
      setCommentError(data.message)
    }
  }

  if (loading) return <div className="loading">Loading post...</div>
  if (error) return <div className="error">{error}</div>
  if (!post) return <div className="error">Post not found</div>

  return (
    <div className="blog-detail">
      <h1>{post.title}</h1>
      <p className="meta">
        By {post.author?.username || 'Unknown'} · {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="content">{post.content}</div>

      <h3 style={{ marginBottom: '1rem' }}>Comments ({post.comments?.length || 0})</h3>
      
      {user && (
        <form onSubmit={handleSubmitComment} style={{ marginBottom: '1.5rem' }}>
          <div className="form-group">
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Write a comment..."
            />
          </div>
          {commentError && <p style={{ color: '#dc2626', marginBottom: '0.5rem' }}>{commentError}</p>}
          <button type="submit" className="btn btn-primary btn-sm">Post Comment</button>
        </form>
      )}

      {post.comments?.length > 0 ? (
        post.comments.map(comment => (
          <div key={comment._id} className="comment">
            <p className="meta">
              <strong>{comment.author?.username || 'Unknown'}</strong> · {new Date(comment.createdAt).toLocaleString()}
            </p>
            <p>{comment.body}</p>
          </div>
        ))
      ) : (
        <p style={{ color: '#94a3b8' }}>No comments yet.</p>
      )}
    </div>
  )
}
