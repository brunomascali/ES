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

interface ValidateCnhRequest {
    cnh: string;
    cpf: string;
    plate: string;

    model: string;
    color: string;
}

export default function DriverSignup() {
    const { user, setUser } = useContext(AuthContext);
    const [cnhRequest, setCnhRequest] = useState<ValidateCnhRequest>({
        cnh: "11111111111",
        cpf: user!.cpf,
        plate: "ABC1234",
        model: "Ford Ka 2008",
        color: "Preto"
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [driverSignupStatus, setDriverSignupStatus] = useState(DriverSignupStatus.IDLE);

    const validateCnhForm = (): string[] => {
        let errors = [];
        if (cnhRequest.cnh.length !== 11) {
            errors.push("A CNH deve ter 11 dígitos");
        }
        if (cnhRequest.plate.length !== 7) {
            errors.push("A placa deve ter 7 caracteres");
        }
        if (Array.from(cnhRequest.cnh).some(char => isNaN(Number(char)))) {
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

        try {
            const validateCnhResponse = await axios.post("http://127.0.0.1:8080/api/driver/validate", cnhRequest);
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
                    }, 1000);
                }
            }
        } catch (error: any) {
            if (error.response.status === 404) {
                setDriverSignupStatus(DriverSignupStatus.ERROR);
                setErrors(["Informações inválidas"]);
            }
        }
    }

    return (
        <div>
            <TopMenu />
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
                                value={cnhRequest.cnh}
                                onChange={e => setCnhRequest({ ...cnhRequest, cnh: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="plate" className="block text-sm font-medium text-gray-700 mb-2">
                                Placa do veículo
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                id="plate"
                                name="plate"
                                maxLength={7}
                                placeholder="ABC1234"
                                value={cnhRequest.plate}
                                onChange={e => setCnhRequest({ ...cnhRequest, plate: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                                Modelo do veículo
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                id="model"
                                name="model"
                                placeholder="Digite o modelo do seu veículo"
                                value={cnhRequest.model}
                                onChange={e => setCnhRequest({ ...cnhRequest, model: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                                Cor do veículo
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                id="color"
                                name="color"
                                placeholder="Digite a cor do seu veículo"
                                value={cnhRequest.color}
                                onChange={e => setCnhRequest({ ...cnhRequest, color: e.target.value })}
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