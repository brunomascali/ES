import axios from "axios";
import { useState } from "react";
import logo from "../assets/logo.png";
import { LoginFormData } from "../Utils/LoginFormValidator";
import { validateLoginForm } from "../Utils/LoginFormValidator";

type LoginProps = {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUser: (user: string) => void;
}

export default function Login({ setIsLoggedIn, setUser }: LoginProps) {
    const [email, setEmail] = useState('mariadasilva@ufrgs.br');
    const [password, setPassword] = useState('123');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginRequest: LoginFormData = { email, password };

        if (validateLoginForm(loginRequest)) {
            try {
                const response = await axios.post('http://localhost:8080/login', loginRequest);
                const userData = response.data;
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData.name);
                setIsLoggedIn(true);
            } catch (error) {
                console.error(error);
                alert('Erro ao fazer login. Verifique suas credenciais.');
            }
        } else {
            alert('Email deve ser do domínio ufrgs.br');
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="p-4 text-center">
                        <div className="d-flex justify-content-center">
                            <img src={logo} alt="Logo" className="mb-4" style={{ width: '240px' }} />
                        </div>
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    id="email"
                                    placeholder="seu.email@ufrgs.br"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="form-text">Use seu email institucional @ufrgs.br</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    id="password"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Entrar
                            </button>
                        </form>
                        <div className="mt-3 text-center">
                            <a href="/signup" className="text-decoration-none">
                                Não tem uma conta? Cadastre-se
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
