import api from "./api";
import type { AlterRoleRequest, ValidateCnhRequest } from "../types/requests";
import { DriverSignupStatus } from "../types/enums/DriverSignupStatus";
import type { IUser } from "../types/User";

const validateCnhForm = (cnhRequest: ValidateCnhRequest): string[] => {
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

export const handleCnhVerification = async (e: React.FormEvent<HTMLFormElement>, cnhRequest: ValidateCnhRequest, setErrors: (errors: string[]) => void, setDriverSignupStatus: (status: DriverSignupStatus) => void, setUser: (user: IUser) => void, user: IUser) => {
    e.preventDefault();
    let errors = validateCnhForm(cnhRequest);
    if (errors.length > 0) {
        setErrors(errors);
        console.log(errors);
        return;
    }
    setErrors([]);
    setDriverSignupStatus(DriverSignupStatus.Idle);

    try {
        const validateCnhResponse = await api.post("/driver/validate", cnhRequest);
        if (validateCnhResponse.status === 200) {
            const alterRoleRequest: AlterRoleRequest = {
                email: user!.email,
                role: "DRIVER",
                action: "add"
            };

            const alterRoleResponse = await api.put("/role", alterRoleRequest);
            if (alterRoleResponse.status === 200) {
                setDriverSignupStatus(DriverSignupStatus.Success);

                setUser(alterRoleResponse.data);
                localStorage.setItem('user', JSON.stringify(alterRoleResponse.data));
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            }
        }
    } catch (error: any) {
        if (error.response.status === 404) {
            setDriverSignupStatus(DriverSignupStatus.Error);
            setErrors(["Informações inválidas"]);
        }
    }
}