import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect: React.FC = () => {
    const [count, setCount] = useState<number>(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((current: number) => {
                if (current === 1) {
                    clearInterval(interval);
                    navigate("/login");
                }
                return current - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div>
            <p>Redirecting in {count} seconds...</p>
        </div>
    );
};

export default LoadingToRedirect;
