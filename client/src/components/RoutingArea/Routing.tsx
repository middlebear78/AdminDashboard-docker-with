import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../AuthArea/Login/Login";
import HomeScreen from "../ScreensArea/HomeScreen/HomeScreen";
import { Statistics } from "../../components/ScreensArea/Statistics/Statistics";
import { Users } from "../ScreensArea/Users/Users";
import { Settings } from "../ScreensArea/Settings/Settings";
import { About } from "../ScreensArea/About/About";
import AdminPrivateRoute from "../RoutingArea/AdminPrivateRoute";
import { LikeStatistics } from "../ScreensArea/Statistics/LikeStatistics";
import { UserStatistics } from "../ScreensArea/Statistics/UserStatistics";
import NotFound from "../ScreensArea/ErrorsScreen/404NotfoundScreen";
import { useAuth } from "../../context/AuthContext";

const Routing: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={isAuthenticated ? <HomeScreen /> : <Login />} />

                {/* Protect these routes with AdminPrivateRoute */}
                <Route path="/statistics" element={<AdminPrivateRoute element={<Statistics />} />} />
                <Route path="/likes" element={<AdminPrivateRoute element={<LikeStatistics />} />} />
                <Route path="/users" element={<AdminPrivateRoute element={<UserStatistics />} />} />
                <Route path="/settings" element={<AdminPrivateRoute element={<Settings />} />} />
                <Route path="/about" element={<About />} />

                {/* 404 Not Found Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default Routing;
