# 📱 Social Media Web App (MERN Stack)

A full-stack social media application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with modern UI and scalable architecture.

---

## 🚀 Features

### 📝 Posts
- Create posts with text content
- Support for multiple media (images/videos)
- Post types:
  - `post`
  - `announcement`
- Timestamp formatted (Indian format)

---

### 🖼️ Media Handling
- Separate `PostMedia` schema
- Supports:
  - Images
  - Videos
- Media stored via URLs (scalable approach)

---

### 💬 Comments & Replies
- Add comments on posts
- Nested replies (comment → reply system)
- Structured response:
  - Main comments
  - Replies inside each comment

---

### 🔐 Authentication (Cookie-Based)
- Secure login system using HTTP-only cookies
- Token stored in cookies (not localStorage)
- Protected routes using middleware

---

### 🎨 Frontend (React + Tailwind)
- Responsive Instagram-like UI
- Features:
  - Fixed sidebar
  - Feed layout
  - Media rendering
  - Interactive buttons (like, comment, share)

---

### 📌 Sidebar UI
- Responsive sidebar
- Features:
  - Icons (lucide-react)
  - Notification badges
  - Profile section
  - Active menu highlighting

---

## 🧠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## 📁 Project Structure
- client/
    ├── src/
    │ ├── components/
    │ ├── pages/
    │ ├── api/
    │ ├── assets/
    │ └── App.jsx

- server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    └── index.js

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
- git clone https://github.com/your-username/social-media-app.git
- cd social-media-app

---

### 2️⃣ Backend Setup
- cd server
- npm install

- Create `.env` file:
    - PORT=5000
    - MONGO_URI=your_mongodb_connection
    - JWT_SECRET=your_secret_key

- Run backend:
 - npm run dev

---

### 3️⃣ Frontend Setup
- cd client
- npm install
- npm run dev


---

## 🔄 API Endpoints

### 📝 Posts
- `POST /api/posts` → Create post
- `GET /api/posts` → Get all posts
- `GET /api/posts/:id` → Get single post

---

### 💬 Comments
- `POST /api/posts/:postId/comments` → Add comment
- `GET /api/posts/:postId/comments` → Get comments

---

## 🧠 Architecture Highlights

- Separation of concerns (Post & Media separate)
- Scalable media handling
- Clean REST API design
- Reusable frontend components

---

## 🚀 Future Enhancements

### 🔥 Core Features
- Like / Unlike system
- Save posts
- Search functionality
- User profiles

---

### 💬 Social Features
- Real-time chat (Socket.io)
- Notifications system
- Follow / Unfollow users
- Story feature

---

### 🖼️ Media Improvements
- Upload images via Cloudinary
- Drag & drop upload UI
- Image compression

---

### 🎨 UI/UX Enhancements
- Dark / Light mode
- Mobile bottom navigation
- Animations (Framer Motion)
- Skeleton loading screens

---

### 🔐 Security & Performance
- Rate limiting
- Input validation
- JWT refresh tokens
- API caching

---

## 📌 Learning Outcomes

- Full-stack development (MERN)
- REST API design
- Cookie-based authentication
- Responsive UI with Tailwind
- Database schema design

---

## 📬 Contact

**Himanshu Singh Sengar**  
📧 himanshu.singh.sengrar@gmail.com  

---

# ⭐ If you like this project, give it a star!


