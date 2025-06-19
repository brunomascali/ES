import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import logo from '../../assets/logo.png';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

export default function Login() {
    const context = useContext(AuthContext);
    const [input, setInput] = useState({ email: 'bmvolkmer@inf.ufrgs.br', password: '123' });
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [banned, setBanned] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInvalidLogin(false);
        setBanned(false);
        try {
            await context.Login(input);
        } catch (error: any) {
            if (error.response.status === 403) {
                setBanned(true);
            } else {
                setInvalidLogin(true);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    return (
        <div className="fixed inset-0 min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                <img src={logo} alt="Logo" className="mb-6 w-48" />
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin} className="w-full space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="seu.email@ufrgs.br"
                            onChange={handleInputChange}
                            value={input.email}
                            required
                        />
                        <div className="text-xs text-gray-500 mt-1">Use seu email institucional @ufrgs.br</div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Digite sua senha"
                            onChange={handleInputChange}
                            value={input.password}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Entrar</Button>
                </form>
                {invalidLogin && (
                    <Alert variant="destructive" className="mt-6 w-full">
                        <AlertTitle>Erro!</AlertTitle>
                        <AlertDescription>Email ou senha inválidos!</AlertDescription>
                    </Alert>
                )}
                {banned && (
                    <Alert variant="destructive" className="mt-6 w-full">
                        <AlertTitle>Erro!</AlertTitle>
                        <AlertDescription>Usuário banido!</AlertDescription>
                    </Alert>
                )}
                <div className="mt-6 text-center w-full">
                    <a href="/signup" className="text-indigo-600 hover:underline text-sm font-medium">
                        Não tem uma conta? Cadastre-se
                    </a>
                </div>
            </div>
        </div>
    );
}