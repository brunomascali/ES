import axios from "axios";
import { useState } from "react";
import { SignupFormData, validateForm } from "../Utils/SignupFormValidator";


type SignupProps = {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUser: (user: string) => void;
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
        <div className="card shadow-sm">
            <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Cadastro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nome de usuário</label>
                        <input 
                            type="text" 
                            className="form-control"
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
                            className="form-control"
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
                            className="form-control"
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
                            className="form-control"
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
                            className="form-control"
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
                            className="form-control"
                            id="dateOfBirth"
                            value={dateOfBirth} 
                            onChange={(e) => setDateOfBirth(e.target.value)} 
                            required
                        />
                        <div className="form-text">Você deve ter pelo menos 18 anos</div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}
