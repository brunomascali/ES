import { useContext } from "react";

import { useState } from "react";
import { AuthContext } from "../../context/Auth";
import logo from '../../assets/logo.png';

export default function Login() {
    const context = useContext(AuthContext);
    const [input, setInput] = useState({ email: 'bmvolkmer@inf.ufrgs.br', password: '123' });
    const [invalidLogin, setInvalidLogin] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await context.Login(input);
        } catch (error) {
            setInvalidLogin(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
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
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    name="email"
                                    id="email"
                                    placeholder="seu.email@ufrgs.br"
                                    onChange={handleInputChange}
                                    value={input.email}
                                    required
                                />
                                <div className="form-text">Use seu email institucional @ufrgs.br</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    name="password"
                                    id="password"
                                    placeholder="Digite sua senha"
                                    onChange={handleInputChange}
                                    value={input.password}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Entrar
                            </button>
                        </form>
                        {invalidLogin && (
                            <div className="alert alert-danger mt-3" role="alert">
                                Erro! Email ou senha inválidos!
                            </div>
                        )}
                        <div className="mt-3 text-center">
                            <a href="/signup" className="text-decoration-none">
                                Não tem uma conta? Cadastre-se
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};