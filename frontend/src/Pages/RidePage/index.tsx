import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IRide } from "../Rides";
import axios from "axios";
import TopMenu from "../../components/TopMenu";
import Minimap from "../../components/Minimap";
import AvailableSeatsIcons from "../../components/AvailableSeatsIcons";

export default function RidePage() {
    const { id } = useParams<{ id: string }>();
    const [ride, setRide] = useState<IRide | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRide = async () => {
            try {
                const rideResponse = await axios.get(`http://127.0.0.1:8080/api/rides/${id}`);
                if (rideResponse.status === 200) {
                    setRide(rideResponse.data as IRide);
                }
            } catch (error) {
                // Optionally handle error
            } finally {
                setLoading(false);
            }
        };
        fetchRide();
    }, [id]);

    if (loading) {
        return (
            <div>
                <TopMenu activePage="caronas" />
                <div className="container mx-auto py-8 px-4">
                    <div className="flex justify-center items-center min-h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 text-lg">Carregando carona...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <TopMenu activePage="caronas" />
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Detalhes da Carona
                    </h1>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <p className="text-lg text-gray-700 font-medium">
                                    <span className="block mb-1">Data:</span> {ride?.date ? new Date(ride.date).toLocaleDateString('pt-BR') : ""}
                                </p>
                                <p className="text-lg text-gray-700 font-medium">
                                    <span className="block mb-1">Horário de chegada:</span> {ride?.arrivalTime}
                                </p>
                                <p className="text-lg text-gray-700 font-medium">
                                    <span className="block mb-1">Preço:</span> R$ {ride?.price.toFixed(2)}
                                </p>
                                <p className="text-lg text-gray-700 font-medium">
                                    <span className="block mb-1">Vagas Disponíveis:</span> {ride?.availableSeats}
                                </p>
                                <p className="text-lg text-gray-700 font-medium">
                                    <span className="block mb-1">Descrição:</span> {ride?.description}
                                </p>
                                <button
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer mt-4"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    Entrar na Carona
                                </button>
                            </div>
                            <div className="flex justify-center items-start">
                                <div className="bg-gray-100 rounded-lg overflow-hidden w-full h-80 flex items-center justify-center">
                                    <Minimap width={640} height={320} address={ride?.startAddress || ""} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
