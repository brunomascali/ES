export type LoginFormData = {
    email: string;
    password: string;
}

export function validateLoginForm(formData: LoginFormData): boolean {
    if (!formData.email.endsWith("ufrgs.br")) {
        return false;
    }

    return true;
}