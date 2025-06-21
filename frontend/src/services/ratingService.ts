import type { IRatingData } from "src/types/RatingData";
import api from "./api";

export async function getAverageDriverRating(cpf: string) {
    const response = await api.get(`/rating/avg/driver/${cpf}`);
    return response.data;
}

export async function getAveragePassengerRating(cpf: string) {
    const response = await api.get(`/rating/avg/passenger/${cpf}`);
    return response.data;
}

export async function createRating(rating: IRatingData) {
    console.log(rating);
    const response = await api.post(`/rating/create`, rating);
    console.log("response: ", response);
    return response.data;
}