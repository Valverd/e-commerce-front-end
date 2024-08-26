import { combineReducers } from "redux";
import userReducer from "./reducers/user.reducer";
import sideBarReducer from "./reducers/sidebar.reducer";

const rootReducer = combineReducers({
    userReducer,
    sideBarReducer
})

export default rootReducer
