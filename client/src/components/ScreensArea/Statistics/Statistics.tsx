import css from "./Statistics.module.css";
import ReusableTable from "../../Tools/ReusableTable";
import InfoCard from "../../Tools/InfoCard";
import { VacationsStatistics } from "../../../service/statisticsService";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

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
        format: (value: string) => new Date(value).toLocaleDateString("en-US"),
    },
    {
        id: "end_date",
        label: "End Date",
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
            const response = await VacationsStatistics();
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

    // Calculate totals for ElementHighlights (for the PieChart or other visualization)
    const calculateVacationPercentages = (): { [key: string]: number } => {
        if (!vacationsStatistics) return { past_due: 0, ongoing: 0, future: 0 };

        const totalVacations =
            vacationsStatistics.past_due.count + vacationsStatistics.ongoing.count + vacationsStatistics.future.count;

        if (totalVacations === 0) return { past_due: 0, ongoing: 0, future: 0 };

        return {
            past_due: (vacationsStatistics.past_due.count / totalVacations) * 100,
            ongoing: (vacationsStatistics.ongoing.count / totalVacations) * 100,
            future: (vacationsStatistics.future.count / totalVacations) * 100,
        };
    };

    const vacationPercentages = calculateVacationPercentages();

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
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", my: 2 }}>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
                <Typography sx={{ mx: 2, whiteSpace: "nowrap" }}>LIKE STATS</Typography>
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: "gray" }} />
            </Box>
        </>
    );
}
