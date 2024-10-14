import css from "./Statistics.module.css";
import ReusableTable from "../../Tools/ReusableTable";
import InfoCard from "../../Tools/InfoCard";
import { UsersStatistics } from "../../../service/statisticsService";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { BarChart } from "@mui/x-charts/BarChart";
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
        label: "email",
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
            console.log(userStatistics);
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

            <div className={css.Statistics}>
                <div className={css.tableContainer}>
                    <InfoCard
                        head="Number Of Active Users:"
                        body={userStatistics ? userStatistics.count.toString() : "Loading..."}
                    />
                    <ReusableTable
                        columns={columns}
                        rows={userStatistics ? getRowsFromUsers(userStatistics.users) : []}
                    />
                </div>
            </div>
            <div className={css.chartsStatistics}>
                <div className={css.chartsContainer}>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: "series A" },
                                    { id: 1, value: 15, label: "series B" },
                                    { id: 2, value: 20, label: "series C" },
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                </div>
                <div className={css.chartsContainer}>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        width={500}
                        height={300}
                    />
                </div>
            </div>
        </>
    );
}
