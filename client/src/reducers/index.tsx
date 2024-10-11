import { combineReducers } from "redux";
import userReducer from "./userReducer";
import themeReducer from "./themeSlice"; 

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
