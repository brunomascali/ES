import { useEffect, useState } from "react";
import { Block } from ".";
import { Users, MapPin, Star, CheckCircle2, XCircle } from "lucide-react";
import api from "../../services/api";
import StarRating from "../../components/StarRating";
import { useAuth } from "../../hooks/useAuth";
import type { IRideRequest } from "../../types/RideRequest";
import { getAveragePassengerRating } from "../../services/ratingService";
import { Button } from "../../components/ui/button";
import type { IDeletePassenger } from "../../types/Passenger";

export default function Passengers({ rideId }: { rideId: number }) {
    const { user } = useAuth();
    const [passengers, setPassengers] = useState<IRideRequest[]>([]);
    const [ratings, setRatings] = useState<number[]>([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const requests = await api.get(`/rides/requests/${rideId}`);
                const acceptedRequests = requests.data.filter((request: IRideRequest) => request.accepted);
                setPassengers(acceptedRequests);

                if (acceptedRequests.length > 0) {

                    const ratings = await Promise.all(
                        acceptedRequests.map((request: IRideRequest) =>
                            getAveragePassengerRating(request.userCPF)
                        )
                    );
                    setRatings(ratings);
                }
            } catch (error) {
                console.error("Erro ao buscar solicitações e avaliações:", error);
            }
        };

        fetchRequests();
    }, [rideId]);

    const handleRemovePassenger = async (passengerCpf: string) => {
        const deletePassengerDTO: IDeletePassenger = {
            rideId: Number(rideId),
            passengerCpf: passengerCpf
        }
        const response = await api.delete(`/rides/deletePassenger`, { data: deletePassengerDTO });
        if (response.status === 200) {
            alert("Passageiro removido com sucesso!");
        }
    };

    if (!passengers.length) {
        return (
            <Block title="Passageiros" icon={<Users className="w-6 h-6 text-indigo-600 mt-1" />}>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">Nenhum passageiro confirmado</p>
                </div>
            </Block>
        );
    }

    return (
        <Block title="Passageiros" icon={<Users className="w-6 h-6 text-indigo-600 mt-1" />}>
            <ul className="space-y-4 w-full">
                {passengers.map((passenger, index) => (
                    <li key={passenger.id} className="bg-white shadow-sm border border-gray-100 rounded-lg p-4 transition-all hover:shadow-md">
                        <div className="gap-3 flex flex-col w-full">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">{passenger.userName}</h3>
                                {passenger.paid ? (
                                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Pago
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-red-500 text-sm font-medium">
                                        <XCircle className="w-4 h-4" />
                                        Não pago
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <p className="text-sm">{passenger.userAddress}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className={`text-sm font-medium ${!ratings[index] ? 'text-gray-500' :
                                        ratings[index] <= 3.5 ? 'text-red-500' : 'text-green-500'
                                    }`}>
                                    {ratings[index] ?
                                        `Avaliação: ${ratings[index].toFixed(1)}` :
                                        "Não avaliado"
                                    }
                                </span>
                            </div>

                            <div className="border-t border-gray-100 pt-3 mt-1">
                                <StarRating
                                    cpf_from={user!.cpf!}
                                    cpf_to={passenger.userCPF}
                                    is_driver_rating={false}
                                />
                                <Button type="button"
                                    className="mt-4 cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                                    onClick={() => handleRemovePassenger(passenger.userCPF)}
                                    >
                                        Excluir passageiro
                                    </Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </Block>
    );
}