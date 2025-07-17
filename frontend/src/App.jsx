import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import CallPage from './pages/CallPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import {Toaster} from "react-hot-toast"
import { axiosInstance } from './lib/axios.js'
import { useQuery } from '@tanstack/react-query'


const App = () => {

  const {data:authData,isLoading,error}=useQuery({
    queryKey:["authUser"],
    queryFn:async ()=>{
      const res=await axiosInstance("/auth/me")
      return res.data
    },
    retry:false
  })

  const authUser=authData?.user

  return (
    <div className='h-screen' data-theme="night">
      <Routes>
          <Route path='/' element={authUser?<HomePage/>:<Navigate to="/login"/>} />
          <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to='/'/>} />
          <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to='/'/>} />
          <Route path='/notifications' element={<NotificationsPage/>}  />
          <Route path='/chat' element={authUser? <ChatPage/> : <Navigate to="/login"/>} />
          <Route path='/call' element={authUser?<CallPage/>:<Navigate to="/login"/>} />
          <Route path='/onboarding' element={authUser?<OnboardingPage/>:<Navigate to="/login"/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
