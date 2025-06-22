import type { IUser } from "../types/User";
import api from "./api";

export async function getUserByCpf(cpf: string): Promise<IUser> {
    const response = await api.get(`/users/cpf/${cpf}`);
    return response.data;
}