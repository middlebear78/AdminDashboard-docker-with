import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import DrawerList from "../Menu/DrawerList";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers/index";
import { capitalizeFirstLetter } from "../../../utils/tools";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { toastify } from "../../../utils/toastify";

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
}));

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);
    const localUserString = localStorage.getItem("user");
    const localUser = localUserString ? JSON.parse(localUserString) : null;
    if (localUser) {
        console.log(localUser);
        console.log(localUser.role);
    } else {
        console.log("no user in the local storage");
    }

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const menuId = "primary-search-account-menu";

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const handleSettingsClick = () => {
        navigate("/settings");
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogoutClick = () => {
        auth.signOut()
            .then(() => {
                localStorage.removeItem("user");

                dispatch({
                    type: "LOGOUT",
                    payload: null,
                });

                toastify.info("You are Logged Out.");

                navigate("/");
            })
            .catch((error) => {
                console.error("Logout error:", error);
                toastify.error("Error logging out. Please try again.");
            });
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem
                onClick={() => {
                    handleSettingsClick();
                    handleMenuClose();
                }}
            >
                <SettingsIcon sx={{ mr: 1, color: "grey" }} /> Settings
            </MenuItem>
            {localUser?.role === "Admin" ? (
                <MenuItem
                    onClick={() => {
                        handleLogoutClick();
                        handleMenuClose();
                    }}
                >
                    <LoginIcon sx={{ mr: 1, color: "grey" }} /> Logout
                </MenuItem>
            ) : (
                <MenuItem
                    onClick={() => {
                        handleLoginClick();
                        handleMenuClose();
                    }}
                >
                    <LoginIcon sx={{ mr: 1, color: "grey" }} /> Login
                </MenuItem>
            )}
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleMobileMenuClose}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ background: "linear-gradient(to right,#0d47a1, #1e88e5)" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <IconButton component={Link} to="/" size="large" color="inherit" sx={{ mr: 2 }}>
                        <HomeIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            background: "linear-gradient(90deg, rgba(50, 205, 50, 0.8), rgba(50, 205, 50, 0.5))", // Green gradient
                            WebkitBackgroundClip: "text",
                            fontWeight: "400",
                            fontSize: "2rem",
                            fontFamily: "'Kaushan Script', cursive",
                            textShadow: "2px 2px 4px rgba(255, 255, 255, 0.7)",
                            letterSpacing: "0.5px",
                            textDecoration: "none",
                            transition: "0.3s",
                            transform: "translateY(-5px)",
                        }}
                    >
                        Admin's{" "}
                        <span
                            style={{
                                color: "#FFD700",
                                fontSize: "2.5rem",
                                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                                background: "none",
                                borderRadius: "0",
                                padding: "0",
                            }}
                        >
                            K
                        </span>
                        ingDom
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: "none", sm: "block" }, pt: 1 }}
                        >
                            {user?.token && localUser?.role === "Admin" ? (
                                `${user.email && user.email.split("@")[0]}`
                            ) : (
                                <>{"Login here"}</>
                            )}
                        </Typography>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <DrawerList toggleDrawer={toggleDrawer} open={drawerOpen} />
        </Box>
    );
}

export default PrimarySearchAppBar;
