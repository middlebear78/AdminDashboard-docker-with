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
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res: any) => {
                    console.log("CURRENT ADMIN RES", res);
                    setIsAdmin(true);
                })
                .catch((err: any) => {
                    console.log("ADMIN ROUTE ERROR", err);
                    setIsAdmin(false);
                });
        } else {
            setIsAdmin(false);
        }
    }, [user]);

    if (isAdmin === null || !user || !user.token || !isAdmin) {
        return <LoadingToRedirect />;
    }

    return <>{element}</>; // Render the protected element
};

export default AdminPrivateRoute;
