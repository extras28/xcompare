import axios from "axios";

const getApiUrl = () => {
    // In development, use the environment variable
    if (import.meta.env.DEV) {
        return import.meta.env.VITE_API_URL;
    }
    // In production, use window.location.origin + /api
    return `${window.location.origin}/api`;
};

const API_URL = getApiUrl();

export const compareFiles = async (file1: File, file2: File) => {
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
        const response = await axios.post(`${API_URL}/compare`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || "Error comparing files");
        }
        throw error;
    }
};
