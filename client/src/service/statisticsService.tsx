import api from "../utils/api";

export const VacationsStatistics = () => api.get("http://localhost:8000/api/statistics/vacations");
export const LikesStatistics = () => api.get("http://localhost:8000/api/statistics/likes");
export const UsersStatistics = () => api.get("http://localhost:8000/api/statistics/users");
