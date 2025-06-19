import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Ride } from "../Rides";
import axios from "axios";
import TopMenu from "../../components/TopMenu";
import Minimap from "../../components/Minimap";
import AvailableSeatsIcons from "../../components/AvailableSeatsIcons";

export default function RidePage() {
    const { id } = useParams<{ id: string }>();
    const [ride, setRide] = useState<Ride | null>(null);

    useEffect(() => {
        const fetchRide = async () => {
            const rideResponse = await axios.get(`http://127.0.0.1:8080/api/rides/${id}`);
            if (rideResponse.status === 200) {
                const rideData = rideResponse.data as Ride;
                console.log(rideData);
                setRide(rideData);
            }
            else {
                console.log("Erro ao buscar carona");
            }
        }
        fetchRide();
    }, []);

    const handleJoinRide = () => {
        // TODO: Implement join ride functionality
        console.log("Joining ride:", ride?.id);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <TopMenu activePage="caronas" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Detalhes da Carona</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Informações da Carona</h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <p className="text-lg text-gray-700">
                                    <span className="font-medium">Data:</span> {ride?.date}
                                </p>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <p className="text-lg text-gray-700">
                                    <span className="font-medium">Horário de Chegada:</span> {ride?.arrivalTime}
                                </p>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <p className="text-lg text-gray-700">
                                    <span className="font-medium">Preço:</span> R$ {ride?.price.toFixed(2)}
                                </p>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <p className="text-lg text-gray-700">
                                    <span className="font-medium">Vagas Disponíveis:</span> {ride?.availableSeats}
                                </p>
                            </div>
                            
                            {ride?.description && (
                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <div className="text-lg text-gray-700">
                                        <span className="font-medium">Descrição:</span>
                                        <span className="block whitespace-pre-line break-words">{ride?.description}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                <form
                    className="flex flex-col space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        // You can handle the submit logic here, e.g., call a function to request to join the ride
                        // Example: handleAddressSubmit(addressInput)
                    }}
                >
                    <label className="text-lg text-gray-700 font-medium" htmlFor="address">
                        Seu endereço para embarque:
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Digite seu endereço para embarque"
                        required
                        // You may want to use a state variable for value and onChange
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Solicitar para entrar na carona
                    </button>
                </form>
                    </div>
                    

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Localização</h2>
                        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Minimap width={500} height={350} address={ride?.startAddress || ""} />
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-gray-700">
                                <span className="font-medium">Endereço de Partida:</span> {ride?.startAddress}
                            </p>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    );
}
