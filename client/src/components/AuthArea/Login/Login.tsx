import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth, googleAuthProvider } from "../../../firebase";
import createOrUpdateUser from "../../../service/authService";
import LoginForm from "../../Forms/LoginForm";
import { RootState } from "../../../reducers/index";
import { toastify } from "../../../utils/toastify";

const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const facebookProvider = new FacebookAuthProvider();
    const user = useSelector((state: RootState) => state.user);

    // useEffect(() => {
    //     if (user?.token) navigate("/");
    // }, [user, navigate]);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log(result); // Log the Firebase sign-in result
            const user = result.user;
            const idTokenResult = await user.getIdTokenResult();

            const res = await createOrUpdateUser(idTokenResult.token);
            if (!res || !res.user_info) {
                toastify.error("Failed to retrieve user information. Please try again.");
                return; // Exit early to prevent further execution
            }

            console.log("User Info:", res.user_info); // Log the user_info specifically

            const { user_id, first_name, last_name, email: userEmail, role } = res.user_info;

            dispatch({
                type: "USER_LOGGED_IN",
                payload: {
                    user_id,
                    first_name,
                    last_name,
                    email: userEmail, // Firebase user email
                    role: role === 2 ? "Admin" : "User",
                    token: idTokenResult.token, // Firebase token
                },
            });

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

            dispatch({
                type: "USER_LOGGED_IN",
                payload: {
                    user_id,
                    first_name,
                    last_name,
                    email: userEmail, // Firebase user email
                    role: role === 2 ? "Admin" : "User",
                    token: idTokenResult.token, // Firebase token
                },
            });

            navigate("/");
            toastify.success(`Welcome ${role === 2 ? "Admin" : "User"}, You are currently logged in.`);
        } catch (error: any) {
            console.log(error);
            toastify.error(error.message || "An error has occurred while trying to log in with Google.");
        } finally {
            setLoading(false);
        }
    };

    const handleFacebookLogin = async () => {
        // setLoading(true);
        // try {
        //     console.log("Logging in with Facebook");
        //     const result = await signInWithPopup(auth, facebookProvider);
        //     const user = result.user;
        //     const idTokenResult = await user.getIdTokenResult();
        //     const res = await createOrUpdateUser(idTokenResult.token);
        //     const { user_id, first_name, last_name, email: userEmail, role } = res.user_info;
        //     dispatch({
        //         type: "USER_LOGGED_IN",
        //         payload: {
        //             user_id,
        //             first_name,
        //             last_name,
        //             email: userEmail,
        //             role: role === 2 ? "Admin" : "User",
        //             token: idTokenResult.token,
        //         },
        //     });
        //     navigate("/");
        //     toastify.success("Welcome Admin, You are currently logged in with Facebook.");
        // } catch (error: any) {
        //     console.log(error);
        //     toastify.error(error.message || "An error has occurred while trying to log in with Facebook.");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <LoginForm
                    onSubmit={handleLogin}
                    onGoogleLogin={handleGoogleLogin}
                    onFacebookLogin={handleFacebookLogin}
                />
            )}
        </>
    );
};

export default Login;
