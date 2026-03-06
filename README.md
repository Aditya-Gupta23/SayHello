# SayHello

SayHello is a **MERN**-stack real-time chat application that lets users create an account, send/accept friend requests, chat in one‑to‑one conversations, and start video calls (powered by Streamify/WebRTC). [page:1]

---

## Features

- User authentication (signup, login, logout) with JWT sessions. [page:1]
- User profiles with avatar and basic info. [page:1]
- Send, accept, and reject friend requests. [page:1]
- Real-time one‑to‑one text chat using WebSockets/Socket.io. [page:1]
- Online/offline status indicators for friends. [page:1]
- Video calling between friends using Streamify/WebRTC. [page:1]
- Responsive UI built with React, Tailwind CSS, and Vite. [page:1]
- RESTful APIs with Express and MongoDB on the backend. [page:0]

---

## Tech Stack

### Frontend

- React (Vite + React template). [page:2]
- Vite build tool and dev server. [page:2]
- Tailwind CSS for styling. [page:2]
- Axios/Fetch for API calls to the backend. [page:2]

### Backend

- Node.js and Express.js for REST APIs and WebSocket setup. [page:1]
- MongoDB with Mongoose for data modelling (users, chats, friend requests, calls). [page:1]
- JWT for authentication and route protection. [page:1]
- Socket.io (or similar) for real-time messaging. [page:1]
- Streamify/WebRTC integration for video calls. [page:1]

---

## Project Structure

```bash
SayHello/
├── backend/          # Node.js + Express API and WebSocket server
│   ├── src/
│   │   ├── models/   # Mongoose models (User, Message, FriendRequest, Call, etc.)
│   │   ├── routes/   # Auth, users, chats, calls routes
│   │   ├── controllers/
│   │   ├── config/   # DB connection, environment config
│   │   └── index.js  # Server entrypoint
│   ├── package.json
│   └── package-lock.json
├── frontend/         # React client (Vite)
│   ├── src/
│   │   ├── components/   # UI components (ChatWindow, Sidebar, CallModal, etc.)
│   │   ├── pages/        # Auth pages, Home, Friends, Settings
│   │   ├── context/      # Auth and Socket context providers
│   │   └── main.jsx      # React entrypoint
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
├── .gitignore
└── package.json      # Optional root-level helpers (if used)
