import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
    onGoogleLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onGoogleLogin }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(email, password);
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
                    Login
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        Sign In
                    </Button>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", width: "100%", my: 2 }}>
                    <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
                    <Typography sx={{ mx: 2, whiteSpace: "nowrap" }}>OR</Typography>
                    <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
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
                >
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: "red",
                            borderRadius: "20px",
                            "&:hover": { backgroundColor: "darkred" },
                            width: "250px",
                            display: "flex",
                            alignItems: "center",
                        }}
                        startIcon={<GoogleIcon />}
                        onClick={onGoogleLogin}
                    >
                        <Typography variant="body1" sx={{ flexGrow: 1, textAlign: "center" }}>
                            Sign In With Google
                        </Typography>
                    </Button>
                </Box>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Forgot Password?{" "}
                    <Link to="/forgot/password" style={{ textDecoration: "none" }}>
                        <Typography variant="body2" color="primary" component="span">
                            Click Here
                        </Typography>
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default LoginForm;
