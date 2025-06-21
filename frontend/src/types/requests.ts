export type UserRole = "DRIVER" | "PASSENGER" | "ADMIN";
export type RoleAction = "add" | "remove";

export interface AlterRoleRequest {
  email: string;
  role: UserRole;
  action: RoleAction;
}

export interface ValidateCnhRequest {
  cnh: string;
  cpf: string;
  plate: string;
  model: string;
  color: string;
}