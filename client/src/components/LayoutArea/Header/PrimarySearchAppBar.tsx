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
import DrawerList from "../Menu/DrawerList";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers/index";
import { capitalizeFirstLetter } from "../../../utils/tools";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile icon
import SettingsIcon from "@mui/icons-material/Settings"; // Settings icon
import LoginIcon from "@mui/icons-material/Login"; // Login icon
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon

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
    const [drawerOpen, setDrawerOpen] = React.useState(false); // State for drawer

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);

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
        setDrawerOpen(open); // Set drawer state
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
        auth.signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        navigate("/");
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
            <MenuItem onClick={handleProfileClick}>
                {" "}
                <AccountCircleIcon sx={{ mr: 1, color: "grey" }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleSettingsClick}>
                <SettingsIcon sx={{ mr: 1, color: "grey" }} /> Settings
            </MenuItem>

            {!user?.token && (
                <MenuItem onClick={handleLoginClick}>
                    <LoginIcon sx={{ mr: 1, color: "grey" }} /> Login
                </MenuItem>
            )}

            {user?.token && user.role === "Admin" && (
                <MenuItem onClick={handleLogoutClick}>
                    <LogoutIcon sx={{ mr: 1, color: "grey" }} /> Logout
                </MenuItem>
            )}

            {user?.token && user.role !== "Admin" && (
                <MenuItem onClick={handleLoginClick}>
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
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>

            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
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
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
                        Admin's Kingdom
                    </Typography>
                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
                    </Search> */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: "none", sm: "block" }, pt: 1 }}
                        >
                            {user?.token && user.role === "Admin" ? (
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
            <DrawerList open={drawerOpen} toggleDrawer={toggleDrawer} /> {/* Pass the drawer props here */}
        </Box>
    );
}

export default PrimarySearchAppBar;
