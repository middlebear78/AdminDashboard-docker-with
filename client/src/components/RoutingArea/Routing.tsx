import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../AuthArea/Login/Login";
import HomeScreen from "../ScreensArea/HomeScreen/HomeScreen";
import { Statistics } from "../../components/ScreensArea/Statistics/Statistics";
const Routing: React.FC = () => {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </div>
    );
};

export default Routing;
