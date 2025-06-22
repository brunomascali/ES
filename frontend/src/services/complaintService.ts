import api from "./api";

export interface IComplaintData {
    user_from: string;
    user_to: string;
    description: string;
}

export const getComplaints = async () => {
    const response = await api.get('/complaints');
    return response.data;
}

export const createComplaint = async (complaintData: IComplaintData) => {
    const response = await api.post('/complaints/create', complaintData);
    return response.data;
}

export const banUser = async (user_id: number) => {
    const response = await api.post(`/complaints/ban/${user_id}`);
    return response.data;
}

export const clearComplaint = async (user_id: number) => {
    const response = await api.put(`/complaints/close/${user_id}`);
    return response.data;
}