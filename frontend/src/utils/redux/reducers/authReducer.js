const authState = {
    userData: null
}
const authReducer = (state = authState, action) => {
    switch (action.type) {
        case "SET_USER_DATA":
            return { ...state, userData: action.data }
        default:
            return state
    }
}
export default authReducer