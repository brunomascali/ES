import type { IUser } from "./User";

export interface AuthContextType {
    signed: boolean;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    login: (userData: { email: string, password: string }) => Promise<IUser>;
    logout: () => void;
}