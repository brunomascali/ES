import { Calendar, CircleDollarSign, Clock12, User, Users } from "lucide-react";
import type { IRide } from "../Pages/Rides";
import Minimap from "./Minimap";

export default function RideCard(ride: IRide) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Carona de {ride.driver}
                            </h3>
                            <div className="space-y-2 text-gray-600">
                                <p className="flex items-center">
                                    <Calendar color="#000000" />
                                    <span className="ml-2 font-medium">Data: </span> {formatDate(ride.date)}
                                </p>
                                <p className="flex items-center">
                                    <Clock12 color="#000000" />
                                    <span className="ml-2 font-medium">Horário de chegada: </span> {
                                        ride.arrivalTime.length === 5
                                            ? ride.arrivalTime
                                            : ride.arrivalTime.slice(0, 5)
                                    }
                                </p>
                                <p className="flex items-center">
                                    <CircleDollarSign color="#000000" />
                                    <span className="ml-2 font-medium">R$ {ride.price.toFixed(2)}</span>
                                </p>
                                <p className="flex items-center">
                                    <Users color="#000000" />
                                    <span className="ml-2 font-medium">{ride.availableSeats} Vagas Disponíveis</span>
                                </p>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button onClick={() => window.location.href = `/caronas/${ride.id}`} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer">
                                Ver detalhes
                            </button>
                        </div>
                    </div>

                    <div className="lg:pl-4">
                        <div className="bg-gray-100 rounded-lg overflow-hidden h-64">
                            <Minimap width={640} height={320} address={ride.startAddress} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}