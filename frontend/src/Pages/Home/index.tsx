import TopMenu from "../../components/TopMenu";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { Button } from "../../components/ui/button";

export default function Home() {
    const { user } = useContext(AuthContext);

    console.log(user);
    return (
        <div>
            <TopMenu />
            <div className="container mx-auto py-8 px-4">
                <div className="flex flex-col items-center space-y-6">
                    <h1 className="text-4xl font-bold text-gray-900 text-center">
                        Bem-vindo de volta, {user?.name}!
                    </h1>
                    
                    <div className="flex flex-col gap-4 w-full max-w-md">
                        {!user?.roles.includes("DRIVER") && (
                            <Button
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-5 px-10 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                                onClick={() => {
                                    window.location.href = "/cadastro-motorista";
                                }}
                            >
                                Cadastre-se como motorista
                            </Button>
                        )}
                        
                        {user?.roles.includes("DRIVER") && (
                            <Button
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-5 px-10 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                                onClick={() => {
                                    window.location.href = "/oferecer-carona";
                                }}
                            >
                                Oferecer carona
                            </Button>
                        )}

                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-5 px-10 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                            onClick={() => {
                                window.location.href = "/caronas";
                            }}
                        >
                            Ver caronas disponíveis
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}