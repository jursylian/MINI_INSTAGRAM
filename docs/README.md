# ICHgram — Instagram Clone (Fullstack App)

## 🧩 Description
ICHgram is a fullstack web application inspired by Instagram.  
It allows users to create profiles, share posts, interact with other users, and explore content in a modern social media environment.

The project demonstrates fullstack development skills including authentication, API design, database modeling, and responsive frontend UI.

---

## 🚀 Features

- User authentication (registration, login, password reset)
- Profile management (edit profile, upload avatar)
- Create, edit and delete posts
- Like and comment system
- Follow / unfollow users
- Personalized feed (posts from followed users)
- Explore page (discover random posts)
- User search
- Notifications system
- Fully responsive design (mobile & desktop)

---

## 🌍 Deployment & Production
- Frontend deployed on Vercel
- Backend deployed on Render
- Database migrated from local MongoDB to MongoDB Atlas
- Configured environment variables for production
- Refactored API base URL using VITE_API_BASE_URL
- Fixed localhost issues for production deployment
- Connected fullstack monorepo architecture to cloud services

## 🛠 Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- React Hook Form

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file uploads)

---

## 💡 Key Highlights
- Fullstack MERN-style architecture
- JWT-based authentication
- RESTful API integration
- Cloud deployment (Render + Vercel + MongoDB Atlas)
- Responsive social media UI
- Monorepo project structure

---

## 🔐 Environment Variables

Backend:
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=

Frontend:
VITE_API_BASE_URL=

## ⚠️ Notes

Images are stored as Base64 in MongoDB for simplicity in this educational project.  
For production, cloud storage (e.g. AWS S3 or Cloudinary) is recommended.

---

## 🔗 Live Demo
Frontend: https://your-vercel-link.vercel.app  
Backend API: https://mini-instagram-2.onrender.com

---

## 📂 Installation

### Backend
```bash
cd backend
npm install
npm run dev
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```
## 📂 Installation & Setup

### 1. Clone repository

```bash
git clone https://github.com/jursylian/MINI_INSTAGRAM.git
cd MINI_INSTAGRAM
