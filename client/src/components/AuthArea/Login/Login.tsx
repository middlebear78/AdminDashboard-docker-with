import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "../../../firebase";
// import { createOrUpdateUser } from "../../../service/CurrentUserService/UserService";
import LoginForm from "../../Forms/LoginForm";
// import { RootState } from "../../../models/user";
import { toastify } from "../../../utils/toastify";

const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    // const { user } = useSelector((state: RootState) => ({ ...state }));
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (user?.token) navigate("/");
    // }, [user, navigate]);

    const handleLogin = async (email: string, password: string) => {
        // setLoading(true);
        // try {
        //     const result = await signInWithEmailAndPassword(auth, email, password);
        //     const idTokenResult = await result.user.getIdTokenResult();
        //     const res = await createOrUpdateUser(idTokenResult.token);
        //     // dispatch user login action here
        //     console.log(res);
        // } catch (error: any) {
        //     console.error("Login failed:", error.message);
        //     toastify.error(error.message);
        // } finally {
        //     setLoading(false);
        // }
    };

    const handleGoogleLogin = () => {
        // Google login logic here
        console.log("Google login");
    };

    const handleFacebookLogin = () => {
        // Facebook login logic here
        console.log("Facebook login");
    };

    return <LoginForm onSubmit={handleLogin} onGoogleLogin={handleGoogleLogin} onFacebookLogin={handleFacebookLogin} />;
};

export default Login;
