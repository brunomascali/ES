import TopMenu from "../../Components/TopMenu";
import RideCard from "../../Components/RideCard";
import { useEffect, useState } from "react";
import axios from "axios";

export type Ride = { 
    driver: string,
    startingAddress: string,
    latitude: number,
    longitude: number,
    availableSeats: number,
    date: string,
    arrivalTime: string, 
    description: string,
    price: number,
}

export default function Caronas() {
    const [rides, setRides] = useState<Ride[]>([]);

    useEffect(() => {
        const fetchRides = async() => {
            const ridesResponse = await axios.get("http://127.0.0.1:8080/api/rides");
            if (ridesResponse.status == 200) {
                console.log(ridesResponse.data);

                const rides = ridesResponse.data.map((ride: any) => ({
                    ...ride,
                    driver: ride['driver']['name'],
                    date: ride['date'],
                    arrivalTime: ride['arrivalTime']
                })) as Ride[];
                setRides(rides);
            }
        }
        fetchRides();
    }, []);

    return (
        <div>
            <TopMenu activePage="caronas" />
            <div className="container py-5">
                <h1 className="mb-4">Caronas</h1>
                {rides.map(ride => (
                    <RideCard 
                        key={ride.driver + ride.date + ride.arrivalTime}
                        driver={ride.driver}
                        startingAddress={ride.startingAddress}
                        latitude={ride.latitude}
                        longitude={ride.longitude}
                        availableSeats={ride.availableSeats}
                        date={ride.date}
                        arrivalTime={ride.arrivalTime}
                        description={ride.description}
                        price={ride.price}
                    />
                ))}
            </div>
        </div>
    );
}

