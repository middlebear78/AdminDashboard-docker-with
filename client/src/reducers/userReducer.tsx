import { AnyAction } from "@reduxjs/toolkit";

interface User {
    first_name: string;
    last_name: string;
    email: string;
    id: string;
    token: string;
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
