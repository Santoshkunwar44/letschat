import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ADD_INTERVAL_ID, REMOVE_INTERVAL_ID } from "../utils/redux/actions/otherAction"

const useSessionTimeOut = () => {
    const { interValId } = useSelector((state) => state.otherReducer)
    const { userData } = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()

    useEffect(() => {

        if (!userData) return
        const { lastLoggedIn } = userData;
        const sessionExpirationTimeInMS = lastLoggedIn + 1000 * 60 * 60 * 1;


        const currentTime = Date.now()
        const sessionExpirationBefore = sessionExpirationTimeInMS - 1000 * 60 * 5
        if (currentTime < sessionExpirationBefore) {
            handleSessionExpirationCheck(sessionExpirationBefore)
        } else {
            dispatch({ type: "SET_SESSION_EXPIRED" })
            dispatch(REMOVE_INTERVAL_ID())
        }


    }, [])

    const handleSessionExpirationCheck = (sessionEndTime) => {
        let theId = setInterval(async () => {
            let currentTime = Date.now();
            const remainingSeconds = Math.floor((sessionEndTime - currentTime) / 1000);
            if (remainingSeconds <= 0) {
                dispatch({ type: "SET_SESSION_EXPIRED" })
                dispatch(REMOVE_INTERVAL_ID())
            }
            console.log(remainingSeconds)
        }, 1000);
        dispatch(ADD_INTERVAL_ID(theId))
    }

    return {}
}

export default useSessionTimeOut