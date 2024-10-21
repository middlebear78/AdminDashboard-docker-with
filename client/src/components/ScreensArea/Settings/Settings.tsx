import React from "react";
import { Card, CardContent, Button, Typography, Stack, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store"; // Adjust the import path as necessary
import css from "./Settings.module.css";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

export function Settings(): JSX.Element {
    const userInfo = useSelector((state: RootState) => state.user); // Get user info from Redux
    const navigate = useNavigate();

    const handleResetPassword = () => {
        console.log("Password reset triggered.");
        navigate("/forgot/password");
    };

    return (
        <div className={css.Settings}>
            <Card
                sx={{
                    maxWidth: 600,
                    margin: "auto",
                    marginTop: 4,
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
                    borderRadius: 3,
                    padding: 3,
                    backgroundColor: "#f9f9f9",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.02)",
                    },
                }}
            >
                <CardContent>
                    {/* Title */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            marginBottom: 3,
                            textAlign: "center",
                            color: "#1976d2",
                        }}
                    >
                        User Information
                    </Typography>

                    {/* User Info Blocks */}
                    <Stack spacing={2} marginBottom={3}>
                        {/* First Name */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: 2,
                                borderRadius: 2,
                                backgroundColor: "#e3f2fd",
                                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                            }}
                        >
                            <PersonIcon sx={{ color: "#1976d2", marginRight: 2 }} />
                            <Typography>
                                <strong>First Name:</strong> {userInfo?.first_name || "N/A"}
                            </Typography>
                        </Box>

                        {/* Last Name */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: 2,
                                borderRadius: 2,
                                backgroundColor: "#e3f2fd",
                                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                            }}
                        >
                            <PersonIcon sx={{ color: "#1976d2", marginRight: 2 }} />
                            <Typography>
                                <strong>Last Name:</strong> {userInfo?.last_name || "N/A"}
                            </Typography>
                        </Box>

                        {/* Email */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: 2,
                                borderRadius: 2,
                                backgroundColor: "#e3f2fd",
                                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                            }}
                        >
                            <EmailIcon sx={{ color: "#1976d2", marginRight: 2 }} />
                            <Typography>
                                <strong>Email:</strong> {userInfo?.email || "N/A"}
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Action Button */}
                    <Box sx={{ textAlign: "center", marginTop: 3 }}>
                        <Button
                            variant="contained"
                            color="error"
                            size="large"
                            onClick={handleResetPassword}
                            sx={{
                                padding: "10px 20px",
                                fontWeight: "bold",
                                boxShadow: "0 4px 12px rgba(255, 0, 0, 0.3)",
                                "&:hover": {
                                    backgroundColor: "#d32f2f",
                                },
                            }}
                        >
                            Reset Password
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}
