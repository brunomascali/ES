import { useEffect, useState } from "react";
import TopMenu from "../Components/TopMenu";
import SignUpAsDriver from "../Components/SignUpAsDriver";

export type LoggedProps = {
    user: string;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUser: (user: string) => void;
}

export default function LoggedIn({ user, setIsLoggedIn, setUser }: LoggedProps) {
    const [isDriver, setIsDriver] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                if (userData.roles.some((role: any) => role.name === 'MOTORISTA')) {
                    setIsDriver(true);
                }
            } catch (e) {
            }
        }
    }, []);

    return (
        <div>
            <TopMenu user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
            <div className="container py-5">
                <div className="row justify-content-between align-items-center">
                    <div className="col">
                        <h1>Bem vindo {user}</h1>
                    </div>
                </div>
                {!!!isDriver ? (
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-6">
                            <SignUpAsDriver setIsDriver={setIsDriver} />
                        </div>
                    </div>
                ) : (
                    <div className="row justify-content-center align-items-center">
                        <div className="col">
                            <h1>Motorista</h1>
                            <button className="btn btn-primary">
                                Criar carona
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
