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

            {/* Employee Information Section */}
            <Typography variant="h5" align="center" gutterBottom>
                Employee Information
            </Typography>
            <Grid container spacing={4}>
                {/* Employee Card 1 */}
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://via.placeholder.com/150.png?text=Employee+1"
                            alt="Employee 1"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Uri Shamir
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Position: Software Engineer
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>

                {/* Employee Card 2 */}
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://via.placeholder.com/150.png?text=Employee+2"
                            alt="Employee 2"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Shani Netzer
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Position: Project Manager
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>

                {/* Employee Card 3 */}
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://via.placeholder.com/150.png?text=Employee+3"
                            alt="Employee 3"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                christopher Klassen
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Position: UX Designer
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomeScreen;
