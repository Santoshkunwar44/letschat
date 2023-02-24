import { combineReducers } from "redux";
import socketReducer from "./reducers/socketReducer";
import authReducer from "./reducers/authReducer";
import otherReducer from "./reducers/otherReducer";

export const reducers = combineReducers({ socketReducer, authReducer, otherReducer })
