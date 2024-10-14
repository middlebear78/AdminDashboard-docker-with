import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography"; // Import Typography
import HomeIcon from "@mui/icons-material/Home";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import PeopleIcon from "@mui/icons-material/People";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../reducers/index";
import { toastify } from "../../../utils/toastify";
import { auth } from "../../../firebase";

interface DrawerListProps {
    open: boolean;
    toggleDrawer: (open: boolean) => () => void;
}

interface ListItemType {
    text: string;
    path?: string;
    icon?: React.ReactNode;
    isHeader?: boolean;
    action?: () => void;
}

const DrawerList: React.FC<DrawerListProps> = ({ open, toggleDrawer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const handleNavigation = (path: string) => {
        navigate(path);
        toggleDrawer(false)();
    };

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                dispatch({ type: "LOGOUT", payload: null });
                toastify.info("You are now logged out.");
                navigate("/");
            })
            .catch((error) => {
                toastify.error("Logout failed: " + error.message);
            });
        toggleDrawer(false)();
    };

    const listItems: ListItemType[] = [
        { text: "Home", path: "/", icon: <HomeIcon /> },
        { text: "Statistics", isHeader: true },
        {
            text: "Vacations",
            path: "/statistics",
            icon: <BeachAccessIcon />,
        },
        { text: "Users", path: "/users", icon: <PeopleIcon /> },
        { text: "Likes", path: "/likes", icon: <ThumbUpIcon /> },
    ];

    const actionItems: ListItemType[] = [
        { text: "Admin", isHeader: true },
        { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
        { text: "About", path: "/about", icon: <InfoIcon /> },
        { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
    ];

    const renderListItems = (items: ListItemType[]) => {
        return items.map(({ text, path, icon, isHeader, action }) => (
            <React.Fragment key={text}>
                {isHeader ? (
                    <ListItem sx={{ padding: "10px" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
                            {text}
                        </Typography>
                        <Divider />
                    </ListItem>
                ) : (
                    <ListItem disablePadding onClick={action ? action : () => path && handleNavigation(path)}>
                        <ListItemButton>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText
                                primary={text}
                                sx={{ fontWeight: "bold", color: "#000000" }} // Apply styles here
                            />
                        </ListItemButton>
                    </ListItem>
                )}
            </React.Fragment>
        ));
    };

    const list = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>{renderListItems(listItems)}</List>
            <Divider />
            <List>{renderListItems(actionItems)}</List>
        </Box>
    );

    return (
        <Drawer open={open} onClose={toggleDrawer(false)} sx={{ "& .MuiDrawer-paper": { backgroundColor: "#f0f0f0" } }}>
            {user?.token && user.role === "Admin" ? (
                list
            ) : (
                <Box sx={{ padding: 2 }}>
                    <ListItem>
                        <ListItemText primary="Please log in as ADMIN to access this section." />
                    </ListItem>
                </Box>
            )}
        </Drawer>
    );
};

export default DrawerList;
