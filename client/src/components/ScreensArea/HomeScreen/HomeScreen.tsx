import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { styled } from "@mui/system";

import companyOverviewImage from "../../../Assets/images/2.jpg";

const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
}));

const HomeScreen: React.FC = () => {
    return (
        <Container sx={{ py: 4 }}>
            {/* Hero Section with Image */}
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to PassPort The World Admin's Dashboard
            </Typography>
            <Box textAlign="center" sx={{ mb: 4 }}>
                <img src={companyOverviewImage} alt="Company Overview" style={{ width: "100%", borderRadius: "8px" }} />
            </Box>
            <Typography variant="h6" align="center" sx={{ mb: 4 }}>
                Here you can manage employee data and access important resources.
            </Typography>
        </Container>
    );
};

export default HomeScreen;
