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
                const idTokenResult = await user.getIdTokenResult();
                console.log("user:", user);
                dispatch({
                    type: "USER_LOGGED_IN",
                    payload: {
                        first_name: "ryan",
                    },
                });
            }
        });
        //cleanup
        return unSubscribe();
    }, [dispatch]);

    return (
        <div className="App">
            <ToastContainer
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
