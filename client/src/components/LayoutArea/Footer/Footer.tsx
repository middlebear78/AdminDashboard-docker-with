

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
                            1234 Vacation Lane, Suite 567, Gedera, israel Phone: (123) 456-7890
                            Email: contact@passportTw.com
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Useful Links</Typography>
                        <Link href="#" variant="body2" display="block">
                            Home
                        </Link>
                        <Link href="#" variant="body2" display="block">
                            Login
                        </Link>
                        <Link href="#" variant="body2" display="block">
                            Settings
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
                        <Link color="inherit" href="https://passportTw.com/">
                            passport the world
                        </Link>{" "}
                        {new Date().getFullYear()}.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
