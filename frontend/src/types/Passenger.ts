export interface IPassenger {
    passengerName: string;
    passengerCPF: string;
    address: string;
    rating: number;
};

export interface IDeletePassenger {
    rideId: number;
    passengerCpf: string;
}