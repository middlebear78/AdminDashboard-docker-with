import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../AuthArea/Login/Login";
import HomeScreen from "../ScreensArea/HomeScreen/HomeScreen";
import { Statistics } from "../../components/ScreensArea/Statistics/Statistics";
import { Vacations } from "../ScreensArea/Vacations/Vacations";
import { Users } from "../ScreensArea/Users/Users";
import { Settings } from "../ScreensArea/Settings/Settings";
import { About } from "../ScreensArea/About/About";

const Routing: React.FC = () => {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/vacations" element={<Vacations />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
};

export default Routing;
