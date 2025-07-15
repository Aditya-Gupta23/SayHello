import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import CallPage from './pages/CallPage.jsx'
import NotificationPage from './pages/NotificationPage.jsx'

const App = () => {
  return (
    <div className='h-screen' data-theme="night">
      <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/notifications' element={<NotificationPage/>}  />
          <Route path='/chat' element={<ChatPage/>} />
          <Route path='/call' element={<CallPage/>} />
          <Route path='/onboarding' element={<OnboardingPage/>} />
      </Routes>
    </div>
  )
}

export default App
