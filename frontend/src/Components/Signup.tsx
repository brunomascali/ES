import axios from "axios";
import { useState } from "react";
import logo from "../assets/logo.png";
import { SignupFormData } from "../Utils/SignupFormValidator";
import { validateForm } from "../Utils/SignupFormValidator";

type SignupProps = {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUser: (user: string) => void;
}

const SignupErrorModal = ({ error }: { error: string }) => {
    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Signup({ setIsLoggedIn, setUser }: SignupProps) {
    const [username, setUsername] = useState('Maria da Silva');
    const [password, setPassword] = useState('123');
    const [confirmPassword, setConfirmPassword] = useState('123');
    const [email, setEmail] = useState('mariadasilva@ufrgs.br');
    const [dateOfBirth, setDateOfBirth] = useState('1990-01-01');
    const [cpf, setCpf] = useState('12345678901');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: SignupFormData = { username, password, confirmPassword, email, dateOfBirth, cpf };

        if (validateForm(formData)) {
            const user = { name: username, password, email, dateOfBirth, cpf };
            try {
                const response = await axios.post('http://127.0.0.1:8080/users/create', user);
                const userData = response.data;
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData.name);
                setIsLoggedIn(true);
            } catch (error: any) {
                console.error(error);
                alert('Erro ao cadastrar usuário: ' + (error.response?.data || 'Erro desconhecido'));
            }
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
                        <h2 className="text-center mb-4">Cadastro</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nome de usuário</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="username"
                                    placeholder="Digite seu nome de usuário"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
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
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirmar Senha</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    id="confirmPassword"
                                    placeholder="Confirme sua senha"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
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
                                <label htmlFor="cpf" className="form-label">CPF</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="cpf"
                                    placeholder="Digite seu CPF"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    required
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="dateOfBirth" className="form-label">Data de Nascimento</label>
                                <input
                                    type="date"
                                    className="form-control form-control-lg"
                                    id="dateOfBirth"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    required
                                />
                                <div className="form-text">Você deve ter pelo menos 18 anos</div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 btn-lg">
                                Cadastrar
                            </button>
                        </form>
                        <div className="mt-3 text-center">
                            <a href="/" className="text-decoration-none">
                                Já tem uma conta? Faça login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
