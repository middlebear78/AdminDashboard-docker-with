import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/LayoutArea/Layout/Layout";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // User is signed in, get the token and dispatch the login action
                const idTokenResult = await user.getIdTokenResult();
                console.log("user:", user);
                dispatch({
                    type: "USER_LOGGED_IN",
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                    },
                });
            } else {
                dispatch({
                    type: "LOGOUT",
                });
            }
        });

        // Cleanup subscription when component unmounts
        return () => unSubscribe();
    }, [dispatch]);

    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            dispatch({
                type: "USER_LOGGED_IN",
                payload: userData,
            });
        }
    }, [dispatch]);

    return (
        <div className="App">
            <ToastContainer
                className="custom-toast-container"
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Layout />
        </div>
    );
}

export default App;
