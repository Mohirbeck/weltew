import { combineReducers } from "redux";

// Import all reducers
import mainBanners from "./mainBanners";

const reducers = combineReducers({
    mainBanners: mainBanners
})

export default reducers;