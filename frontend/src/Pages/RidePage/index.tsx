import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IRide } from "../Rides";
import axios from "axios";
import TopMenu from "../../components/TopMenu";
import Minimap from "../../components/Minimap";
import { AuthContext } from "../../context/Auth";
import { Button } from "../../components/ui/button";
import { Calendar, Clock, DollarSign, Users, MapPin, FileText, Car } from "lucide-react";

interface IDriverInfo {
    id: string;
    driver: {
        name:string;
    };
    plate: string;
    color: string;
    model: string; 
}

export default function RidePage() {
    const { user } = useContext(AuthContext);
    const { id } = useParams<{ id: string }>();
    const [ride, setRide] = useState<IRide | null>(null);
    const [driverInfo, setDriverInfo] = useState<IDriverInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRide = async () => {
            try {
                const rideResponse = await axios.get(`http://127.0.0.1:8080/api/rides/${id}`);
                const driverInfoResponse = await axios.get(`http://127.0.0.1:8080/api/driver/${rideResponse.data.driver.id}`);
                if (rideResponse.status === 200 && driverInfoResponse.status === 200) {
                    setRide(rideResponse.data as IRide);
                    setDriverInfo(driverInfoResponse.data as IDriverInfo);
                } else {
                    throw new Error("Failed to fetch ride or driver info");
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRide();
    }, [id]);

    if (loading) {
        return (
            <div>
                <TopMenu />
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
        <div className="min-h-screen bg-gray-50">
            <TopMenu />
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Detalhes da Carona
                        </h1>
                        <p className="text-lg text-gray-600">
                            Oferecida por <span className="font-semibold text-indigo-600">{ride?.driver.name === user?.name ? "Você" : ride?.driver.name}</span>
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                                        <Calendar className="w-6 h-6 text-indigo-600 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Data</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {ride?.date ? new Date(ride.date).toLocaleDateString('pt-BR') : ""}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                                        <Clock className="w-6 h-6 text-indigo-600 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Horário de Chegada</p>
                                            <p className="text-lg font-semibold text-gray-900">{ride?.arrivalTime}</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                                        <DollarSign className="w-6 h-6 text-green-600 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Preço</p>
                                            <p className="text-lg font-semibold text-green-600">
                                                R$ {ride?.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                                        <Users className="w-6 h-6 text-indigo-600 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Vagas Disponíveis</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {ride?.availableSeats}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                                    <MapPin className="w-6 h-6 text-indigo-600 mt-1" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Local de Partida</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {ride?.startAddress}
                                        </p>
                                    </div>
                                </div>

                                    <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                                        <Car className="w-6 h-6 text-indigo-600 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Veículo</p>
                                            <p className="text-lg font-semibold text-gray-900">{driverInfo?.model} {driverInfo?.color} - {driverInfo?.plate}</p>
                                        </div>
                                    </div>

                                {ride?.description && (
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                                        <FileText className="w-6 h-6 text-indigo-600 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Descrição</p>
                                            <p className="text-lg text-gray-900">{ride.description}</p>
                                        </div>
                                    </div>
                                )}

                                <button
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    <Users className="w-5 h-5" />
                                    <span>{ride?.driver.name === user?.name ? "Cancelar Carona" : "Pedir Carona"}</span>
                                </button>
                            </div>

                            <div className="flex justify-center items-start">
                                <div className="bg-gray-100 rounded-lg overflow-hidden w-full h-80">
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
