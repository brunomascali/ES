import type { IRideRequest } from "../../types/RideRequest";
import { Button } from "../../components/ui/button";
import { Users, MapPin, Check, X } from "lucide-react";
import api from "../../services/api";
import { Block } from ".";
import { useState, useEffect } from "react";
import { getAveragePassengerRating } from "../../services/ratingService";

export default function RideRequests({ rideId }: { rideId: number }) {
    const [pendingRequests, setPendingRequests] = useState<IRideRequest[]>([]);
    const [ratings, setRatings] = useState<number[]>([]);
    
    useEffect(() => {
        const fetchRequests = async () => {
            const requests = await api.get(`/rides/requests/${rideId}`);
            setPendingRequests(requests.data.filter((request: IRideRequest) => !request.accepted));
            const ratings = await Promise.all(requests.data.map((request: IRideRequest) => getAveragePassengerRating(request.userCPF)));
            setRatings(ratings);
        };
        fetchRequests();
    }, [rideId]);

    const handleAcceptRide = async (rideId: string, userAddress: string, userCPF: string) => {
        const response = await api.post(`/rides/acceptPassenger`, { rideId, userAddress, userCPF });
        if (response.status === 200) {
            alert("Carona aceita com sucesso!");
        }
    };

    const handleRejectRide = async (rideId: string, userAddress: string, userCPF: string) => {
        const response = await api.post(`/rides/rejectPassenger`, { rideId, userAddress, userCPF });
        if (response.status === 200) {
            alert("Carona rejeitada com sucesso!");
        }
    };

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
                                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                        <span className={`${ratings[index] <= 3.5 ? 'text-red-500' : 'text-green-500'}`}>
                                            Avaliação: {ratings[index] ? ratings[index] : "Não avaliado"}
                                        </span>
                                    </span>
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