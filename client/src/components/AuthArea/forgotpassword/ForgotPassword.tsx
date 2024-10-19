import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../../firebase";
import { toastify } from "../../../utils/toastify";
import { RootState } from "../../../reducers/index";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const actionCodeSettings = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL || "",
            handleCodeInApp: true,
        };

        try {
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            toastify.success(`Password reset email sent successfully to ${email}`);
            navigate("/login");
        } catch (error) {
            toastify.error("Failed to send password reset email. Please try again.");
            console.error("Error sending password reset email:", error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 8,
                    p: 2,
                    borderRadius: 1,
                    boxShadow: 3,
                }}
            >
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            mt: 3,
                            mb: 2,
                        }}
                    >
                        Send Password Reset Email
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 2,
                        width: "100%",
                        alignItems: "center",
                    }}
                ></Box>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
