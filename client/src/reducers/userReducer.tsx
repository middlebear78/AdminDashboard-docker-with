import { AnyAction } from "@reduxjs/toolkit";

interface User {
    id: string;  
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    role: string;
}

type UserState = User | null;

function userReducer(state: UserState = null, action: AnyAction) {
    switch (action.type) {
        case "USER_LOGGED_IN":
            return action.payload as User;

        case "LOGOUT":
            return action.payload;

        default:
            return state;
    }
}

export default userReducer;
