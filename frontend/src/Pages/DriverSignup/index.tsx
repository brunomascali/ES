import axios from "axios";
import TopMenu from "../../components/TopMenu";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { Button } from "../../components/ui/button";

enum DriverSignupStatus {
    IDLE = 0,
    SUCCESS = 1,
    ERROR = 2,
}

interface AlterRoleRequest {
    email: string;
    role: "DRIVER" | "PASSENGER";
    action: "add" | "remove";
}

export default function DriverSignup() {
    const { user, setUser } = useContext(AuthContext);
    const [cnh, setCnh] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [driverSignupStatus, setDriverSignupStatus] = useState(DriverSignupStatus.IDLE);

    const validateCnhForm = (): string[] => {
        let errors = [];
        if (cnh.length !== 11) {
            errors.push("A CNH deve ter 11 dígitos");
        }
        if (Array.from(cnh).some(char => isNaN(Number(char)))) {
            errors.push("A CNH deve conter apenas números");
        }
        return errors;
    }

    const handleCnhVerification = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errors = validateCnhForm();
        if (errors.length > 0) {
            setErrors(errors);
            console.log(errors);
            return;
        }
        setErrors([]);
        setDriverSignupStatus(DriverSignupStatus.IDLE);
        
        const validateCnhResponse = await axios.post("http://127.0.0.1:8080/api/cnh/validate", {
            cnh: cnh,
            cpf: user!.cpf
        });
        
        if (validateCnhResponse.status === 200) {
            const alterRoleRequest: AlterRoleRequest = {
                email: user!.email,
                role: "DRIVER",
                action: "add"
            };

            const alterRoleResponse = await axios.put("http://127.0.0.1:8080/api/role", alterRoleRequest);
            if (alterRoleResponse.status === 200) {
                setDriverSignupStatus(DriverSignupStatus.SUCCESS);
                
                setUser(alterRoleResponse.data);
                localStorage.setItem('user', JSON.stringify(alterRoleResponse.data));
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);
            }
        }
        else if (validateCnhResponse.status === 404) {
            console.log("CNH inválida");
            setDriverSignupStatus(DriverSignupStatus.ERROR);
            setErrors(["CNH inválida"]);
        }
        
    }

    return (
        <div>
            <TopMenu activePage="cadastroMotorista" />
            <div className="container mx-auto py-8 px-4">
                <div className="flex flex-col items-center space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900 text-center">
                        Cadastro de Motorista
                    </h1>
                    
                    {driverSignupStatus === DriverSignupStatus.SUCCESS && (
                        <div className="w-full max-w-md bg-green-50 border border-green-200 rounded-lg p-4" role="alert">
                            <p className="text-green-800 font-medium mb-1">CNH verificada com sucesso!</p>
                            <small className="text-green-600">Você será redirecionado para a página inicial em instantes...</small>
                        </div>
                    )}

                    {driverSignupStatus === DriverSignupStatus.ERROR && (
                        <div className="w-full max-w-md bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
                            <p className="text-red-800 font-medium mb-1">Erro ao verificar CNH!</p>
                        </div>
                    )}

                    {errors.length > 0 && (
                        <div className="w-full max-w-md bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
                            {errors.map((error, index) => (
                                <p key={index} className="text-red-800 text-sm mb-1">{error}</p>
                            ))}
                        </div>
                    )}
                    
                    <form onSubmit={handleCnhVerification} className="w-full max-w-md space-y-6">
                        <div>
                            <label htmlFor="cnh" className="block text-sm font-medium text-gray-700 mb-2">
                                Número da CNH
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                id="cnh"
                                name="cnh"
                                maxLength={11}
                                placeholder="Digite o número da sua CNH"
                                value={cnh}
                                onChange={e => setCnh(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
                        >
                            Verificar CNH
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}