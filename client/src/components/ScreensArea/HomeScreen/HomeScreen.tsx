import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import companyOverviewImage from "../../../Assets/images/2.jpg";
import companyOverviewImage2 from "../../../Assets/images/10.jpg";
import companyOverviewImage3 from "../../../Assets/images/11.jpg";
import companyOverviewImage4 from "../../../Assets/images/12.jpg";

const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
        transform: "scale(1.05)", // Scale up on hover
        boxShadow: theme.shadows[10], // Add shadow effect
    },
}));

const HomeScreen: React.FC = () => {
    return (
        <Container sx={{ py: 4, backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
            {/* hero section */}
            <Typography variant="h4" align="center" gutterBottom sx={{ color: "#4A4A4A", fontWeight: "bold" }}>
                Welcome to PassPort The World Admin's Dashboard
            </Typography>
            <Box textAlign="center" sx={{ mb: 4 }}>
                <img
                    src={companyOverviewImage}
                    alt="Company Overview"
                    style={{
                        width: "100%",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                />
            </Box>
            <Typography variant="h6" align="center" sx={{ mb: 4, color: "#6c757d" }}>
                Here you can manage employee data and access important resources.
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            height="140"
                            image={companyOverviewImage4}
                            alt="Employee Management"
                        />
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: "#4A4A4A" }}>
                                Employee Management
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Manage employee profiles, attendance, and payroll efficiently.
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardMedia component="img" height="140" image={companyOverviewImage2} alt="Resource Access" />
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: "#4A4A4A" }}>
                                Resource Access
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Access important resources and documentation easily.
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            height="140"
                            image={companyOverviewImage3} // Replace with actual image for the card
                            alt="Employee Management"
                        />
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: "#4A4A4A" }}>
                                Products Management
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Manage Vacation products efficiently.
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomeScreen;
