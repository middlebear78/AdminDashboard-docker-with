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
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import PeopleIcon from "@mui/icons-material/People";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../reducers/index";

interface DrawerListProps {
    open: boolean;
    toggleDrawer: (open: boolean) => () => void;
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
        // Dispatch your logout action here
        // Example: dispatch(logout());
        navigate("/"); // Redirect to home or login after logout
        toggleDrawer(false)();
    };

    const list = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {[
                    { text: "Home", path: "/", icon: <HomeIcon /> },
                    { text: "Statistics", path: "/statistics", icon: <BarChartIcon /> },
                    { text: "Vacations", path: "/vacations", icon: <BeachAccessIcon /> },
                    { text: "Users", path: "/users", icon: <PeopleIcon /> },
                ].map(({ text, path, icon }) => (
                    <ListItem key={text} disablePadding onClick={() => handleNavigation(path)}>
                        <ListItemButton>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {[
                    { text: "Logout", path: "/", icon: <LogoutIcon />, action: handleLogout },
                    { text: "About", path: "/about", icon: <InfoIcon /> },
                    { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
                ].map(({ text, icon, path, action }) => (
                    <ListItem key={text} disablePadding onClick={action ? action : () => handleNavigation(path)}>
                        <ListItemButton>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {user?.token ? (
                list
            ) : (
                <Box sx={{ padding: 2 }}>
                    <ListItem>
                        <ListItemText primary="Please log in to access this section." />
                    </ListItem>
                </Box>
            )}
        </Drawer>
    );
};

export default DrawerList;
