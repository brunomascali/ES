import type { IUser } from "src/types/User";

export function isDriver(user: IUser | null) {
    return user?.roles.includes("DRIVER");
}

export function isPassenger(user: IUser | null) {
    return user?.roles.includes("PASSENGER");
}

export function isAdmin(user: IUser | null) {
    return user?.roles.includes("ADMIN");
}