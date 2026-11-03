# Full-Stack Portfolio & Blog Application

**Student:** Wen Yiwei  
**Student ID:** 24998036  
**Course:** Web Data Management and Application  

## Project Overview

A complete full-stack personal portfolio website with a blog system, built with Node.js/Express backend and React frontend.

### Live Demo
- **Frontend:** [Your Vercel/Netlify URL here]
- **Backend API:** [Your Render/Heroku URL here]

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB Atlas (cloud database)
- Mongoose ODM
- JWT Authentication (jsonwebtoken)
- bcryptjs (password hashing)
- Helmet (security headers)
- CORS

### Frontend
- React 18
- Vite (build tool)
- React Router v6 (client-side routing)
- Context API (state management)
- CSS (responsive design)

## Project Structure

```
├── server/                 # Backend API
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── BlogPost.js
│   │   ├── Comment.js
│   │   └── Message.js
│   ├── routes/             # API routes
│   │   ├── users.js
│   │   ├── projects.js
│   │   ├── blog.js
│   │   └── contact.js
│   ├── middleware/
│   │   └── auth.js         # JWT protect middleware
│   ├── server.js          # Entry point
│   └── .env                # Environment variables
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # AuthContext
│   │   ├── pages/          # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
└── README.md
```

## API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register new user | Public |
| POST | `/api/users/login` | Login & get JWT | Public |
| GET | `/api/users/me` | Get current user | Private |

### Projects
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create project | Private |
| PUT | `/api/projects/:id` | Update project | Private/Owner |
| DELETE | `/api/projects/:id` | Delete project | Private/Owner |

### Blog
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog` | Get all posts | Public |
| GET | `/api/blog/:id` | Get single post + comments | Public |
| POST | `/api/blog` | Create post | Private |
| PUT | `/api/blog/:id` | Update post | Private/Author |
| DELETE | `/api/blog/:id` | Delete post | Private/Author |

### Comments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog/:postId/comments` | Get post comments | Public |
| POST | `/api/blog/:postId/comments` | Add comment | Private |

### Contact
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Submit contact form | Public |

## How to Run Locally

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)

### Backend Setup
```bash
cd server
npm install

# Create .env file with:
# PORT=5000
# MONGODB_URI=your_mongodb_atlas_connection_string
# JWT_SECRET=your_secret_key

npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
# Client runs on http://localhost:3000
```

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy as Web Service

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

## Features

- ✅ User registration & login with JWT
- ✅ Protected admin dashboard
- ✅ Portfolio project management (CRUD)
- ✅ Blog system with comments
- ✅ Contact form
- ✅ Responsive design
- ✅ Password hashing with bcrypt
- ✅ Error handling middleware
- ✅ Security headers with Helmet
