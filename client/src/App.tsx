import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/LayoutArea/Layout/Layout";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Settings } from "./components/ScreensArea/Settings/Settings";
import { toggleTheme } from "./reducers/themeSlice";
import { RootState } from "./store";

function App() {
    const dispatch = useDispatch();

    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const theme = createTheme({
        palette: {
            mode: isDarkMode ? "dark" : "light",
        },
    });

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                console.log("user:", user);
                dispatch({
                    type: "USER_LOGGED_IN",
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                    },
                });
            }
        });
        // Cleanup subscription
        return () => unSubscribe();
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
        </ThemeProvider>
    );
}

export default App;
