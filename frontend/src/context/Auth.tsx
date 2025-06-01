import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface User {
    name: string;
    email: string;
    cpf: string;
    roles: string[];
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    Login: (userData: { email: string, password: string }) => Promise<void>;
    Logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storageUser = localStorage.getItem('user');

        if (storageUser) {
            setUser(JSON.parse(storageUser));
        }
    }, []);

    async function Login({ email, password }: { email: string, password: string }) {
        const response = await axios.post('http://127.0.0.1:8080/api/login', {
            email: email,
            password: password
        });
        
        if (response.status === 200) {
            console.log(response.data);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        
        return response.data;
    }

    function Logout() {
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    );
};