import TopMenu from "../../components/TopMenu";
import RideCard from "../../components/RideCard";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import type { IRide } from "../../types/Ride";
import api from "../../services/api";
import { getAverageDriverRating } from "../../services/ratingService";

export default function Rides() {
    const [rides, setRides] = useState<IRide[]>([]);
    const [isPassenger, setIsPassenger] = useState(false);
    const [loading, setLoading] = useState(true);

    const [searchDriverName, setSearchDriverName] = useState("");
    const [searchMinRating, setSearchMinRating] = useState(5);

    const [searchResults, setSearchResults] = useState<IRide[]>([]);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const ridesResponse = await api.get("/rides");
                if (ridesResponse.status == 200) {
                    const rides: IRide[] = ridesResponse.data.map((ride: any) => ({
                        ...ride,
                        driver: ride['driver'],
                        days: ride['days'],
                        arrivalTime: ride['arrivalTime']
                    }));
                    setRides(rides);
                    setSearchResults(rides);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }
        fetchRides();
    }, []);

    const handleSearch = async () => {
        setSearchResults(rides);
        if (searchDriverName.length > 0) {
            setSearchResults(rides.filter((ride) => ride.driver.name.toLowerCase().includes(searchDriverName.toLowerCase())));
        }

        else if (searchMinRating > 0) {
            const ratings = await Promise.all(
                searchResults.map(ride => getAverageDriverRating(ride.driver.cpf))
            );
            const filteredRides = searchResults.filter((ride, idx) => ratings[idx] >= searchMinRating);
            setSearchResults(filteredRides);
        }
    }

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
        <div>
            <TopMenu />
            <div className="w-full py-8 px-4">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Caronas Disponíveis
                        </h1>
                        <p className="text-lg text-gray-600">
                            {rides.length} {rides.length === 1 ? 'carona encontrada' : 'caronas encontradas'}
                        </p>
                    </div>

                    <div className="flex items-center justify-center mb-8 w-full">
                        <div className="flex items-center gap-4 flex-col w-full">
                            <h1 className="text-lg text-gray-600 mr-4">Buscar por:</h1>
                            <label htmlFor="searchDriverName">Nome do motorista</label>
                            <input
                                type="text"
                                placeholder="Buscar por nome do motorista"
                                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mr-4"
                                value={searchDriverName}
                                onChange={(e) => setSearchDriverName(e.target.value)}
                            />
                            <label htmlFor="searchMinRating">Avaliação mínima</label>
                            <input
                                type="number"
                                placeholder="Buscar por avaliação mínima"
                                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mr-4"
                                min={0}
                                max={5}
                                value={searchMinRating}
                                onChange={(e) => setSearchMinRating(Number(e.target.value))}
                            />
                            <button
                                type="button"
                                className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
                                onClick={handleSearch}
                            >Buscar</button>
                        </div>
                    </div>


                    {searchResults.length === 0 ? (
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
                            {searchResults.map((ride) => (
                                <RideCard
                                    key={ride.id}
                                    id={ride.id}
                                    driver={ride.driver}
                                    startAddress={ride.startAddress}
                                    latitude={ride.latitude}
                                    longitude={ride.longitude}
                                    availableSeats={ride.availableSeats}
                                    days={ride.days}
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
