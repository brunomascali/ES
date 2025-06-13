import { useState } from "react";
import logo from '../../assets/logo.png';
import axios from "axios";

type SignupFormData = {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    cpf: string;
    dateOfBirth: string;
}

export default function Signup() {
    const [input, setInput] = useState<SignupFormData>({
        username: 'João Gabriel Rau Wendt',
        password: '123',
        confirmPassword: '123',
        email: 'jgrwendt@inf.ufrgs.br',
        cpf: '12345678901',
        dateOfBirth: '2000-01-01',
    });

    const validateSignupForm = (input: SignupFormData) => {
        let errors = [];
        if (input.password !== input.confirmPassword) {
            errors.push('As senhas não coincidem');
        }
        if (!input.email.endsWith('ufrgs.br')) {
            errors.push('O email deve ser do domínio ufrgs.br');
        }
        if (new Date(input.dateOfBirth) > new Date()) {
            errors.push('A data de nascimento não pode ser maior que a data atual');
        }
        return errors;
    }

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validateSignupForm(input)) {
            try {
                const SignupRequest = {
                    name: input.username,
                    password: input.password,
                    email: input.email,
                    cpf: input.cpf,
                    dateOfBirth: input.dateOfBirth,
                }
                const response = await axios.post('http://127.0.0.1:8080/api/users/create', SignupRequest);

                if (response.status === 200) {
                    window.location.href = '/';
                }
            } catch (error) {
            }
        }
    }

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
                        <h2 className="text-center mb-4">Cadastro</h2>
                        <form onSubmit={handleSignup}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nome de usuário</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="username"
                                    placeholder="Digite seu nome de usuário"
                                    value={input.username}
                                    onChange={handleInputChange}
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
                                    value={input.password}
                                    onChange={handleInputChange}
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
                                    value={input.confirmPassword}
                                    onChange={handleInputChange}
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
                                    value={input.email}
                                    onChange={handleInputChange}
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
                                    value={input.cpf}
                                    onChange={handleInputChange}
                                    required
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="dateOfBirth" className="form-label">Data de Nascimento</label>
                                <input
                                    type="date"
                                    className="form-control form-control-lg"
                                    id="dateOfBirth"
                                    value={input.dateOfBirth}
                                    onChange={handleInputChange}
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
};