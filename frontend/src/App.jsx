import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import CallPage from './pages/CallPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import {Toaster} from "react-hot-toast"
import PageLoader from './components/PageLoader.jsx'
import userAuthUser from "./hooks/useAuthUser.jsx"
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'
import FriendsPage from './pages/FriendsPage.jsx'

const App = () => {

  const {isLoading,authUser}=userAuthUser()
  const {theme}=useThemeStore();
  const isAuthenticated=Boolean(authUser)
  const isOnboarded=authUser?.isOnboarded
  console.log("onboarded: ",isOnboarded)
  if(isLoading) return <PageLoader/>

  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
          <Route path='/' element={isAuthenticated && isOnboarded ?<Layout showSidebar={true}><HomePage/></Layout>:<Navigate to={!isAuthenticated?"/login":"/onboarding"}/>} />
          <Route path='/signup' element={!isAuthenticated?<SignupPage/>:<Navigate to={isOnboarded?'/':'/onboarding'}/>} />
          <Route path='/login' element={!isAuthenticated?<LoginPage/>:<Navigate to={isOnboarded?'/':'/onboarding'}/>} />
          <Route path='/notifications' element={(isAuthenticated && isOnboarded)?(<Layout showSidebar={true}><NotificationsPage/></Layout>):(<Navigate to={isAuthenticated?'/onboarding':'/login'}/>)}  />

          <Route path='/friends' element={(isAuthenticated&&isOnboarded)?(<Layout showSidebar={true}><FriendsPage/></Layout>):(<Navigate to={isAuthenticated?'/onboardeding':'/login'}/>)} />

          <Route path='/chat/:id' element={(isAuthenticated&&isOnboarded)?(<Layout showSidebar={false}><ChatPage/></Layout>):(<Navigate to={isAuthenticated?'/onboarding':'/login'}/> )} />
          <Route path='/call/:id' element={(isAuthenticated&&isOnboarded)?(<CallPage/>):(<Navigate to={isAuthenticated?'/onboardeding':'/login'}/>)} />
          {/* <Route path='/onboarding' element={<OnboardingPage/>} /> */}
          <Route path='/onboarding' element={isAuthenticated?(!isOnboarded?<OnboardingPage/>:<Navigate to="/"/>):<Navigate to="/login"/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
