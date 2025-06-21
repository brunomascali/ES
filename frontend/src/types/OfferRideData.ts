export interface OfferRideData {
    driverCPF: string,
    startingAddress: string,
    latitude: number,
    longitude: number,
    availableSeats: 1 | 2 | 3,
    days: number,
    arrivalTime: string, 
    description: string,
    price: number,
};