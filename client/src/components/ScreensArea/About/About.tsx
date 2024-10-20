import css from "./About.module.css";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import companyOverviewImage from "../../../Assets/images/2.jpg"; // Optional, can be used as a cover image
import uri from "../../../Assets/images/employeesImages/uri.jpg";
import shani from "../../../Assets/images/employeesImages/shani.jpg";
import chris from "../../../Assets/images/employeesImages/chris.jpg";

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

const AboutSection = styled(Box)(({ theme }) => ({
    background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9)), url(${companyOverviewImage})`,
    backgroundSize: "cover",
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    marginBottom: theme.spacing(4),
    maxWidth: "1200px", // Set your desired max width here
    marginLeft: "auto", // Center the section
    marginRight: "auto", // Center the section
}));

export function About(): JSX.Element {
    return (
        <div className={css.About}>
            <div className={css.innerContainer}>
                <AboutSection>
                    <Container>
                        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: "bold", color: "#333" }}>
                            About Us
                        </Typography>

                        <Typography variant="h5" align="center" sx={{ mb: 2, color: "#4CAF50" }}>
                            Welcome to Passport the World
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                            At Passport the World, we believe that travel is not just a journey; it's an experience that
                            broadens horizons, connects cultures, and creates unforgettable memories. Our mission is to
                            make the world more accessible, allowing adventurers and wanderers alike to explore diverse
                            destinations effortlessly.
                        </Typography>

                        <Typography variant="h5" align="center" sx={{ mb: 2, color: "#4CAF50" }}>
                            Our Vision
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                            We envision a world where everyone has the opportunity to explore new places, meet new
                            people, and immerse themselves in different cultures. Whether it’s a sun-soaked beach, a
                            bustling city, or a serene mountain retreat, our goal is to provide a platform that inspires
                            and facilitates global exploration.
                        </Typography>

                        <Typography variant="h5" align="center" sx={{ mb: 2, color: "#4CAF50" }}>
                            What We Do
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                            As the admin team of Passport the World, we are dedicated to ensuring a seamless experience
                            for our users. We manage everything from user accounts to booking processes, ensuring that
                            every detail is taken care of. Our responsibilities include:
                        </Typography>

                        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                            <ul style={{ listStyleType: "disc", marginLeft: 20 }}>
                                <li>
                                    User Support: We prioritize our customers and are always available to assist them
                                    with inquiries and support throughout their journey.
                                </li>
                                <li>
                                    Quality Control: We ensure that all vacation packages meet our high standards,
                                    providing travelers with unique and enriching experiences.
                                </li>
                                <li>
                                    Content Management: Our team curates content that showcases beautiful destinations,
                                    travel tips, and inspiring stories to ignite the wanderlust in every visitor.
                                </li>
                                <li>
                                    Community Engagement: We foster a vibrant community of travelers, encouraging users
                                    to share their experiences and recommendations with others.
                                </li>
                            </ul>
                        </Typography>

                        <Typography variant="h5" align="center" sx={{ mb: 2, color: "#4CAF50" }}>
                            Meet Our Team
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                            Our admin team is made up of passionate travel enthusiasts, each bringing their unique
                            expertise to the table. Together, we work tirelessly to enhance your experience on our
                            platform, ensuring that your journey with Passport the World is smooth and enjoyable.
                        </Typography>

                        <Typography variant="h5" align="center" sx={{ mb: 2, color: "#4CAF50" }}>
                            Join Us on This Adventure
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                            Whether you're planning your next getaway or seeking inspiration for your future travels, we
                            invite you to explore Passport the World. Together, let's embark on a journey of discovery,
                            adventure, and connection.
                        </Typography>

                        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                            Thank you for choosing us as your travel partner. We look forward to helping you explore the
                            wonders of the world!
                        </Typography>
                    </Container>
                </AboutSection>

                {/* Employee Information Section */}
                <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4 }}>
                    Employee Information
                </Typography>
                <Grid container spacing={4}>
                    
                    <Grid item xs={12} sm={6} md={4}>
                        <StyledCard>
                            <CardMedia component="img" height="330" image={uri} alt="Employee 1" />
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

                    
                    <Grid item xs={12} sm={6} md={4}>
                        <StyledCard>
                            <CardMedia component="img" height="330" image={shani} alt="Employee 2" />
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
                            <CardMedia component="img" height="330" image={chris} alt="Employee 3" />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Christopher Klassen
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Position: UX Designer
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
