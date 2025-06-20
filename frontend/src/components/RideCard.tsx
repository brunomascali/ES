import { Calendar, Clock, DollarSign, Users, MapPin, Car } from "lucide-react";
import type { IRide } from "../Pages/Rides";
import Minimap from "./Minimap";

export default function RideCard(ride: IRide) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                {ride.availableSeats} {ride.availableSeats === 1 ? 'vaga' : 'vagas'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-3 flex items-start space-x-3">
                                <Calendar className="w-5 h-5 text-indigo-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Data</p>
                                    <p className="text-base font-semibold text-gray-900">{formatDate(ride.date)}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 flex items-start space-x-3">
                                <Clock className="w-5 h-5 text-indigo-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Horário de Chegada</p>
                                    <p className="text-base font-semibold text-gray-900">
                                        {ride.arrivalTime.length === 5 ? ride.arrivalTime : ride.arrivalTime.slice(0, 5)}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 flex items-start space-x-3">
                                <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Preço</p>
                                    <p className="text-base font-semibold text-green-600">
                                        R$ {ride.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-indigo-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Local de Partida</p>
                                    <p className="text-base font-semibold text-gray-900 truncate" title={ride.startAddress}>
                                        {ride.startAddress}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => window.location.href = `/caronas/${ride.id}`}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
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