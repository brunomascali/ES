import { useEffect, useState } from "react";
import type { IPassenger } from "../../types/Passenger";
import type { IRide } from "../../types/Ride";
import { Block } from ".";
import { Users } from "lucide-react";
import api from "../../services/api";

export default function Passengers({ ride }: { ride: IRide | null }) {
    const [passengers, setPassengers] = useState<IPassenger[]>([]);

    useEffect(() => {
        const fetchPassengers = async () => {
            const response = await api.get(`/rides/passengers/${ride?.id}`);
            if (response.status === 200) {
                const mappedPassengers: IPassenger[] = (response.data as any[]).map((item) => ({
                    ...item.passenger,
                    address: item.address,
                }));
                setPassengers(mappedPassengers);
            }
        };
        fetchPassengers();
    }, []);

    return (
        <Block title="Passageiros" icon={<Users className="w-6 h-6 text-indigo-600 mt-1" />}>
            <ul className="space-y-2 w-full">
                {passengers.map((passenger) => (
                    <li
                        key={passenger.name}
                        className="flex items-center justify-between bg-gray-100 rounded-md px-4 py-2 w-full"
                    >
                        <div className="flex flex-col w-full">
                            <p className="font-medium">Nome: {passenger.name}</p>
                            <p className="text-gray-600">Endereço: {passenger.address}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </Block>
    );
}