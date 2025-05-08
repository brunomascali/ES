import axios from "axios";
import { useState } from "react";

type LoginFormData = {
    email: string;
    password: string;
}

function validateForm(formData: LoginFormData): boolean {
    if (!formData.email.endsWith("ufrgs.br")) {
        return false;
    }

    return true;
}

export default function Login() {
    const [email, setEmail] = useState('brunisco@ufrgs.br');
    const [password, setPassword] = useState('123');

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: LoginFormData = {
            email,
            password
        };
        if (validateForm(formData)) {
            axios.post('http://localhost:8080/login', formData)
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.href = '/';
            })
            .catch(error => {
                console.error(error);
            });
        } else {
            alert('Email deve ser do domínio ufrgs.br');
        }
    }
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
