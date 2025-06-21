import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { IRide } from "../../types/Ride";
import { Button } from "../../components/ui/button";
import { Users } from "lucide-react";
import api from "../../services/api";

export default function RequestRideForm({ ride }: { ride: IRide | null }) {
    const { user } = useAuth();
    const [request, setRequest] = useState({
        rideId: ride!.id,
        userCPF: user?.cpf,
        userAddress: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.post("/rides/requestRide", request);
            if (response.status === 200) {
                alert("Carona solicitada com sucesso!");
            }
        } catch (error) {
            alert("Carona já solicitada por este usuário");
        }
    }

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}>
            <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                Endereço de Embarque
            </label>
            <input
                type="text"
                id="address"
                name="address"
                value={request.userAddress}
                onChange={(e) => setRequest({ ...request, userAddress: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Digite seu endereço para embarque"
                required
            />
            <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                type="submit"
            >
                <Users className="w-5 h-5" />
                <span>Pedir Carona</span>
            </Button>
        </form>
    );
}