import css from "./Statistics.module.css";
import ReusableTable from "../../Tools/ReusableTable";
import InfoCard from "../../Tools/InfoCard";
// import { getVacationsStatistics as fetchVacationsStatistics } from "../../../service/StatisticsService/statisticService"; // Renamed to avoid conflicts
import { useEffect, useState } from "react";

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
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
    {
        id: "population",
        label: "Population",
        minWidth: 170,
        align: "right",
        format: (value: number) => value.toLocaleString("en-US"),
    },
    {
        id: "size",
        label: "Size\u00a0(km\u00b2)",
        minWidth: 170,
        align: "right",
        format: (value: number) => value.toLocaleString("en-US"),
    },
    {
        id: "density",
        label: "Density",
        minWidth: 170,
        align: "right",
        format: (value: number) => value.toFixed(2),
    },
];

interface Row {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}

const rows: Row[] = [
    { name: "India", code: "IN", population: 1324171354, size: 3287263, density: 402 },
    { name: "China", code: "CN", population: 1403500365, size: 9596961, density: 146 },
    // More rows...
];

export function Statistics(): JSX.Element {
    const [vacationsStatistics, setVacationStatistics] = useState<VacationStatistics | null>(null);

    // const getVacationsStatistics = async (): Promise<void> => {
    //     // Updated return type
    //     try {
    //         console.log("Fetching Vacations Statistics");
    //         const response = await fetchVacationsStatistics(); // Call the renamed function
    //         console.log("Vacations Statistics fetched:", response.data);
    //         setVacationStatistics(response.data); // Update state
    //     } catch (err) {
    //         console.log("Error fetching Statistics", err);
    //     }
    // };

    // useEffect(() => {
    //     getVacationsStatistics(); // Call the fetching function on mount
    // }, []);

    return (
        <div className={css.Statistics}>
            <div>
                <InfoCard
                    head="Past-Due Vacations:"
                    body={vacationsStatistics ? vacationsStatistics.past_due.count.toString() : "Loading..."}
                />
                <ReusableTable columns={columns} rows={rows} />
            </div>
            <div>
                <InfoCard
                    head="On-Going Vacations:"
                    body={vacationsStatistics ? vacationsStatistics.ongoing.count.toString() : "Loading..."}
                />
                <ReusableTable columns={columns} rows={rows} />
            </div>
            <div>
                <InfoCard
                    head="Future Vacations:"
                    body={vacationsStatistics ? vacationsStatistics.future.count.toString() : "Loading..."}
                />
                <ReusableTable columns={columns} rows={rows} />
            </div>
        </div>
    );
}
