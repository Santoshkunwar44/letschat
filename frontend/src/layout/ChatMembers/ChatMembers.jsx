import React, { useEffect, useState } from 'react'
import styles from "./ChatMembers.module.css"

import { useSelector } from "react-redux"
import ChatUser from '../../components/chats/ChatUser/ChatUser'
import { chatOfUserApi } from '../../utils/api/chatApi'
import { searchUserApi } from '../../utils/api/userApi'
import UserItem from '../../components/Users/UsersItem/UserItem'
import NoChatsYet from '../../components/chats/NoChatsYet/NoChatsYet'
import { useLocation, useParams } from 'react-router-dom'
const ChatMembers = () => {
    const { userData } = useSelector((state) => state.authReducer);
    const { refresh, searchInput, searchResult } = useSelector((state) => state.otherReducer);
    const [myChats, setMyChats] = useState(null);

    const { userId, chatId } = useParams();
    const isProfile = useLocation().pathname.split("/")[2]


    console.log(isProfile)

    // fetch all chats of the user 
    useEffect(() => {
        fetchUserChats()
    }, [userData?._id, refresh])



    const fetchUserChats = async () => {
        try {
            const res = await chatOfUserApi(userData?._id)
            setMyChats(res.data.message)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className={`${styles.chat_members} ${userId || chatId || (isProfile === "profile") ? styles.mini : ""}`}>

            <div className={styles.chat_member_list}>
                {
                    !myChats ? <p>loading</p> : searchInput?.length > 0 ? searchResult?.map(user => <UserItem user={user} key={user?._id} />) : myChats.length > 0 ? myChats.map(chat => <ChatUser chat={chat} key={chat?._id} />) : <NoChatsYet />
                }
            </div>

        </div >
    )
}

export default ChatMembers