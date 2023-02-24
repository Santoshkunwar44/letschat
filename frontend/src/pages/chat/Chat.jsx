
import { Outlet } from "react-router-dom"
import ChatMembers from "../../layout/ChatMembers/ChatMembers"
import MessageBox from "../../layout/MessageBox/MessageBox"
import styles from "./Chat.module.css"
import { io } from "socket.io-client"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveUsers, setSocketRef } from "../../utils/redux/actions/socketAction"
import Header from "../../layout/Header/Header"
import useSessionTimeOut from "../../hooks/useSessionTimeOut"

const Chat = () => {

    const socketRef = useRef()
    const { userData } = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()
    const session = useSessionTimeOut()


    useEffect(() => {
        socketRef.current = io("ws://localhost:8000")
        dispatch(setSocketRef(socketRef.current))

        return () => {
            socketRef.current.emit("leave", userData?._id)
        }
    }, [])


    useEffect(() => {
        if (!userData?._id) return
        socketRef.current.emit("join", userData?._id)
        socketRef.current.on("get_online_users", (onlineUsers) => {
            dispatch(setActiveUsers(onlineUsers))
        })
    }, [userData])

    useEffect(() => {
        socketRef.current.on("get_message", (message) => {
            let data = { ...message }
            delete data.sender_id;
            delete data.receiver_id;
            dispatch({ type: "ADD_NEW_CHAT_MESSAGE", data: message })
            dispatch({ type: "START_REFRESH" })

        })
    }, [])



    return (
        <>
            <Header />
            <div className={styles.chat_page}>
                <ChatMembers />
                <Outlet />
            </div>
        </>
    )
}

export default Chat