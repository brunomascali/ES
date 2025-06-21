import type { IRideRequest } from "../../types/RideRequest";
import { Button } from "../../components/ui/button";
import { Users, MapPin, Check, X } from "lucide-react";
import api from "../../services/api";
import { Block } from ".";
import { useState, useEffect } from "react";
import { getAveragePassengerRating } from "../../services/ratingService";

export default function RideRequests({ rideRequest }: { rideRequest: IRideRequest[] }) {
    const [pendingRequests, setPendingRequests] = useState(rideRequest);
    const [passengerRatings, setPassengerRatings]   = useState<number[]>([]);
    const [rating, setRating] = useState<number>(5);

    useEffect(() => {
        const fetchPassengerRatings = async () => {
            const ratings = await Promise.all(pendingRequests.map(request => getAveragePassengerRating(request.userCPF)));
            setPassengerRatings(ratings);
        };
        fetchPassengerRatings();
    }, [pendingRequests]);

    const handleAcceptRide = async (rideId: string, userAddress: string, userCPF: string) => {
        try {
            const rideRequest: IRideRequest = {
                rideId: rideId,
                userCPF: userCPF,
                userAddress: userAddress,
            };
            const response = await api.post(`http://127.0.0.1:8080/api/rides/acceptPassenger`, rideRequest);
            if (response.status === 200) {
                setPendingRequests(prev => prev.filter(req => req.userCPF !== userCPF));
                alert("Carona aceita com sucesso!");
            }
        } catch (error) {
            alert("Erro ao aceitar carona. Tente novamente.");
        }
    }

    const handleRejectRide = async (rideId: string, userAddress: string, userCPF: string) => {
        try {
            const rideRequest: IRideRequest = {
                rideId: rideId,
                userCPF: userCPF,
                userAddress: userAddress,
            };
            const response = await api.post(`http://127.0.0.1:8080/api/rides/rejectPassenger`, rideRequest);
            if (response.status === 200) {
                setPendingRequests(prev => prev.filter(req => req.userCPF !== userCPF));
                alert("Carona rejeitada com sucesso!");
            }
        } catch (error) {
            alert("Erro ao rejeitar carona. Tente novamente.");
        }
    }

    if (pendingRequests.length === 0) {
        return (
            <Block title="Solicitações de Carona" icon={<Users className="w-6 h-6 text-indigo-600 mt-1" />}>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">Nenhuma solicitação pendente</p>
                </div>
            </Block>
        );
    }

    return (
        <Block title="Solicitações de Carona" >
            <div className="space-y-4 mt-2">
                {pendingRequests.map((request, index) => (
                    <div
                        key={request.rideId}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:border-indigo-200 transition-all duration-200"
                    >
                        <div className="p-4">
                            <div className="flex items-start space-x-3 mb-3">
                                <div className="bg-indigo-100 rounded-full p-2">
                                    <Users className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mt-1 text-gray-600">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        <p className="text-sm font-medium">{request.userAddress}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm">Avaliação: {passengerRatings[index]}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <Button
                                    onClick={() => handleAcceptRide(request.rideId, request.userAddress, request.userCPF)}
                                    className="cursor-pointer flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    Aceitar
                                </Button>
                                <Button
                                    onClick={() => handleRejectRide(request.rideId, request.userAddress, request.userCPF)}
                                    className="cursor-pointer flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Rejeitar
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Block>
    );
}