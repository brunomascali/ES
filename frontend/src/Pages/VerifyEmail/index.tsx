import { useState } from "react";
import TopMenu from "../../components/TopMenu";
import email from "../../assets/email.png";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Alert, AlertTitle } from "../../components/ui/alert";
import { useAuth } from "../../hooks/useAuth";
import { EmailVerificationStatus } from "../../types/enums/EmailVerificationStatus";
import api from "../../services/api";

export default function VerifyEmail() {
    const { user, setUser } = useAuth();
    const [code, setCode] = useState('');
    const [verifyStatus, setVerifyStatus] = useState(EmailVerificationStatus.Idle);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setVerifyStatus(EmailVerificationStatus.Idle);
        try {
            const verifyRequestResponse = await api.post('/verify/' + code);
            if (verifyRequestResponse.status === 200 && user) {
                const getUserResponse = await api.get('/users/email/' + user.email);
                if (getUserResponse.status === 200) {
                    setUser(getUserResponse.data);
                    window.location.href = '/';
                }
            }
        } catch (error) {
            setVerifyStatus(EmailVerificationStatus.VerifyError);
        }
    }

    const handleResendCode = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setVerifyStatus(EmailVerificationStatus.Loading);
        try {
            const response = await api.post('/verify/resend/' + user?.email);
            if (response.status === 200) {
                setVerifyStatus(EmailVerificationStatus.Success);
            }
        } catch (error) {
            setVerifyStatus(EmailVerificationStatus.SendError);
        }
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col">
            <TopMenu />
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

                    {verifyStatus === EmailVerificationStatus.Loading && (
                        <Alert className="mb-4 w-full border-indigo-500 bg-indigo-50 text-indigo-800">
                            <AlertTitle>Reenviando código...</AlertTitle>
                        </Alert>
                    )}
                    {verifyStatus === EmailVerificationStatus.Success && (
                        <Alert className="mb-4 w-full border-green-500 bg-green-50 text-green-800">
                            <AlertTitle className="text-green-700">Código reenviado com sucesso!</AlertTitle>
                        </Alert>
                    )}
                    {verifyStatus === EmailVerificationStatus.SendError && (
                        <Alert className="mb-4 w-full border-red-500 bg-red-50 text-red-800">
                            <AlertTitle>Erro ao reenviar código!</AlertTitle>
                        </Alert>
                    )}
                    {verifyStatus === EmailVerificationStatus.VerifyError && (
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