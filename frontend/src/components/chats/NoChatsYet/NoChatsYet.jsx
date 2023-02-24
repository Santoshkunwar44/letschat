import styles from "./NoChatsYet.module.css"
const NoChatsYet = () => {
    return (
        <div className={styles.no_chats_yet_box}>
            <div className={styles.noChat_img_box}>


                <img className={styles.noChatImg} src="/image/no_msg.png" alt="nochatImg" />
                <p className={styles.no_chat_text}>No chats yet !!</p>


            </div>
        </div>
    )
}

export default NoChatsYet