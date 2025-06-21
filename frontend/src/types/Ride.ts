import type { IPassenger } from "./Passenger";
import type { User } from "./User";

export interface IRide { 
    id: string,
    driver: User,
    startAddress: string,
    latitude: number,
    longitude: number,
    availableSeats: number,
    date: string,
    arrivalTime: string, 
    description: string,
    price: number,
    passengers: IPassenger[]
}