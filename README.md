# SayHello

SayHello is a **MERN**-stack real-time chat application that lets users create an account, send/accept friend requests, chat in one‑to‑one conversations, and start video calls (powered by Streamify/WebRTC).

---

## Features

- User authentication (signup, login, logout) with JWT sessions. 
- User profiles with avatar and basic info.
- Send, accept, and reject friend requests.
- Real-time one‑to‑one text chat using WebSockets/Socket.io.
- Online/offline status indicators for friends.
- Video calling between friends using Streamify/WebRTC.
- Responsive UI built with React, Tailwind CSS, and Vite.
- RESTful APIs with Express and MongoDB on the backend. 

---

## Tech Stack

### Frontend

- React (Vite + React template).
- Vite build tool and dev server.
- Tailwind CSS for styling.
- Axios/Fetch for API calls to the backend.

### Backend

- Node.js and Express.js for REST APIs and WebSocket setup.
- MongoDB with Mongoose for data modelling (users, chats, friend requests, calls).
- JWT for authentication and route protection.
- Socket.io (or similar) for real-time messaging.
- Streamify/WebRTC integration for video calls.

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
