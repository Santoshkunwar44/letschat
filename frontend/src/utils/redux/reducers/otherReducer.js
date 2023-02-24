const otherState = {
    refresh: false,
    searchInput: "",
    searchResult: null,
    showInputOutline: false,
    searchInputRef: null,
    isSessionExpired: false,
    interValId: []
}

const otherReducer = (state = otherState, action) => {
    switch (action.type) {
        case "START_REFRESH":
            return { ...state, refresh: !state.refresh }

        case 'SET_SEARCH_INPUT':
            return { ...state, searchInput: action.data }
        case 'SET_SEARCH_RESULT':
            return { ...state, searchResult: action.data }
        case "SET_SEARCH_INPUT_REF":
            return { ...state, searchInputRef: action.data }
        case "SET_INPUT_OUTLINE":
            return { ...state, showInputOutline: true }
        case "REMOVE_INPUT_OUTLINE":
            return { ...state, showInputOutline: false }
        case "SET_SESSION_EXPIRED":
            return { ...state, isSessionExpired: true }
        case "REMOVE_SESSION_EXPIRED":
            return { ...state, isSessionExpired: false }

        case "ADD_INTERVAL_ID":
            return { ...state, interValId: [...state.interValId, action.data] }

        case "REMOVE_INTERVAL_ID":
            console.log("removing the intervalid id", state.interValId)
            state.interValId.forEach((i) => {
                clearInterval(i)
                console.log("removing the intervalid id", i)
            })
            return { ...state, interValId: [] }

        default:
            return state
    }
}
export default otherReducer