import TopMenu from "../../components/TopMenu";
import RideCard from "../../components/RideCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Users } from "lucide-react";
import type { User } from "../../context/Auth";

export interface IPassenger {
    address: string,
    passenger: User 
}

export interface IRide { 
    id: string,
    driver: string,
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

export default function Rides() {
    const [rides, setRides] = useState<IRide[]>([]);
    const [isPassenger, setIsPassenger] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRides = async() => {
            try {
                const ridesResponse = await axios.get("http://127.0.0.1:8080/api/rides");
                if (ridesResponse.status == 200) {
                    console.log(ridesResponse.data);

                    const rides = ridesResponse.data.map((ride: any) => ({
                        ...ride,
                        driver: ride['driver'],
                        date: ride['date'],
                        arrivalTime: ride['arrivalTime']
                    })) as IRide[];
                    setRides(rides);
                }
            } catch (error) {
                console.error("Error fetching rides:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRides();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <TopMenu />
                <div className="container mx-auto py-8 px-4">
                    <div className="flex justify-center items-center min-h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 text-lg">Carregando caronas...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <TopMenu />
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Caronas Disponíveis
                        </h1>
                        <p className="text-lg text-gray-600">
                            {rides.length} {rides.length === 1 ? 'carona encontrada' : 'caronas encontradas'}
                        </p>
                    </div>
                    
                    {rides.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12">
                            <div className="text-center">
                                <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Users className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Nenhuma carona disponível
                                </h3>
                                <p className="text-gray-600 max-w-sm mx-auto">
                                    Não há caronas disponíveis no momento. Tente novamente mais tarde.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {rides.map((ride, index) => (
                                <RideCard 
                                    key={ride.driver + ride.date + ride.arrivalTime + index}
                                    id={ride.id}
                                    driver={ride.driver}
                                    startAddress={ride.startAddress}
                                    latitude={ride.latitude}
                                    longitude={ride.longitude}
                                    availableSeats={ride.availableSeats}
                                    date={ride.date}
                                    arrivalTime={ride.arrivalTime}
                                    description={ride.description}
                                    price={ride.price}
                                    passengers={ride.passengers}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
