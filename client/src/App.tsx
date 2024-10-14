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
            primary: {
                main: isDarkMode ? "#90caf9" : "#1976d2", // Primary color
            },
            secondary: {
                main: isDarkMode ? "#f48fb1" : "#dc004e", // Secondary color
            },
            background: {
                default: isDarkMode ? "#121212" : "#ffffff", // Background color
                paper: isDarkMode ? "#1e1e1e" : "#f5f5f5", // Paper color
            },
            text: {
                primary: isDarkMode ? "#ffffff" : "#000000", // Primary text color
                secondary: isDarkMode ? "#e0e0e0" : "#555555", // Secondary text color
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontSize: "2rem",
                fontWeight: 700,
                color: isDarkMode ? "#ffffff" : "#333333", // Customize h1 color
            },
            h2: {
                fontSize: "1.5rem",
                fontWeight: 600,
                color: isDarkMode ? "#ffffff" : "#333333", // Customize h2 color
            },
            body1: {
                fontSize: "1rem",
                color: isDarkMode ? "#ffffff" : "#333333", // Customize body text color
            },
            // Add more typography styles as needed
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
                    position="top-center"
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
