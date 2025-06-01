export type VerifyEmailFormData = {
    email: string;
    code: string;
}

export function validateVerifyEmailForm(formData: VerifyEmailFormData): boolean {
    let errors: string[] = [];
    if (formData.code.length !== 6) {
        errors.push("O código de verificação deve ter 6 dígitos");
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    return true;
}