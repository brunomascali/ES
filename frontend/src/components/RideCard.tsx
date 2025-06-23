import { Calendar, Clock, DollarSign, Users, MapPin } from "lucide-react";
import Minimap from "./Minimap";
import { useEffect, useState } from "react";
import { Block } from "../Pages/RideDetails";
import { useAuth } from "../hooks/useAuth";
import DayPicker from "./DayPicker";
import type { IRide } from "src/types/Ride";
import { isDriver } from "../utils/Roles";
import { getAverageDriverRating } from "../services/ratingService";

export default function RideCard(ride: IRide) {
    const { user } = useAuth();
    const [isPassenger, setIsPassenger] = useState(false);
    const isDriver = ride.driver.cpf === user?.cpf;
    const [driverRating, setDriverRating] = useState<number>(5.0);

    console.log(ride);

    useEffect(() => {
        const fetchDriverRating = async () => {
            const rating = await getAverageDriverRating(ride.driver.cpf);
            setDriverRating(rating);
        };
        fetchDriverRating();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-start gap-2">
                            {isDriver ? (
                                <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Você é Motorista
                                </span>
                            ) : (
                                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Motorista: {ride.driver.name}
                                </span>
                            )}
                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                Avaliação do Motorista: {driverRating.toFixed(2)}
                            </span>
                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                {ride.availableSeats} {ride.availableSeats === 1 ? 'vaga' : 'vagas'}
                            </span>
                            {isPassenger && (
                                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Você é Passageiro
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Block title="Dias" icon={<Calendar className="w-6 h-6 text-indigo-600 mt-1" />}>
                                <DayPicker offerRideData={ride} />
                            </Block>

                            <Block title="Horário de Chegada" icon={<Clock className="w-6 h-6 text-indigo-600 mt-1" />}>
                                <p className="text-base font-semibold text-gray-900">
                                    {ride.arrivalTime.length === 5 ? ride.arrivalTime : ride.arrivalTime.slice(0, 5)}
                                </p>
                            </Block>

                            <Block title="Preço" icon={<DollarSign className="w-6 h-6 text-green-600 mt-1" />}>
                                <p className="text-base font-semibold text-green-600">
                                    R$ {ride.price.toFixed(2)}
                                </p>
                            </Block>

                            <Block title="Local de Partida" icon={<MapPin className="w-6 h-6 text-indigo-600 mt-1" />}>
                                <p className="text-base font-semibold text-gray-900 truncate" title={ride.startAddress}>
                                    {ride.startAddress}
                                </p>
                            </Block>
                        </div>

                        <button
                            onClick={() => window.location.href = `/caronas/${ride.id}`}
                            className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                            <Users className="w-5 h-5" />
                            <span>Ver Detalhes</span>
                        </button>
                    </div>

                    <div className="lg:w-80">
                        <div className="bg-gray-100 rounded-lg overflow-hidden h-48 lg:h-full">
                            <Minimap address={ride.startAddress} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
