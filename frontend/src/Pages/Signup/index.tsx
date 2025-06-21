import { useState } from "react";
import logo from '../../assets/logo.png';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import type { SignupFormData } from "../../types/SignUpFormData";
import api from "../../services/api";
import { validateSignupForm } from "../../services/SignUpService";

export default function Signup() {
    const [input, setInput] = useState<SignupFormData>({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        cpf: '',
        dateOfBirth: '',
    });
    const [errors, setErrors] = useState<string[]>([]); 
    const [isSuccess, setIsSuccess] = useState(false);


    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);
        setIsSuccess(false);

        const errors = validateSignupForm(input);

        if (errors.length === 0) {
            try {
                const signupRequest = {
                    name: input.username,
                    password: input.password,
                    email: input.email,
                    cpf: input.cpf,
                    dateOfBirth: input.dateOfBirth,
                }
                const response = await api.post('/users/create', signupRequest);

                if (response.status === 200) {
                    setIsSuccess(true);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                }
            } catch (error) {
                setErrors(['Erro ao criar conta. Por favor, tente novamente.']);
            }
        } else {
            setErrors(errors);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    return (
        <div className="fixed inset-0 min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                <img src={logo} alt="Logo" className="mb-6 w-48" />
                <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
                {isSuccess && (
                    <Alert variant="default" className="mb-6 w-full">
                        <AlertTitle>Conta criada com sucesso!</AlertTitle>
                        <AlertDescription>Você será redirecionado para a página de login em instantes...</AlertDescription>
                    </Alert>
                )}
                {errors.length > 0 && (
                    <Alert variant="destructive" className="mb-6 w-full">
                        <AlertTitle>Erro!</AlertTitle>
                        <AlertDescription>
                            {errors.map((error, idx) => (
                                <div key={idx}>{error}</div>
                            ))}
                        </AlertDescription>
                    </Alert>
                )}
                <form onSubmit={handleSignup} className="w-full space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Nome de usuário</label>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Digite seu nome de usuário"
                            value={input.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Digite sua senha"
                            value={input.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirme sua senha"
                            value={input.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="seu.email@ufrgs.br"
                            value={input.email}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="text-xs text-gray-500 mt-1">Use seu email institucional @ufrgs.br</div>
                    </div>
                    <div>
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                        <Input
                            type="text"
                            id="cpf"
                            name="cpf"
                            placeholder="Digite seu CPF"
                            value={input.cpf}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                        <Input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={input.dateOfBirth}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="text-xs text-gray-500 mt-1">Você deve ter pelo menos 18 anos</div>
                    </div>
                    <Button type="submit" className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">Cadastrar</Button>
                </form>
                <div className="mt-6 text-center w-full">
                    <a href="/" className="text-indigo-600 hover:underline text-sm font-medium">
                        Já tem uma conta? Faça login
                    </a>
                </div>
            </div>
        </div>
    )
}