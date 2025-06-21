import type { User } from "./User";

export interface AuthContextType {
    signed: boolean;
    user: User | null;
    setUser: (user: User | null) => void;
    login: (userData: { email: string, password: string }) => Promise<User>;
    logout: () => void;
}