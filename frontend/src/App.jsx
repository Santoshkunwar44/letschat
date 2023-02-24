import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import StartMessageBox from './components/Message/StartMessageBox/StartMessageBox'
import MessageBox from './layout/MessageBox/MessageBox'
import ReLogin from './layout/Relogin/ReLogin'
import Auth from './pages/auth/Signup'
import Chat from './pages/chat/Chat'
import Profile from './pages/profile/Profile'
import { get_set_loggedIn_user } from './utils/redux/actions/authAction'

function App() {

  const navigate = useNavigate()
  const { isSessionExpired } = useSelector((state) => state.otherReducer)

  const redirect = () => {
    navigate("signup")
  }





  return (
    <div className="App">
      {
        isSessionExpired && <ReLogin />
      }
      <Routes>
        <Route path='/' element={<Navigate to={"/chat"} />} />
        <Route path='/chat' element={<ProtectedRoute cb={redirect} >

          <Chat />

        </ProtectedRoute>
        } >
          <Route path=':chatId' element={<MessageBox />} />
          <Route path='user/:userId' element={<MessageBox />} />
          <Route path='' index element={<StartMessageBox />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/signup' element={<Auth />} />
      </Routes>


    </div>
  )
}

export default App

const ProtectedRoute = ({ children, cb }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    getLoggedUser()
  }, [])


  const getLoggedUser = () => {
    dispatch(get_set_loggedIn_user(handleRedirects))
  }
  const handleRedirects = (err, user) => {
    if (err) {
      cb()
    } else {
      setIsLoggedIn(true)
    }
  }

  if (isLoggedIn === true) {
    return children
  } else if (isLoggedIn === false) {
    cb()
  }



}