import React from 'react'
import styles from "./Relogin.module.css"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
const ReLogin = () => {
    const { userData } = useSelector((state) => state.authReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className={styles.relogin_container}>
            <div className={styles.relogin_content}>

                <h2> Hey 🙋‍♂️ {userData?.username} ! Your session is about to complete  <br /> <p className={styles.secondary_text}>Please Relogin to continue </p></h2>
                <button onClick={() => { navigate("/signup"); dispatch({ type: "REMOVE_SESSION_EXPIRED" }) }} className={styles.reLogin_button}>Login</button>
            </div>


        </div>
    )
}

export default ReLogin