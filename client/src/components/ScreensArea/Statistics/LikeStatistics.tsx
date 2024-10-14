import css from "./Statistics.module.css";
import ReusableTable from "../../Tools/ReusableTable";
import InfoCard from "../../Tools/InfoCard";
import { LikesStatistics } from "../../../service/statisticsService";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

interface LikeStatistic {
    country: string;
    likes: number;
}

interface LikeStatistics {
    likes_by_country: LikeStatistic[]; // Ensure this matches your API structure
}

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: any) => string;
}

const columns: Column[] = [
    { id: "country", label: "Country", minWidth: 0 },
    { id: "likes", label: "Likes", minWidth: 0 },
];

interface Row {
    country: string;
    likes: number;
}

export function LikeStatistics(): JSX.Element {
    const [likesStatistics, setLikesStatistics] = useState<LikeStatistics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const getLikesStatistics = async (): Promise<void> => {
        try {
            const response = await LikesStatistics();
            console.log(response.data); // Verify the structure of the response
            setLikesStatistics(response.data); // Ensure this has the correct structure
            setLoading(false);
        } catch (err) {
            console.log("Error fetching Statistics", err);
            setError(true);
            setLoading(false);
        }
    };

    const getRowsFromLikes = (items: LikeStatistic[] | undefined): Row[] => {
        if (!items) return []; // Return an empty array if items is undefined
        return items.map((item) => ({
            country: item.country,
            likes: item.likes,
        }));
    };

    useEffect(() => {
        getLikesStatistics();
    }, []);

    // **NEW**: Handle loading and error states
    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error fetching statistics.</div>; // Show error state
    }

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", my: 4 }}>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
                <Typography sx={{ mx: 2, whiteSpace: "nowrap" }}>LIKE STATS</Typography>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
            </Box>

            <div className={css.Statistics}>
                <div className={css.tableContainer}>
                    <InfoCard head="Total Likes for Each Country:" body="" />
                    <ReusableTable columns={columns} rows={getRowsFromLikes(likesStatistics?.likes_by_country)} />
                </div>
            </div>
        </>
    );
}
