import ReusableTable from "../../../Tools/ReusableTable";
import InfoCard from "../../../Tools/InfoCard";
import { UsersStatistics } from "../../../../service/statisticsService";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface UserStatistics {
    count: number;
    users: any[];
}

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: any) => string;
}

const columns: Column[] = [
    { id: "first_name", label: "First Name", minWidth: 0 },
    { id: "last_name", label: "Last Name", minWidth: 0 },
    {
        id: "email",
        label: "Email",
    },
    {
        id: "role_name",
        label: "Role",
    },
];

interface Row {
    first_name: string;
    last_name: string;
    email: string;
    role_name: string;
}

export function UserStatistics(): JSX.Element {
    const [userStatistics, setUserStatistics] = useState<UserStatistics | null>(null);

    const getUsersStatistics = async (): Promise<void> => {
        try {
            const response = await UsersStatistics();
            setUserStatistics(response.data);
        } catch (err) {
            console.log("Error fetching Statistics", err);
        }
    };

    const getRowsFromUsers = (users: any[]): Row[] => {
        return users.map((user) => ({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role_name: user.role.role_name,
        }));
    };

    const getRoleStatistics = (users: any[]) => {
        let adminCount = 0;
        let userCount = 0;

        users.forEach((user) => {
            if (user.role.role_name === "Admin") {
                adminCount++;
            } else if (user.role.role_name === "User") {
                userCount++;
            }
        });

        return { adminCount, userCount };
    };

    const roleStats = userStatistics ? getRoleStatistics(userStatistics.users) : { adminCount: 0, userCount: 0 };

    useEffect(() => {
        getUsersStatistics();
    }, []);

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", my: 4 }}>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
                <Typography sx={{ mx: 2, whiteSpace: "nowrap" }}>USER STATS</Typography>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 3, 
                    width: "100%",
                }}
            >
                {/* Table Container */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: "300px", 
                    }}
                >
                    <InfoCard
                        head="Number Of Active Users:"
                        body={userStatistics ? userStatistics.count.toString() : "Loading..."}
                    />
                    <ReusableTable
                        columns={columns}
                        rows={userStatistics ? getRowsFromUsers(userStatistics.users) : []}
                    />
                </Box>

                {/* Charts Container */}
                <Box
                    sx={{
                        flex: 1, 
                        display: "flex",
                        justifyContent: "center", 
                        alignItems: "center",
                        minWidth: "300px", 
                    }}
                >
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: roleStats.adminCount, label: "Admins" },
                                    { id: 1, value: roleStats.userCount, label: "Users" },
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                </Box>
            </Box>
        </>
    );
}
