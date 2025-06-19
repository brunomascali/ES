import { useState, useContext } from "react";
import TopMenu from "../../components/TopMenu";
import { AuthContext } from "../../context/Auth";
import axios from "axios";
import email from "../../assets/email.png";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

enum VerifyStatus {
    IDLE = 0,
    LOADING = 1,
    SUCCESS = 2,
    SEND_ERROR = 3,
    VERIFY_ERROR = 4
}

export default function VerifyEmail() {
    const { user, setUser } = useContext(AuthContext);
    const [code, setCode] = useState('');
    const [verifyStatus, setVerifyStatus] = useState(VerifyStatus.IDLE);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setVerifyStatus(VerifyStatus.IDLE);
        try {
            const verifyRequestResponse = await axios.post('http://127.0.0.1:8080/api/verify/' + code);
            if (verifyRequestResponse.status === 200 && user) {
                const getUserResponse = await axios.get('http://127.0.0.1:8080/api/users/email/' + user.email);
                if (getUserResponse.status === 200) {
                    setUser(getUserResponse.data);
                    window.location.href = '/';
                }
            }
        } catch (error) {
            setVerifyStatus(VerifyStatus.VERIFY_ERROR);
        }
    }

    const handleResendCode = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setVerifyStatus(VerifyStatus.LOADING);
        try {
            const response = await axios.post('http://127.0.0.1:8080/api/verify/resend/' + user?.email);
            if (response.status === 200) {
                setVerifyStatus(VerifyStatus.SUCCESS);
            }
        } catch (error) {
            setVerifyStatus(VerifyStatus.SEND_ERROR);
        }
    }

    return (
        <div className="fixed inset-0 min-h-screen w-full bg-gray-50 flex flex-col">
            <TopMenu activePage="" />
            <div className="flex flex-1 items-center justify-center px-4">
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                    <img src={email} alt="Email" className="mb-6 w-24" />
                    <h2 className="text-2xl font-bold mb-2 text-center">Verifique seu endereço de email</h2>
                    <p className="text-gray-700 text-center mb-2">Enviamos um código de verificação para o seu email <b>{user?.email}</b></p>
                    <p className="text-gray-600 text-center mb-4">Digite o código abaixo para verificar seu email</p>
                    <Input
                        type="text"
                        className="mb-2 text-center tracking-widest font-mono text-lg"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Código de verificação"
                        required
                    />
                    <div className="w-full text-left mb-4">
                        <button
                            type="button"
                            onClick={handleResendCode}
                            className="text-indigo-600 hover:underline text-sm font-medium"
                        >
                            Não recebeu o código? Reenviar código
                        </button>
                    </div>
                    {verifyStatus === VerifyStatus.LOADING && (
                        <Alert className="mb-4 w-full border-indigo-500 bg-indigo-50 text-indigo-800">
                            <AlertTitle>Reenviando código...</AlertTitle>
                        </Alert>
                    )}
                    {verifyStatus === VerifyStatus.SUCCESS && (
                        <Alert className="mb-4 w-full border-green-500 bg-green-50 text-green-800">
                            <AlertTitle className="text-green-700">Código reenviado com sucesso!</AlertTitle>
                        </Alert>
                    )}
                    {verifyStatus === VerifyStatus.SEND_ERROR && (
                        <Alert className="mb-4 w-full border-red-500 bg-red-50 text-red-800">
                            <AlertTitle>Erro ao reenviar código!</AlertTitle>
                        </Alert>
                    )}
                    {verifyStatus === VerifyStatus.VERIFY_ERROR && (
                        <Alert className="mb-4 w-full border-red-500 bg-red-50 text-red-800">
                            <AlertTitle>Código inválido!</AlertTitle>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full mt-2">Verificar</Button>
                </form>
            </div>
        </div>
    );
}