import axios from "axios";
import { useState } from "react";

type SignUpAsDriverProps = {
    setIsDriver: (isDriver: boolean) => void;
}

export default function SignUpAsDriver({ setIsDriver }: SignUpAsDriverProps) {
    const user = localStorage.getItem('user');
    const [cnh, setCnh] = useState('');

    const cpf = user ? JSON.parse(user).cpf : '';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const SignUpAsDriverRequest = { cpf, cnh }

        try {
            await axios.post('http://127.0.0.1:8080/cnh/validate', SignUpAsDriverRequest);
            setIsDriver(true);
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar motorista.');
        }

    }

    return (
        <div className="card shadow-sm">
            <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Cadastro de Motorista</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="cnh" className="form-label">CNH</label>
                        <input 
                            type="text" 
                            className="form-control"
                            id="cnh"
                            placeholder="Digite sua CNH" 
                            value={cnh} 
                            onChange={(e) => setCnh(e.target.value)} 
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}

