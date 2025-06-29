import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

export default function TopMenu() {
    const { logout: Logout, user } = useAuth();

    const isVerified = !user?.roles.includes("NOT_VERIFIED_USER");

    const activePage: string = window.location.pathname.split('/')[1];

    return (
        <nav className="bg-indigo-50 py-2 px-5 w-full shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <a href="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="h-15" />
                    </a>
                    <a
                        href="/"
                        className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${activePage === ''
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                            }`}
                    >
                        Início
                    </a>
                    {isVerified && (
                        <a
                            href="/caronas"
                            className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${activePage === 'caronas'
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                                }`}
                        >
                            Caronas
                        </a>
                    )}
                    {user?.roles.includes("DRIVER") && (
                        <a
                            href="/oferecer-carona"
                            className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${activePage === 'oferecer-carona'
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                                }`}
                        >
                            Oferecer Carona
                        </a>
                    )}
                    {user?.roles.includes("ADMIN") && (
                        <a
                            href="/denuncias"
                            className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${activePage === 'denuncias'
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                                }`}
                        >
                            Denuncias
                        </a>
                    )}
                </div>
                <button
                    onClick={Logout}
                    className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-lg"
                >
                    Sair
                </button>
            </div>
        </nav>
    );
}
