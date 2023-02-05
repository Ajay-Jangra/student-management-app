 
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice.js";
import rootReducer from './reducers/index.js'


export default configureStore({
    reducer: {
        user: userReducer,
        reducer:rootReducer,
    },
});
 