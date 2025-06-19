import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export default function TopMenu({ activePage }: { activePage: string }) {
    const { Logout, user } = useContext(AuthContext);

    return (
        <nav className="bg-indigo-50 py-2 px-5 w-full shadow-md">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <a href="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="h-15" />
                    </a>
                    <a
                        href="/"
                        className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${activePage === 'home'
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                            }`}
                    >
                        Início
                    </a>
                    <a
                        href="/caronas"
                        className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${activePage === 'caronas'
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                            }`}
                    >
                        Caronas
                    </a>
                    <a
                        href="#"
                        className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${activePage === 'perfil'
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                            }`}
                    >
                        Perfil
                    </a>
                    {user?.roles.includes("DRIVER") && (
                        <a
                            href="/oferecer-carona"
                            className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${activePage === 'motorista'
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                                }`}
                        >
                            Oferecer Carona
                        </a>
                    )}
                </div>
                <button
                    onClick={Logout}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-lg"
                >
                    Sair
                </button>
            </div>
        </nav>
    );
}
