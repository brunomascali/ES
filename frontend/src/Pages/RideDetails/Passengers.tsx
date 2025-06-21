import { useEffect, useState } from "react";
import type { IPassenger } from "../../types/Passenger";
import type { IRide } from "../../types/Ride";
import { Block } from ".";
import { Users } from "lucide-react";
import api from "../../services/api";
import StarRating from "../../components/StarRating";
import { useAuth } from "../../hooks/useAuth";

export default function Passengers({ ride }: { ride: IRide | null }) {
    const { user } = useAuth();
    const [passengers, setPassengers] = useState<IPassenger[]>([]);

    useEffect(() => {
        const fetchPassengers = async () => {
            try {
                const response = await api.get(`/rides/passengers/${ride?.id}`);
                if (response.status === 200) {
                    const mappedPassengers: IPassenger[] = (response.data as any[]).map((item) => ({
                        passenger: item.passenger,
                        address: item.address,
                    }));
                    setPassengers(mappedPassengers);
                }
            } catch (error) {
                console.error("Error fetching passengers:", error);
            }
        };
        fetchPassengers();
    }, [ride?.id]);

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
            <ul className="space-y-2 w-full">
                {passengers.map((passenger) => (
                    <li
                        key={passenger.passenger.cpf}
                        className="flex items-center justify-between bg-gray-100 rounded-md px-4 py-2 w-full"
                    >
                        <div className="gap-2 flex flex-col w-full">
                            <p className="font-medium">Nome: {passenger.passenger.name}</p>
                            <p className="text-gray-600">Endereço: {passenger.address}</p>
                            <StarRating 
                                cpf_from={user!.cpf} 
                                cpf_to={passenger.passenger.cpf} 
                                is_driver_rating={false} 
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </Block>
    );
}