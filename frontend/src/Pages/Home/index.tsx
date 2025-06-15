import TopMenu from "../../Components/TopMenu";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

export default function Home() {
    const { user } = useContext(AuthContext);

    console.log(user);
    return (
        <div>
            <TopMenu activePage="home" />
            <div className="container py-5 d-flex flex-column align-items-center">
                <h1>Bem-vindo de volta, {user?.name}!</h1>
                <div className="flex flex-column gap-1">
                    {
                        !user!.roles.includes("DRIVER") && (
                            <button
                                className="btn btn-primary mt-3 w-100"
                                onClick={() => {
                                    window.location.href = "/cadastro-motorista";
                                }}
                            >
                                Cadastre-se como motorista
                            </button>
                        )
                    }
                    {
                        user?.roles.includes("DRIVER") && (
                    <button
                        className="btn btn-success btn- mt-3 w-100"
                        onClick={() => {
                            window.location.href = "/oferecer-carona";
                        }}
                    >
                        Oferecer carona
                    </button>
                    )
                    }

                    <button
                        className="btn btn-success btn- mt-3 w-100"
                        onClick={() => {
                            window.location.href = "/caronas";
                        }}
                    >
                        Ver caronas disponíveis
                    </button>
                </div>
            </div>
        </div>
    );
}