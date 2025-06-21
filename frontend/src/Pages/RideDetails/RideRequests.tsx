import type { IRideRequest } from "../../types/RideRequest";
import { Button } from "../../components/ui/button";
import { Users } from "lucide-react";
import api from "../../services/api";
import { Block } from ".";

export default function RideRequests({ rideRequest }: { rideRequest: IRideRequest[] }) {

    const handleAcceptRide = async (rideId: string, userAddress: string, userCPF: string) => {
        const rideRequest: IRideRequest = {
            rideId: rideId,
            userCPF: userCPF,
            userAddress: userAddress,
        };
        const response = await api.post(`http://127.0.0.1:8080/api/rides/acceptPassenger`, rideRequest);
        if (response.status === 200) {
            alert("Carona aceita com sucesso!");
        }
    }

    const handleRejectRide = async (rideId: string, userAddress: string, userCPF: string) => {
        const rideRequest: IRideRequest = {
            rideId: rideId,
            userCPF: userCPF,
            userAddress: userAddress,
        };
        const response = await api.post(`http://127.0.0.1:8080/api/rides/rejectPassenger`, rideRequest);
        if (response.status === 200) {
            alert("Carona rejeitada com sucesso!");
        }
    }

    return (
        <Block title="Solicitações de Carona" icon={<Users className="w-6 h-6 text-indigo-600 mt-1" />}>
            <div className="space-y-4 mt-2">
                {rideRequest.map((request) => (
                    <div
                        key={request.rideId}
                        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors duration-200"
                    >
                        <div className="px-6 py-4">
                            <p className="text-lg font-medium text-gray-900 text-center">{request.userAddress}</p>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-100">
                            <Button
                                onClick={() => handleAcceptRide(request.rideId, request.userAddress, request.userCPF)}
                                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-none transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Users className="w-4 h-4" />
                                Aceitar
                            </Button>
                            <Button
                                onClick={() => handleRejectRide(request.rideId, request.userAddress, request.userCPF)}
                                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-none transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Users className="w-4 h-4" />
                                Rejeitar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Block>
    );
}