import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export default function TopMenu({ activePage }: { activePage: string }) {
    const { Logout, user } = useContext(AuthContext);

    return (
        <nav className="bg-[#edeef7] py-2 px-5 text-lg flex justify-between items-center">
            <div className="flex items-center space-x-6">
                <div className="flex items-center">
                    <a className="py-2 px-3 hover:opacity-80 transition-opacity" href="/">
                        <img src={logo} alt="Logo" className="h-15" />
                    </a>
                </div>
                <div className="flex items-center">
                    <a 
                        className={`py-2 px-3 rounded-md transition-colors duration-200 ${
                            activePage === 'home' 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-700 hover:bg-gray-200'
                        }`} 
                        href="/"
                    >
                        Início
                    </a>
                </div>
                <div className="flex items-center">
                    <a 
                        className={`py-2 px-3 rounded-md transition-colors duration-200 ${
                            activePage === 'caronas' 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-700 hover:bg-gray-200'
                        }`} 
                        href="/caronas"
                    >
                        Caronas
                    </a>
                </div>
                <div className="flex items-center">
                    <a 
                        className={`py-2 px-3 rounded-md transition-colors duration-200 ${
                            activePage === 'perfil' 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-700 hover:bg-gray-200'
                        }`} 
                        href="#"
                    >
                        Perfil
                    </a>
                </div>
                {
                    user?.roles.includes("DRIVER") && (
                        <div className="flex items-center">
                            <a 
                                className={`py-2 px-3 rounded-md transition-colors duration-200 ${
                                    activePage === 'motorista' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-700 hover:bg-gray-200'
                                }`} 
                                href="/oferecer-carona"
                            >
                                Oferecer Carona
                            </a>
                        </div>
                    )
                }
            </div>
            <div className="flex items-center">
                <button 
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-lg" 
                    onClick={Logout}
                >
                    Sair
                </button>
            </div>
        </nav>
    );
}
