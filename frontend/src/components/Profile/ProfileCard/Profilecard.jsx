import React, { useEffect, useRef, useState } from 'react'
import styles from "./Profilecard.module.css"
import { useDispatch, useSelector } from "react-redux"
import { logoutAction, updateUserAction } from '../../../utils/redux/actions/authAction'
import { useNavigate } from 'react-router-dom'
import { REMOVE_INTERVAL_ID } from '../../../utils/redux/actions/otherAction'
import UploadProgress from '../ImageUploadProgress/UploadProgress'
const Profilecard = () => {
    const { userData } = useSelector((state) => state.authReducer)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [startUpdate, setStartUpdate] = useState(false);
    const usernameRef = useRef()
    const imageInputRef = useRef();
    const [isImageUpload, setIsImageUpload] = useState(false)
    const [updateDetails, setUpdateDetails] = useState({
        username: "",
        profileImg: null
    })



    const startUpload = () => {

        if (updateDetails?.profileImg) {
            setIsImageUpload(true)
        } else {
            handleUpdate()
        }
    }


    const handleDetailsChange = (name, value) => {
        setUpdateDetails((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleUpdate = (imageUrl) => {
        console.log(imageUrl)
        const requestPayload = {
            username: usernameRef.current.innerText,
            profileImg: imageUrl
        }
        !requestPayload.profileImg && delete requestPayload.profileImg
        console.log(requestPayload)
        dispatch(updateUserAction(requestPayload, userData?._id, actionAfterUpdate))
    }


    const actionAfterUpdate = () => {
        setIsImageUpload(false)
        setStartUpdate(false)
        setUpdateDetails({
            username: "",
            profileImg: null
        })
    }

    const handleLogout = () => {
        dispatch(logoutAction(handleAfterLogout))
    }
    const handleAfterLogout = () => {
        dispatch(REMOVE_INTERVAL_ID())
        navigate("/signup")
        dispatch({ type: "SET_USER_DATA", data: null });
    }
    return (
        <>
            {
                isImageUpload && <UploadProgress setClose={() => setIsImageUpload(false)} images={[updateDetails.profileImg]} cb={handleUpdate} />
            }

            <div className={styles.profile_card}>
                <div className={styles.profileOnlineInfo}>
                    <div className={styles._online_dot}></div>  <p className={`${styles.online_text}`}> Online </p>

                </div>
                <div className={styles.profile_imageWrapper}>
                    <img className={styles.profileImgee} width={"100px"} src={userData?.profileImg} alt="userProfileImg" />
                    {

                        startUpdate && <div onClick={() => imageInputRef.current.click()} className={styles.editImgWrapper}>

                            {
                                updateDetails?.profileImg ? <img src={URL.createObjectURL(updateDetails?.profileImg)}
                                    className={styles.new_image} /> :

                                    <img src={
                                        "https://img.icons8.com/plasticine/100/null/compact-camera.png"}
                                        className={styles.editCamera} />
                            }

                            <input onChange={(e) => handleDetailsChange("profileImg", e.target.files[0])} style={{ display: "none" }} type="file" name="profileImg" ref={imageInputRef} />
                        </div>

                    }
                    <div className={styles.user_online_dot}></div>

                </div>
                <div className={styles.profile_main_details}>
                    <h3 ref={usernameRef} contentEditable={startUpdate ? "true" : "false"} className={`${styles.profile_username} ${startUpdate ? styles.show_outline : ""} `}>{userData?.username}</h3>
                    <p className={styles.profile_email}>{userData?.email}</p>
                </div>
                <div className={styles.profile_buttons}>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                    {

                        startUpdate ? <button onClick={() => {
                            startUpload();
                        }}>
                            Update
                        </button> : <button onClick={() => setStartUpdate(true)}>
                            Edit
                        </button>
                    }


                </div>
            </div>
        </>
    )
}

export default Profilecard