import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import image1 from "../../../Assets/images/404_images/2.jpg";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box component="img" src={image1} alt="404 Not Found" sx={{ width: "100%", maxWidth: 400, mb: 4 }} />

                <Typography variant="h1" component="div" color="primary" sx={{ fontWeight: "bold" }}>
                    404
                </Typography>
                <Typography variant="h4" color="textSecondary" sx={{ mb: 2 }}>
                    Oops! Page Not Found
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                    The page you're looking for doesn't exist or has been moved.
                </Typography>

                <Button variant="contained" color="primary" onClick={goHome}>
                    Go to Homepage
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;
