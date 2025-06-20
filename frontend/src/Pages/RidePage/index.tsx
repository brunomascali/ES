import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IRide } from "../Rides";
import axios from "axios";
import TopMenu from "../../components/TopMenu";
import Minimap from "../../components/Minimap";
import { AuthContext, type User } from "../../context/Auth";
import { Button } from "../../components/ui/button";
import { Calendar, Clock, DollarSign, Users, MapPin, FileText, Car } from "lucide-react";

const Block = ({ title, children, icon }: { title: string, children: React.ReactNode, icon: React.ReactNode }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4 w-full">
            <div className="flex items-start space-x-4 w-full">
                <p className="text-sm font-medium text-gray-500">{icon}</p>
                <div className="flex flex-col w-full">
                    <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
                    {children}
                </div>
            </div>
        </div>
    )
}

interface IDriverInfo {
    id: string;
    driver: {
        name: string;
    };
    plate: string;
    color: string;
    model: string;
};

interface IRideRequest {
    rideId: string;
    userCPF: string;
    userAddress: string;
};

interface IPassenger {
    address: string;
    name: string;
};


const RequestRideForm = ({ ride }: { ride: IRide | null }) => {
    const { user } = useContext(AuthContext);
    const [request, setRequest] = useState({
        rideId: ride!.id,
        userCPF: user?.cpf,
        userAddress: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8080/api/rides/requestRide", request);
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

const RideRequestList = ({ rideRequest }: { rideRequest: IRideRequest[] }) => {

    const handleAcceptRide = async (rideId: string, userAddress: string, userCPF: string) => {
        const rideRequest: IRideRequest = {
            rideId: rideId,
            userCPF: userCPF,
            userAddress: userAddress,
        };
        const response = await axios.post(`http://127.0.0.1:8080/api/rides/acceptPassenger`, rideRequest);
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
        const response = await axios.post(`http://127.0.0.1:8080/api/rides/rejectPassenger`, rideRequest);
        if (response.status === 200) {
            alert("Carona rejeitada com sucesso!");
        }
    }

    return (
        <Block title="Solicitações de Carona" icon={<Users className="w-6 h-6 text-indigo-600 mt-1" />}>
            <div className="space-y-3 mt-2">
                {rideRequest.map((request) => (
                    <div
                        key={request.rideId}
                        className="rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                        <div className="p-4 text-center">
                            <p className="text-lg text-gray-800">{request.userAddress}</p>
                        </div>
                        <div className="grid grid-cols-2 border-t border-gray-100">
                            <Button
                                onClick={() => handleAcceptRide(request.rideId, request.userAddress, request.userCPF)}
                                className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-none border-r border-green-800 transition-colors duration-200"
                            >
                                Aceitar
                            </Button>
                            <Button
                                onClick={() => handleRejectRide(request.rideId, request.userAddress, request.userCPF)}
                                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-none transition-colors duration-200"
                            >
                                Rejeitar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Block>
    );
}

const PassengerList = ({ ride }: { ride: IRide | null }) => {
    const [passengers, setPassengers] = useState<IPassenger[]>([]);

    useEffect(() => {
        const fetchPassengers = async () => {
            const response = await axios.get(`http://127.0.0.1:8080/api/rides/passengers/${ride?.id}`);
            if (response.status === 200) {
                const mappedPassengers = (response.data as any[]).map((item) => ({
                    ...item.passenger,
                    address: item.address,
                }));
                setPassengers(mappedPassengers);
                console.log(mappedPassengers);
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

export default function RidePage() {
    const { user } = useContext(AuthContext);
    const { id } = useParams<{ id: string }>();
    const [ride, setRide] = useState<IRide | null>(null);
    const [rideRequest, setRideRequest] = useState<IRideRequest[]>([]);
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

        const fetchRideRequests = async () => {
            const response = await axios.get(`http://127.0.0.1:8080/api/rides/requests/${id}`);
            if (response.status === 200) {
                setRideRequest(response.data as IRideRequest[]);
                console.log(response.data);
            }
        };
        fetchRideRequests();
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
                                    <Block title="Data" icon={<Calendar className="w-6 h-6 text-indigo-600 mt-1" />}>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {ride?.date ? new Date(ride.date).toLocaleDateString('pt-BR') : ""}
                                        </p>
                                    </Block>

                                    <Block title="Horário de Chegada" icon={<Clock className="w-6 h-6 text-indigo-600 mt-1" />}>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {ride?.arrivalTime}
                                        </p>
                                    </Block>

                                    <Block title="Preço" icon={<DollarSign className="w-6 h-6 text-green-600 mt-1" />}>
                                        <p className="text-lg font-semibold text-green-600">
                                            R$ {ride?.price.toFixed(2)}
                                        </p>
                                    </Block>

                                    <Block title="Vagas Disponíveis" icon={<Users className="w-6 h-6 text-indigo-600 mt-1" />}>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {ride?.availableSeats}
                                        </p>
                                    </Block>
                                </div>

                                <Block title="Local de Partida" icon={<MapPin className="w-6 h-6 text-indigo-600 mt-1" />}>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {ride?.startAddress}
                                    </p>
                                </Block>

                                <Block title="Veículo" icon={<Car className="w-6 h-6 text-indigo-600 mt-1" />}>
                                    <p className="text-lg font-semibold text-gray-900">{driverInfo?.model} {driverInfo?.color} - {driverInfo?.plate}</p>
                                </Block>

                                {ride?.description && (
                                    <Block title="Descrição" icon={<FileText className="w-6 h-6 text-indigo-600 mt-1" />}>
                                        <p className="text-lg text-gray-900">{ride.description}</p>
                                    </Block>
                                )}

                                {ride?.driver.name !== user?.name ? (
                                    <RequestRideForm ride={ride} />
                                ) : null}

                                {ride?.driver.name === user?.name && (
                                    <PassengerList ride={ride} />
                                )}

                                {ride?.driver.name === user?.name && (
                                    <RideRequestList rideRequest={rideRequest} />
                                )}

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
