import type { IPassenger } from "./Passenger";
import type { IUser } from "./User";

export interface IRide { 
    id: string,
    driver: IUser,
    startAddress: string,
    latitude: number,
    longitude: number,
    availableSeats: number,
    days: number,
    arrivalTime: string, 
    description: string,
    price: number,
    passengers: IPassenger[]
}