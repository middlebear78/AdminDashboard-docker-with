import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../AuthArea/Login/Login";
import HomeScreen from "../ScreensArea/HomeScreen/HomeScreen";
import { VacationStatistics } from "../ScreensArea/Statistics/vacationStatistics/VacationStatistics";
import { Users } from "../ScreensArea/Users/Users";
import { Settings } from "../ScreensArea/Settings/Settings";
import { About } from "../ScreensArea/About/About";
import AdminPrivateRoute from "../RoutingArea/AdminPrivateRoute";
import { LikeStatistics } from "../ScreensArea/Statistics/likeStatistics/LikeStatistics";
import { UserStatistics } from "../ScreensArea/Statistics/usersStatistics/UserStatistics";
import NotFound from "../ScreensArea/ErrorsScreen/404NotfoundScreen";
import { useAuth } from "../../context/AuthContext";
import ForgotPassword from "../AuthArea/forgotpassword/ForgotPassword";

const Routing: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={isAuthenticated ? <HomeScreen /> : <Login />} />
                <Route path="/forgot/password" element={<ForgotPassword />} />
                <Route path="/about" element={<About />} />

                {/* Protected  with admin private route */}
                <Route path="/statistics" element={<AdminPrivateRoute element={<VacationStatistics />} />} />
                <Route path="/likes" element={<AdminPrivateRoute element={<LikeStatistics />} />} />
                <Route path="/users" element={<AdminPrivateRoute element={<UserStatistics />} />} />
                <Route path="/settings" element={<AdminPrivateRoute element={<Settings />} />} />

                {/* {/* 404 NotFound  /} */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default Routing;
