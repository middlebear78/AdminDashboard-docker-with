import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import PeopleIcon from "@mui/icons-material/People";
import LoginIcon from "@mui/icons-material/Login"; // Icon for Login
import LogoutIcon from "@mui/icons-material/Logout"; // Icon for Logout
import SettingsIcon from "@mui/icons-material/Settings"; // Icon for Settings

interface DrawerListProps {
    open: boolean;
    toggleDrawer: (open: boolean) => () => void;
}

const DrawerList: React.FC<DrawerListProps> = ({ open, toggleDrawer }) => {
    const list = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {[
                    { text: "Home", icon: <HomeIcon /> },
                    { text: "Statistics", icon: <BarChartIcon /> },
                    { text: "Vacations", icon: <BeachAccessIcon /> },
                    { text: "Users", icon: <PeopleIcon /> },
                ].map(({ text, icon }, index) => (
                    <ListItem key={text} disablePadding>
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
                    { text: "Login", icon: <LoginIcon /> },
                    { text: "Logout", icon: <LogoutIcon /> },
                    { text: "Settings", icon: <SettingsIcon /> },
                ].map(({ text, icon }) => (
                    <ListItem key={text} disablePadding>
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
            {list}
        </Drawer>
    );
};

export default DrawerList;
