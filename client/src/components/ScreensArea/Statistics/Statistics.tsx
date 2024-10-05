import css from "./Statistics.module.css";
import ReusableTable from "../../Tools/ReusableTable";
import InfoCard from "../../Tools/InfoCard";
import { VacationsStatistics } from "../../../service/statisticsService";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

interface VacationStatistics {
    past_due: {
        count: number;
        vacations: any[];
    };
    ongoing: {
        count: number;
        vacations: any[];
    };
    future: {
        count: number;
        vacations: any[];
    };
}

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: any) => string;
}

const columns: Column[] = [
    { id: "name", label: "Name", minWidth: 0 },
    { id: "country", label: "Country", minWidth: 0 },
    {
        id: "start_date",
        label: "Start Date",
        // minWidth: 0,
        // align: "left",
        format: (value: string) => new Date(value).toLocaleDateString("en-US"),
    },
    {
        id: "end_date",
        label: "End Date",
        // minWidth: 0,
        // align: "left",
        format: (value: string) => new Date(value).toLocaleDateString("en-US"),
    },
];

interface Row {
    name: string;
    country: string;
    start_date: number;
    end_date: number;
}

export function Statistics(): JSX.Element {
    const [vacationsStatistics, setVacationStatistics] = useState<VacationStatistics | null>(null);

    const getVacationsStatistics = async (): Promise<void> => {
        try {
            console.log("Fetching Vacations Statistics");
            const response = await VacationsStatistics();
            console.log("Vacations Statistics fetched:", response.data);
            setVacationStatistics(response.data);
        } catch (err) {
            console.log("Error fetching Statistics", err);
        }
    };

    const getRowsFromVacations = (vacations: any[]): Row[] => {
        return vacations.map((vacation) => ({
            name: vacation.vacation_name,
            country: vacation.country.country_name,
            start_date: vacation.start_date,
            end_date: vacation.end_date,
        }));
    };

    // const getVacationsLikes(){
    //     //
    // }

    useEffect(() => {
        getVacationsStatistics();
    }, []);

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", my: 4 }}>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
                <Typography sx={{ mx: 2, whiteSpace: "nowrap" }}>VACATIONS STATS</Typography>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
            </Box>

            <div className={css.Statistics}>
                <div className={css.tableContainer}>
                    <InfoCard
                        head="Past-Due Vacations:"
                        body={vacationsStatistics ? vacationsStatistics.past_due.count.toString() : "Loading..."}
                    />
                    <ReusableTable
                        columns={columns}
                        rows={vacationsStatistics ? getRowsFromVacations(vacationsStatistics.past_due.vacations) : []}
                    />
                </div>
                <div className={css.tableContainer}>
                    <InfoCard
                        head="On-Going Vacations:"
                        body={vacationsStatistics ? vacationsStatistics.ongoing.count.toString() : "Loading..."}
                    />
                    <ReusableTable
                        columns={columns}
                        rows={vacationsStatistics ? getRowsFromVacations(vacationsStatistics.ongoing.vacations) : []}
                    />
                </div>
                <div className={css.tableContainer}>
                    <InfoCard
                        head="Future Vacations:"
                        body={vacationsStatistics ? vacationsStatistics.future.count.toString() : "Loading..."}
                    />
                    <ReusableTable
                        columns={columns}
                        rows={vacationsStatistics ? getRowsFromVacations(vacationsStatistics.future.vacations) : []}
                    />
                </div>
            </div>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", my: 4 }}>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
                <Typography sx={{ mx: 2, whiteSpace: "nowrap" }}>LIKES STATS</Typography>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
            </Box>
            <div className={css.Statistics}></div>
        </>
    );
}
