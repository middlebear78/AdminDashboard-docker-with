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

function userReducer(state: UserState = null, action: AnyAction): UserState {
    switch (action.type) {
        case "USER_LOGGED_IN":
            return action.payload as User; // Set user info on login

        case "LOGOUT":
            return null; // Reset state on logout (you can also return {} if you prefer an empty object)

        default:
            return state; // Return current state for unrecognized actions
    }
}

export default userReducer;
