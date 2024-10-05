import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth, googleAuthProvider } from "../../../firebase";
import createOrUpdateUser from "../../../service/authService";
import LoginForm from "../../Forms/LoginForm";
import { RootState } from "../../../reducers/index";
import { toastify } from "../../../utils/toastify";
import axios from "axios";
import { error } from "console";

const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const facebookProvider = new FacebookAuthProvider();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (user?.token) navigate("/");
    }, [user, navigate]);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log(result);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    // console.log(res);
                    const { user_id, first_name, last_name, email, role } = res.user_info;

                    dispatch({
                        type: "USER_LOGGED_IN",
                        payload: {
                            user_id,
                            first_name,
                            last_name,
                            email: user.email, //  Firebase user email
                            role: role === 2 ? "Admin" : "User",
                            token: idTokenResult.token, //fireBase token
                        },
                    });
                })
                .catch((error) => console.log("Error:", error.message));

            navigate("/");
            toastify.success("Welcome Admin, You are currently logged in.");
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

            createOrUpdateUser(idTokenResult.token)
                .then((res) => console.log("Create or update res", res))
                .catch((error) => console.log("Error:", error.message));

            dispatch({
                type: "USER_LOGGED_IN",
                payload: {
                    email: user.email,
                    token: idTokenResult.token,
                },
            });
            navigate("/");
            toastify.success("Welcome Admin, You are currently logged in with Google.");
        } catch (error: any) {
            console.log(error);
            toastify.error(error.message || "An error has occurred while trying to log with google account.");
        } finally {
            setLoading(false);
        }
    };

    const handleFacebookLogin = async () => {
        setLoading(true);
        try {
            console.log("Logging in with facebook ");
            //     const result = await signInWithPopup(auth, facebookProvider);
            //     const user = result.user;
            //     const idTokenResult = await user.getIdTokenResult();
            //     dispatch({
            //         type: "USER_LOGGED_IN",
            //         payload: {
            //             email: user.email,
            //             token: idTokenResult.token,
            //         },
            //     });
            //     navigate("/");
            //     toastify.success("Welcome Admin, You are currently logged in with Facebook.");
        } catch (error: any) {
            // console.log(error);
            // toastify.error(error.message || "An error has occurred while trying to log with Facebook account.");
        } finally {
            setLoading(false);
        }
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
