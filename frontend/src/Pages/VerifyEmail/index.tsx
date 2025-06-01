import { useState, useContext } from "react";
import TopMenu from "../../Components/TopMenu";
import { AuthContext } from "../../context/Auth";
import axios from "axios";
import email from "../../assets/email.png";

enum ResendStatus {
    IDLE = 0,
    LOADING = 1,
    SUCCESS = 2,
    ERROR = 3
}

export default function VerifyEmail() {
    const { user } = useContext(AuthContext);
    const [code, setCode] = useState('');
    const [resendStatus, setResendStatus] = useState(ResendStatus.IDLE);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8080/api/verify/' + code);

            if (response.status === 200 && user) {
                user.roles = ["PASSENGER"];
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleResendCode = async () => {
        setResendStatus(ResendStatus.LOADING);
        try {
            const response = await axios.post('http://127.0.0.1:8080/api/verify/resend/' + user?.email);
            if (response.status === 200) {
                setResendStatus(ResendStatus.SUCCESS);
            }
        } catch (error) {
            console.error(error);
            setResendStatus(ResendStatus.ERROR);
        }
    }

    return (
        <div>
            <TopMenu activePage="" />
            <div className="container py-5 d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 d-flex flex-column align-items-center">
                        <img src={email} alt="Email" />
                        <h2>Verifique seu endereço de email</h2>
                        <p>Enviamos um código de verificação para o seu email <b>{user?.email}</b></p>
                        <p>Digite o código abaixo para verificar seu email</p>

                        <input type="text" className="form-control w-50" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
                        <p className="text-muted">Não recebeu o código? <a href="#" onClick={handleResendCode}>Reenviar código</a></p>
                        {resendStatus === ResendStatus.LOADING && (
                            <div className="alert alert-info" role="alert">
                                Reenviando código...
                            </div>
                        )}
                        {resendStatus === ResendStatus.SUCCESS && (
                            <div className="alert alert-success" role="alert">
                                Código reenviado com sucesso!
                            </div>
                        )}
                        {resendStatus === ResendStatus.ERROR && (
                            <div className="alert alert-danger" role="alert">
                                Erro ao reenviar código!
                            </div>
                        )}
                        <input type="submit" value="Verificar" className="btn btn-primary btn-lg" />
                    </div>
                </form>
            </div>
        </div>
    );
}