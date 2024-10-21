import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../../firebase";
import createOrUpdateUser from "../../../service/authService";
import LoginForm from "../../Forms/LoginForm";
import { RootState } from "../../../reducers/index";
import { toastify } from "../../../utils/toastify";
import { User } from "../../../types/index";

const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.user);

    // useEffect(() => {
    //     if (user?.token) navigate("/");
    // }, [user, navigate]);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log(result);
            const user = result.user;
            const idTokenResult = await user.getIdTokenResult();

            const res = await createOrUpdateUser(idTokenResult.token);
            if (!res || !res.user_info) {
                toastify.error("Failed to retrieve user information. Please try again.");
                return;
            }

            console.log("User Info:", res.user_info);

            const { user_id, first_name, last_name, email: userEmail, role } = res.user_info;

            const userData: User = {
                user_id,
                first_name,
                last_name,
                email: userEmail,
                role: role === 2 ? "Admin" : "User",
                token: idTokenResult.token,
            };

            dispatch({
                type: "USER_LOGGED_IN",
                payload: userData,
            });

            localStorage.setItem("user", JSON.stringify(userData));

            navigate("/");
            toastify.success(`Welcome ${role === 2 ? "Admin" : "User"}, You are currently logged in.`);
        } catch (error: any) {
            console.log(error);
            toastify.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;
            const idTokenResult = await user.getIdTokenResult();

            const res = await createOrUpdateUser(idTokenResult.token);
            const { user_id, first_name, last_name, email: userEmail, role } = res.user_info;

            console.log("Fetched role from response:", role);

            const userData: User = {
                user_id,
                first_name,
                last_name,
                email: userEmail,
                role: role === 2 ? "Admin" : "User",
                token: idTokenResult.token,
            };

            console.log("User data before saving to local storage:", userData); // Log userData
            dispatch({
                type: "USER_LOGGED_IN",
                payload: userData,
            });

            localStorage.setItem("user", JSON.stringify(userData));

            navigate("/");
            toastify.success(`Welcome ${role === 2 ? "Admin" : "User"}, You are currently logged in.`);
        } catch (error: any) {
            console.log(error);
            toastify.error(error.message || "An error has occurred while trying to log in with Google.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>{loading ? <h2>Loading...</h2> : <LoginForm onSubmit={handleLogin} onGoogleLogin={handleGoogleLogin} />}</>
    );
};

export default Login;
