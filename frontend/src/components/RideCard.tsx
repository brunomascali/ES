import { Calendar, Clock, DollarSign, Users, MapPin } from "lucide-react";
import type { IPassenger, IRide } from "../Pages/Rides";
import Minimap from "./Minimap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import { Block } from "../Pages/RidePage";

export default function RideCard(ride: IRide) {
    const { user } = useContext(AuthContext);
    const [isPassenger, setIsPassenger] = useState(false);

    useEffect(() => {
        setIsPassenger(ride.passengers.some((passenger: IPassenger) => passenger.passenger.cpf === user?.cpf));
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-start gap-2">
                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                Motorista: {ride.driver}
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
                            <Block title="Data" icon={<Calendar className="w-6 h-6 text-indigo-600 mt-1" />}>
                                    <p className="text-base font-semibold text-gray-900">{formatDate(ride.date)}</p>
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
                            <Minimap width={320} height={240} address={ride.startAddress} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}