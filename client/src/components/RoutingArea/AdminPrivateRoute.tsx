import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../RoutingArea/LoadingRedirect";
import { currentAdmin } from "../../service/authService";
import { RootState } from "../../reducers";

interface AdminPrivateRouteProps {
    element: React.ReactNode;
}

const AdminPrivateRoute: React.FC<AdminPrivateRouteProps> = ({ element }) => {
    const { user } = useSelector((state: RootState) => state); // Assuming your user state is defined in RootState
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const userDataString = localStorage.getItem("user"); // Get user data from local storage
        if (userDataString) {
            const userData = JSON.parse(userDataString); // Parse the JSON string

            if (userData.role === "Admin" && userData.token) {
                currentAdmin(userData.token)
                    .then((res: any) => {
                        console.log("CURRENT ADMIN RES", res);
                        setIsAdmin(true); // If admin check passes
                    })
                    .catch((err: any) => {
                        console.log("ADMIN ROUTE ERROR", err);
                        setIsAdmin(false); // If admin check fails
                    });
            } else {
                setIsAdmin(false); // No token available
            }
        } else {
            setIsAdmin(false); // No user data in local storage
        }
    }, [user]);

    if (isAdmin === null || !isAdmin) {
        return <LoadingToRedirect />; // Redirect loading state
    }

    return <>{element}</>; // Render the protected element if admin
};

export default AdminPrivateRoute;
