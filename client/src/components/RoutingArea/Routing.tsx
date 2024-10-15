import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../AuthArea/Login/Login";
import HomeScreen from "../ScreensArea/HomeScreen/HomeScreen";
import { Statistics } from "../../components/ScreensArea/Statistics/Statistics";
import { Vacations } from "../ScreensArea/Vacations/Vacations";
import { Users } from "../ScreensArea/Users/Users";
import { Settings } from "../ScreensArea/Settings/Settings";
import { About } from "../ScreensArea/About/About";
import AdminPrivateRoute from "../RoutingArea/AdminPrivateRoute";
import { LikeStatistics } from "../ScreensArea/Statistics/LikeStatistics";
import { UserStatistics } from "../ScreensArea/Statistics/UserStatistics";
import NotFound from "../ScreensArea/ErrorsScreen/404NotfoundScreen";

interface RoutingProps {
    toggleTheme: () => void;
}

const Routing: React.FC = () => {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="/statistics" element={<AdminPrivateRoute element={<Statistics />} />} />
                <Route path="/likes" element={<AdminPrivateRoute element={<LikeStatistics />} />} />
                <Route path="/vacations" element={<Vacations />} />
                <Route path="/users" element={<AdminPrivateRoute element={<UserStatistics />} />} />
                <Route path="/settings" element={<AdminPrivateRoute element={<Settings />} />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default Routing;
