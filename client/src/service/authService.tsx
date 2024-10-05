import axios from "axios";

const createOrUpdateUser = async (authtoken: string) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/verify_firebase_token/",
            { token: authtoken },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error response:", error.response?.data);
            throw new Error(error.response?.data?.message || "An error occurred");
        } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
};

export default createOrUpdateUser;
