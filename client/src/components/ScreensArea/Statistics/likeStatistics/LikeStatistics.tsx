import css from "./LikeStatistics.module.css";
import ReusableTable from "../../../Tools/ReusableTable";
import InfoCard from "../../../Tools/InfoCard";
import { LikesStatistics } from "../../../../service/statisticsService";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface LikeStatistic {
    country: string;
    likes: number;
}

interface LikeStatistics {
    likes_by_country: LikeStatistic[];
}

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: any) => string;
}

const columns: Column[] = [
    { id: "destination", label: "Destination", minWidth: 0 },
    { id: "likes", label: "Likes", minWidth: 0 },
];

interface Row {
    destination: string;
    likes: number;
}

export function LikeStatistics(): JSX.Element {
    const [likesStatistics, setLikesStatistics] = useState<LikeStatistics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const getLikesStatistics = async (): Promise<void> => {
        try {
            const response = await LikesStatistics();
            console.log(response.data);
            setLikesStatistics(response.data);
            setLoading(false);
        } catch (err) {
            console.log("Error fetching Statistics", err);
            setError(true);
            setLoading(false);
        }
    };

    const getRowsFromLikes = (items: LikeStatistic[] | undefined): Row[] => {
        if (!items) return [];
        return items.map((item) => ({
            destination: item.country,
            likes: item.likes,
        }));
    };

    const calculateLikesPercentages = (): { [key: string]: number } => {
        if (!likesStatistics || !likesStatistics.likes_by_country) return {};

        const totalLikes = likesStatistics.likes_by_country.reduce((sum, item) => sum + item.likes, 0);

        if (totalLikes === 0) return {};

        return likesStatistics.likes_by_country.reduce((percentages, item) => {
            percentages[item.country] = (item.likes / totalLikes) * 100;
            return percentages;
        }, {} as { [key: string]: number });
    };

    const getBarChartData = (): { country: string; percentage: number }[] => {
        return Object.entries(calculateLikesPercentages()).map(([country, percentage]) => ({
            country,
            percentage,
        }));
    };

    useEffect(() => {
        getLikesStatistics();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching statistics.</div>;
    }

    const barChartData = getBarChartData();
    const totalLikes = likesStatistics?.likes_by_country.reduce((sum, item) => sum + item.likes, 0) || 0;

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", my: 4 }}>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
                <Typography sx={{ mx: 2, whiteSpace: "nowrap" }}>LIKE STATS</Typography>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
            </Box>

            <div className={css.Statistics}>
                <div className={css.topContainer}>
                    <div className={css.tableContainer}>
                        <InfoCard head="Total Likes for all Vacations:" body={totalLikes.toString()} />
                    </div>
                    <div className={css.tableContainer}>
                        <InfoCard head="Total Likes for Each Destination:" body="" />
                        <ReusableTable columns={columns} rows={getRowsFromLikes(likesStatistics?.likes_by_country)} />
                    </div>
                </div>

                <div className={css.likechartsContainer}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={barChartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="country" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="percentage" barSize={40}>
                                {barChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill="#82ca9d" />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}
