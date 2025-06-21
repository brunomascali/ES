import type { SignupFormData } from "../types/SignUpFormData";

export const validateSignupForm = (input: SignupFormData) => {
    let errors = [];
    if (input.password !== input.confirmPassword) {
        errors.push('As senhas não coincidem');
    }
    if (!input.email.endsWith('ufrgs.br')) {
        errors.push('O email deve ser do domínio ufrgs.br');
    }
    if (new Date(input.dateOfBirth) > new Date()) {
        errors.push('A data de nascimento não pode ser maior que a data atual');
    }
    if (new Date(input.dateOfBirth) > new Date(new Date().setFullYear(new Date().getFullYear() - 18))) {
        errors.push('Você deve ter pelo menos 18 anos');
    }
    if (input.cpf.length !== 11) {
        errors.push('O CPF deve ter 11 dígitos');
    }
    return errors;
}