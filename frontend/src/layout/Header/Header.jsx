import styles from "./Header.module.css"
import { MdPersonSearch } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { searchUserApi } from "../../utils/api/userApi"
import { useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
    const { userData } = useSelector((state) => state.authReducer)
    const { searchInput } = useSelector((state) => state.otherReducer)
    const dispatch = useDispatch()
    const inputRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        if (inputRef.current) {
            dispatch({ type: "SET_SEARCH_INPUT_REF", data: inputRef.current })
        }
    }, [inputRef])

    const handleFilterChatMember = async (e) => {
        dispatch({ type: "SET_SEARCH_INPUT", data: e.target.value })
        try {
            const res = await searchUserApi(e.target.value);

            let allUsers = res.data.message;

            if (allUsers) {
                allUsers = allUsers.filter((user) => user?._id !== userData?._id)
            }
            console.log(allUsers, userData?._id)

            dispatch({ type: "SET_SEARCH_RESULT", data: allUsers })

        } catch (error) {
            console.log(error)
        }
    }

    const clearSearchUser = () => {
        dispatch({ type: "SET_SEARCH_INPUT", data: "" })
    }

    return (
        <div className={styles.header}>
            <div className={styles.header_left}>
                <Link to={'/chat'}>
                    <img draggable="false" width={"35px"} src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/null/external-chat-notification-xnimrodx-lineal-color-xnimrodx.png" />
                </Link>
                <div className={styles.chat_member_search}>
                    <MdPersonSearch className={styles.chat_memeber_search_icon} />
                    <input className={styles.input_elem} ref={inputRef} onChange={handleFilterChatMember} type="text" placeholder='search  user....' value={searchInput} />
                    {
                        searchInput?.length > 0 && <img className={styles.cross_img} src="https://img.icons8.com/external-flat-icons-pause-08/64/null/external-cross-car-repair-flat-icons-pause-08.png" alt="removeIcon" onClick={clearSearchUser} />
                    }

                </div>
            </div>
            <div className={styles.header_right}>
                <div className={styles.userInfo} onClick={() => navigate("profile")}>
                    <img draggable="false" src={userData?.profileImg} alt="profileImg" />
                    <div className={styles.user_details}>
                        <h4>{userData?.username}</h4>
                        <small>{userData?.email}</small>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header