// src/components/ScreensArea/Settings/Settings.tsx
import React from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../reducers/themeSlice"; // Adjust the import path as necessary
import { RootState } from "../../../store"; // Adjust the import path as necessary
import css from "./Settings.module.css";

// Define user info interface
interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
}

export function Settings(): JSX.Element {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode); // Get theme state from Redux
    const userInfo = useSelector((state: RootState) => state.user); // Get user info from Redux

    const handleToggleTheme = () => {
        dispatch(toggleTheme()); // Dispatch action to toggle theme
    };

    return (
        <div className={css.Settings}>
            <Card>
                <CardContent>
                    <Typography variant="h5">User Info</Typography>
                    <Typography>
                        <strong>First Name:</strong> {userInfo?.first_name || "N/A"}
                    </Typography>
                    <Typography>
                        <strong>Last Name:</strong> {userInfo?.last_name || "N/A"}
                    </Typography>
                    <Typography>
                        <strong>Email:</strong> {userInfo?.email || "N/A"}
                    </Typography>
                    <Button variant="contained" onClick={handleToggleTheme} sx={{ marginTop: 2 }}>
                        Switch to {isDarkMode ? "Light" : "Dark"} Mode
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
