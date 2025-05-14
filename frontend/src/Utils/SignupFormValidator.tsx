
export type SignupFormData = {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    dateOfBirth: string;
    cpf: string;
}

export function validateForm(formData: SignupFormData): boolean {
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