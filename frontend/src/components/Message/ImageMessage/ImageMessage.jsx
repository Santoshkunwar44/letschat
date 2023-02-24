import React from 'react'
import { useSelector } from 'react-redux'
import { isLoggedInUser } from '../../../utils/helper'
import styles from "./ImageMessage.module.css"
const ImageMessage = ({ message }) => {
    const { userData } = useSelector((state) => state.authReducer)
    return (
        <div className={`${styles.ImageMessage}  ${isLoggedInUser(message?.senderId?._id, userData?._id) ? styles.own : ""} `}>
            <img draggable={'false'} className={styles.messageImg} width={"200px"} src={message?.images[0]} alt="punk" />
        </div>
    )
}

export default ImageMessage