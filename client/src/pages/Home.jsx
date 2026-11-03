import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="hero">
      <h1>Hi, I'm Wen Yiwei</h1>
      <p>
        Computer Science student passionate about building web applications. 
        This is my personal portfolio where I showcase my projects, share thoughts on tech, and connect with others.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/projects" className="btn btn-primary">View My Work</Link>
        <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
      </div>
    </div>
  )
}
