import api from "../utils/api";

export const VacationsStatistics = () => api.get("http://localhost:8000/api/statistics/vacations");
