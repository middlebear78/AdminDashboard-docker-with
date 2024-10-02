import css from "./Footer.module.css";

import React from "react";
import { Box, Typography, Grid, Link, Container } from "@mui/material";

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                py: 3,
                px: 2,
                mt: "auto",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">About Us</Typography>
                        <Typography variant="body2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Useful Links</Typography>
                        <Link href="#" variant="body2" display="block">
                            Home
                        </Link>
                        <Link href="#" variant="body2" display="block">
                            Contact
                        </Link>
                        <Link href="#" variant="body2" display="block">
                            Services
                        </Link>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Follow Us</Typography>
                        <Link href="#" variant="body2" display="block">
                            Facebook
                        </Link>
                        <Link href="#" variant="body2" display="block">
                            Twitter
                        </Link>
                        <Link href="#" variant="body2" display="block">
                            Instagram
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {"Copyright © "}
                        <Link color="inherit" href="https://yourwebsite.com/">
                            Your Website
                        </Link>{" "}
                        {new Date().getFullYear()}.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
