import React, { createContext, useContext, useState, useEffect } from "react";
import createOrUpdateUser from "../service/authService";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Check for token in localStorage on initial render
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            // Optionally verify the token with the server
            createOrUpdateUser(token)
                .then(() => setIsAuthenticated(true))
                .catch(() => setIsAuthenticated(false));
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem("authToken", token); // Store token in localStorage
        setIsAuthenticated(true); // Update the authentication state
    };

    const logout = () => {
        localStorage.removeItem("authToken"); // Remove token from localStorage
        setIsAuthenticated(false); // Update the authentication state
    };

    return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
