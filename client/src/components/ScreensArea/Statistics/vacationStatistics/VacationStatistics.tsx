import css from "./VacationStatistics.module.css";
import ReusableTable from "../../../Tools/ReusableTable";
import InfoCard from "../../../Tools/InfoCard";
import { VacationsStatistics } from "../../../../service/statisticsService";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
// @ts-ignore
import { Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
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

export function VacationStatistics(): JSX.Element {
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

    const colors = {
        past_due: "red",
        ongoing: "green",
        future: "blue",
    };

    const vacationData = [
        { name: "Past Due", count: vacationsStatistics?.past_due.count || 0, color: colors.past_due },
        { name: "Ongoing", count: vacationsStatistics?.ongoing.count || 0, color: colors.ongoing },
        { name: "Future", count: vacationsStatistics?.future.count || 0, color: colors.future },
    ];

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
                                    {
                                        id: 0,
                                        value: vacationPercentages.past_due,
                                        label: "Past Due",
                                        color: colors.past_due,
                                    },
                                    {
                                        id: 1,
                                        value: vacationPercentages.ongoing,
                                        label: "Ongoing",
                                        color: colors.ongoing,
                                    },
                                    { id: 2, value: vacationPercentages.future, label: "Future", color: colors.future },
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                </div>
                <div className={css.chartsContainer}>
                    <ResponsiveContainer width="70%" height={300}>
                        <BarChart
                            data={vacationData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" barSize={50}>
                                {vacationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}
