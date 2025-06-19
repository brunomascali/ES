import TopMenu from "../../components/TopMenu";
import RideCard from "../../components/RideCard";
import { useEffect, useState } from "react";
import axios from "axios";

export interface Ride { 
    id: number,
    driver: string,
    startAddress: string,
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRides = async() => {
            try {
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
            <div>
                <TopMenu activePage="caronas" />
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
        <div>
            <TopMenu activePage="caronas" />
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Caronas Disponíveis
                    </h1>
                    
                    {rides.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma carona disponível</h3>
                            <p className="text-gray-500">Não há caronas disponíveis no momento. Tente novamente mais tarde.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {rides.map((ride, index) => (
                                <RideCard 
                                    key={ride.id}
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
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
