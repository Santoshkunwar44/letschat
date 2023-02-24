import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { loginApi, registerApi } from '../../utils/api/authApi'
import { setUserData } from '../../utils/redux/actions/authAction'
import styles from "./signup.module.css"
const Auth = () => {

  const [authType, setAuthType] = useState("signup");
  const [error, setError] = useState("")


  const AuthElements = {
    signup: <Signup error={error} setError={(error) => setError(error)} onClick={() => setAuthType("login")} />,
    login: <Login error={error} setError={(error) => setError(error)} onClick={() => setAuthType("signup")} />
  }

  return (
    <div className={styles.signup_box}>
      {AuthElements[authType]}
    </div >
  )
}

export default Auth



const Signup = ({ onClick, setError, error }) => {
  // 
  const [signUPDetails, setsignUPDetails] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInput = (e) => {
    setsignUPDetails((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const handleSignUpSubmit = async () => {
    try {
      delete signUPDetails.confirmPassword;
      const res = await registerApi(signUPDetails);
      if (res.status === 200) {
        dispatch(setUserData(res.data.message));
        navigate("/chat")
      } else {
        setError(res.data.message)
      }

    } catch (error) {
      error = error.response?.data?.message || error.message
      setError(error)
    }
  }
  return <>
    <div className={styles.signup_content}>
      <span className={styles.errorMsg}>{error}</span>
      <div className={styles.signup_header}>
        <h4>SIGN UP</h4>
      </div>
      <form className={styles.signup_form} >
        <input placeholder='username...' type="text" name="username" onChange={handleInput} />
        <input placeholder='Email address' type="email" required name="email" onChange={handleInput} />
        <input placeholder='password' type="password" required name="password" onChange={handleInput} />
        <input placeholder='confirm password' type="password" required name="confirmPassword" onChange={handleInput} />
      </form>
      <button className={styles.authBtn} onClick={handleSignUpSubmit}>SIGN UP</button>

      <span className={styles.bottom_info} onClick={onClick}>Already have Account ? Login .</span>
    </div>
  </>
}

const Login = ({ onClick, setError, error }) => {



  // 
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleInput = (e) => {
    setLoginDetails((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const handleLoginSubmit = async () => {
    try {
      const res = await loginApi(loginDetails);
      if (res.status === 200) {
        dispatch(setUserData(res.data.message));
        navigate("/chat")
      } else {
        setError(res.data.message)
      }

    } catch (error) {
      error = error.response?.data?.message || error.message
      setError(error)
    }
  }

  return <>
    <div className={styles.signup_content}>
      <span className={styles.errorMsg}>{error}</span>
      <div className={styles.signup_header}>
        <h4>LOGIN</h4>
      </div>
      <form className={styles.signup_form} >
        <input placeholder='email address' type="email" name="email" onChange={handleInput} />
        <input placeholder='password' type="password" required name="password" onChange={handleInput} />
      </form>
      <button className={styles.authBtn} onClick={handleLoginSubmit}>LOGIN</button>

      <span className={styles.bottom_info} onClick={onClick}>Dont  have Account ? Sign up</span>
    </div>
  </>
}
