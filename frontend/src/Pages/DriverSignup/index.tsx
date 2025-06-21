import TopMenu from "../../components/TopMenu";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../hooks/useAuth";
import { DriverSignupStatus } from "../../types/enums/DriverSignupStatus";
import type { ValidateCnhRequest } from "../../types/requests";
import { handleCnhVerification } from "../../services/driverService";

export default function DriverSignup() {
    const { user, setUser } = useAuth();
    const [cnhRequest, setCnhRequest] = useState<ValidateCnhRequest>({
        cnh: "11111111111",
        cpf: user!.cpf,
        plate: "ABC1234",
        model: "Ford Ka 2008",
        color: "Preto"
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [driverSignupStatus, setDriverSignupStatus] = useState(DriverSignupStatus.Idle);

    const inputs = [
        {
            label: "Número da CNH",
            name: "cnh",
            value: cnhRequest.cnh,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCnhRequest({ ...cnhRequest, cnh: e.target.value }),
            maxLength: 11
        },
        {
            label: "Placa do veículo",
            name: "plate",
            value: cnhRequest.plate,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCnhRequest({ ...cnhRequest, plate: e.target.value }),
            maxLength: 7
        },
        {
            label: "Modelo do veículo",
            name: "model",
            value: cnhRequest.model,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCnhRequest({ ...cnhRequest, model: e.target.value }),
        },
        {
            label: "Cor do veículo",
            name: "color",
            value: cnhRequest.color,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCnhRequest({ ...cnhRequest, color: e.target.value }),
        }
    ]

    return (
        <div className="fixed inset-0 min-h-screen w-full bg-gray-50 flex flex-col">
            <TopMenu />
            <div className="container mx-auto py-8 px-4">
                <div className="flex flex-col items-center space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900 text-center">
                        Cadastro de Motorista
                    </h1>

                    {driverSignupStatus === DriverSignupStatus.Success && (
                        <div className="w-full max-w-md bg-green-50 border border-green-200 rounded-lg p-4" role="alert">
                            <p className="text-green-800 font-medium mb-1">CNH verificada com sucesso!</p>
                            <small className="text-green-600">Você será redirecionado para a página inicial em instantes...</small>
                        </div>
                    )}

                    {driverSignupStatus === DriverSignupStatus.Error && (
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

                    <form onSubmit={e => handleCnhVerification(e, cnhRequest, setErrors, setDriverSignupStatus, setUser, user!)} className="w-full max-w-md space-y-6">
                        {inputs.map((input) => (
                            <div key={input.name}>
                                <label htmlFor={input.name} className="block text-sm font-medium text-gray-700 mb-2">{input.label}</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    id={input.name}
                                    name={input.name}
                                    maxLength={input.maxLength}
                                    placeholder={input.label}
                                    value={input.value}
                                    onChange={input.onChange}
                                    required={true}
                                />
                            </div>
                        ))}
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