import { Link } from 'react-router-dom'

export default function BlogPostCard({ post }) {
  return (
    <div className="card">
      <div className="card-body">
        <h3>{post.title}</h3>
        <p className="meta" style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
          By {post.author?.username || 'Unknown'} · {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p>{post.content.substring(0, 120)}...</p>
        <Link to={`/blog/${post._id}`} className="btn btn-primary btn-sm">Read More</Link>
      </div>
    </div>
  )
}
