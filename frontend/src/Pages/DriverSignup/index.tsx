import axios from "axios";
import TopMenu from "../../Components/TopMenu";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";

interface AlterRoleRequest {
    email: string;
    role: "DRIVER" | "PASSENGER";
    action: "add" | "remove";
}

export default function DriverSignup() {
    const { user, setUser } = useContext(AuthContext);
    const [cnh, setCnh] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);

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
                setIsSuccess(true);
                
                setTimeout(() => {
                    setUser(alterRoleResponse.data);
                    localStorage.setItem('user', JSON.stringify(alterRoleResponse.data));
                    window.location.href = "/";
                }, 3000);
            }
        }
        
    }

    return (
        <div>
            <TopMenu activePage="cadastroMotorista" />
            <div className="container py-5 d-flex flex-column align-items-center">
                <h1>Cadastro de Motorista</h1>
                {isSuccess && (
                    <div className="alert alert-success" role="alert">
                        <p className="mb-0">CNH verificada com sucesso!</p>
                        <small>Você será redirecionado para a página inicial em instantes...</small>
                    </div>
                )}
                {errors.length > 0 && (
                    <div className="mt-2 alert alert-danger" role="alert">
                        {errors.map(error => (
                            <small className="d-block">{error}</small>
                        ))}
                    </div>
                )}
                <form onSubmit={handleCnhVerification}>
                    <div className="mb-3">
                        <label htmlFor="cnh" className="form-label">
                            Número da CNH
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="cnh"
                            name="cnh"
                            maxLength={11}
                            placeholder="Digite o número da sua CNH"
                            value={cnh}
                            onChange={e => setCnh(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Verificar CNH
                    </button>
                </form>
            </div>
        </div>
    );
}