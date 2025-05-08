import axios from "axios";
import { useState } from "react";

type SignupFormData = {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    dateOfBirth: string;
}

function validateForm(formData: SignupFormData): boolean {
    let errors = [];
    if (formData.password !== formData.confirmPassword) {
        errors.push("As senhas não coincidem");
    }
    if (!formData.email.endsWith("ufrgs.br")) {
        errors.push("O email deve ser do domínio ufrgs.br");
    }
    if (new Date(formData.dateOfBirth) > new Date()) {
        errors.push("A data de nascimento não pode ser maior que a data atual");
    }
    if (new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear() < 18) {
        errors.push("Você deve ter pelo menos 18 anos");
    }
    
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;   
    }
    return true;
}

export default function Signup() {
    const [username, setUsername] = useState('brunisco');
    const [password, setPassword] = useState('123');
    const [confirmPassword, setConfirmPassword] = useState('123');
    const [email, setEmail] = useState('brunisco@ufrgs.br');
    const [dateOfBirth, setDateOfBirth] = useState('1990-01-01');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: SignupFormData = {
            username,
            password,
            confirmPassword,
            email,
            dateOfBirth
        };

        console.log(formData);
        
        if (validateForm(formData)) {
            const user = {
                name: username,
                password,
                email,
                dateOfBirth
            };
            console.log(user);
            axios.post('http://127.0.0.1:8080/signup', user)
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.href = '/';
            })
            .catch(error => {
                console.error(error);
                alert('Erro ao cadastrar usuário: ' + error.response.data);
            });
        }
    }

    return (
        <>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required/>
            <button type="submit">Signup</button>
        </form>
        </>
    )
}
