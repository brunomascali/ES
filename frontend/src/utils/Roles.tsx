import type { User } from "src/types/User";

export function isDriver(user: User | null) {
    return user?.roles.includes("DRIVER");
}

export function isPassenger(user: User | null) {
    return user?.roles.includes("PASSENGER");
}

export function isAdmin(user: User | null) {
    return user?.roles.includes("ADMIN");
}