import TopMenu from "../../Components/TopMenu";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

export default function Home() {
    const { user } = useContext(AuthContext);

    console.log(user);
    return (
        <div>
            <TopMenu activePage="home" />
            <div className="container mx-auto py-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">Bem-vindo de volta, {user?.name}!</h1>
                <div className="flex flex-col gap-4 w-full max-w-md">
                    {
                        !user!.roles.includes("DRIVER") && (
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 w-full"
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
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 w-full"
                        onClick={() => {
                            window.location.href = "/oferecer-carona";
                        }}
                    >
                        Oferecer carona
                    </button>
                    )
                    }

                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 w-full"
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