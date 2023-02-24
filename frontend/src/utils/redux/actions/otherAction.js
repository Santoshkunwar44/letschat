export const ADD_INTERVAL_ID = (id) => (dispatch) => {

    dispatch({ type: "ADD_INTERVAL_ID", data: id })

}
export const REMOVE_INTERVAL_ID = () => (dispatch) => {
    dispatch({ type: "REMOVE_INTERVAL_ID" })

}