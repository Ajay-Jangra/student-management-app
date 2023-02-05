import { combineReducers } from "redux";
import userReducer from "./userSlice.js";
 

const rootReducer =  combineReducers({
    user: userReducer,
});

export default  rootReducer;
