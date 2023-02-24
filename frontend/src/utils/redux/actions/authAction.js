import { getLoggedInUserApi, logoutApi } from "../../api/authApi";
import { updateUserApi } from "../../api/userApi";

export const setUserData = (data) => (dispatch) => {
    dispatch({ type: "SET_USER_DATA", data });
}
export const get_set_loggedIn_user = (cb) => async (dispatch) => {



    try {
        const res = await getLoggedInUserApi()
        if (res.status === 200) {
            const data = res.data.message
            dispatch({ type: "SET_USER_DATA", data });
            cb(null, data)
        } else {
            cb("not logged in", null)



        }
    } catch (error) {
        cb("not logged in", null)
        console.log(error)
    }


}

export const updateUserAction = (data, userId, cb) => async (dispatch) => {

    try {
        const res = await updateUserApi(data, userId)
        console.log("updatingg server response  ", res)
        if (res.status === 200) {
            dispatch({ type: "SET_USER_DATA", data: res.data.message });
            cb()
        }
    } catch (error) {
        console.log(error)
    }
}


export const logoutAction = (cb) => async (dispatch) => {
    try {
        const res = await logoutApi()
        if (res.status === 200) {
            cb()
        }
    } catch (error) {
        console.log(error)
    }
}

