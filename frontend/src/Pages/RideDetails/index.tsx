import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IRide } from "../../types/Ride";
import TopMenu from "../../components/TopMenu";
import Minimap from "../../components/Minimap";
import { Clock, DollarSign, Users, MapPin, FileText, Car, CreditCard } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import RideRequests from "./RideRequests";
import type { IRideRequest } from "../../types/RideRequest";
import type { IDriverInfo } from "../../types/DriverInfo";
import Passengers from "./Passengers";
import RequestRideForm from "./RideRequestForm";
import api from "../../services/api";
import DayPicker from "../../components/DayPicker";
import StarRating from "../../components/StarRating";
import { Button } from "../../components/ui/button";

export const Block = ({ title, children, icon }: { title: string, children: React.ReactNode, icon?: React.ReactNode }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4 w-full">
            <div className="flex items-start space-x-4 w-full">
                {icon && <p className="text-sm font-medium text-gray-500">{icon}</p>}
                <div className="flex flex-col w-full">
                    <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default function RidePage() {
    const { user } = useAuth();
    const { id } = useParams<{ id: string }>();
    const [ride, setRide] = useState<IRide>();
    const [isPassenger, setIsPassenger] = useState(false);
    const [isDriver, setIsDriver] = useState(false);
    const [driverInfo, setDriverInfo] = useState<IDriverInfo | null>(null);
    const [driverRating, setDriverRating] = useState<number>(5.0);
    const [loading, setLoading] = useState(true);
    const [paid, setPaid] = useState(false);

    useEffect(() => {
        const fetchRide = async () => {
            try {
                const rideResponse = await api.get(`/rides/${id}`);
                const driverInfoResponse = await api.get(`/driver/${rideResponse.data.driver.id}`);
                const requests = await api.get(`/rides/requests/${id}`);
                const acceptedRequests = requests.data.filter((request: IRideRequest) => request.accepted);
                setRide(rideResponse.data as IRide);
                setDriverInfo(driverInfoResponse.data as IDriverInfo);
                setIsDriver(rideResponse.data.driver.cpf === user?.cpf);
                if (acceptedRequests.length > 0) {
                    setIsPassenger(acceptedRequests.some((request: IRideRequest) => request.userCPF === user?.cpf));
                    setPaid(acceptedRequests.some((request: IRideRequest) => request.userCPF === user?.cpf && request.paid));
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRide();
    }, []);

    useEffect(() => {
        const fetchDriverRating = async () => {
            try {
                const ratingRequest = await api.get(`/rating/avg/driver/${ride?.driver.cpf}`);
                setDriverRating(ratingRequest.data as number);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDriverRating();
    }, [ride]);

    const handleNotifyPayment = async () => {
        const response = await api.put(`/rides/confirmPayment/${id}/${user?.cpf}`);
        if (response.status === 200) {
            alert("Pagamento confirmado com sucesso!");
            setPaid(true);
        }
    };

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
        <div>
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
                        <p className="text-lg text-gray-600">
                            Avaliação do Motorista: <span className="font-semibold text-indigo-600">{driverRating}</span>
                        </p>
                        {isPassenger && (
                            <StarRating cpf_from={user!.cpf} cpf_to={ride?.driver.cpf!} is_driver_rating={true} />
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Block title="Dias" >
                                        <DayPicker offerRideData={ride!} />
                                    </Block>

                                    <Block title="Horário de Chegada no Vale" icon={<Clock className="w-6 h-6 text-indigo-600 mt-1" />}>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {ride?.arrivalTime}
                                        </p>
                                    </Block>

                                    <Block title={`Valor ${isPassenger ? 'Pago' : ''}`} icon={<DollarSign className="w-6 h-6 text-green-600 mt-1" />}>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Block title="Veículo" icon={<Car className="w-6 h-6 text-indigo-600 mt-1" />}>
                                        <p className="text-lg font-semibold text-gray-900">{driverInfo?.model} {driverInfo?.color}</p>
                                    </Block>
                                    <Block title="Placa" icon={<Car className="w-6 h-6 text-indigo-600 mt-1" />}>
                                        <p className="text-lg font-semibold text-gray-900">{driverInfo?.plate}</p>
                                    </Block>
                                </div>

                                <Block title="Local de Partida" icon={<MapPin className="w-6 h-6 text-indigo-600 mt-1" />}>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {ride?.startAddress}
                                    </p>
                                </Block>

                                {ride?.description && (
                                    <Block title="Descrição" icon={<FileText className="w-6 h-6 text-indigo-600 mt-1" />}>
                                        <p className="text-lg text-gray-900">{ride.description}</p>
                                    </Block>
                                )}

                                {isDriver && (
                                    <>
                                        <Passengers rideId={Number(id)} />
                                        <RideRequests rideId={Number(id)} />
                                    </>
                                )}

                                {!isPassenger && !isDriver && ride?.availableSeats! > 0 && (
                                    <RequestRideForm ride={ride!} />
                                )}

                                {
                                    isPassenger && !paid && (
                                        <Block title="Chave pix" icon={<CreditCard className="w-6 h-6 text-indigo-600 mt-1" />}>
                                            <p className="text-lg font-semibold text-gray-900">
                                                Chave pix: {ride?.driver.email} 
                                            </p>
                                            <Button
                                            type="button"
                                            className="cursor-pointer w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                                            onClick={() => handleNotifyPayment()}
                                            >
                                                Notificar pagamento
                                            </Button>
                                        </Block>
                                    )
                                }

                                {/* {ride?.driver.name !== user?.name && !isPassenger ? (
                                    <RequestRideForm ride={ride} />
                                ) : (
                                    <>
                                        <span className="text-lg font-semibold text-gray-900">
                                            Você já é passageiro dessa carona
                                        </span>
                                        <Block title="Chave pix" icon={<CreditCard className="w-6 h-6 text-indigo-600 mt-1" />}>
                                            <p className="text-lg font-semibold text-gray-900">
                                                Chave pix: {ride?.driver.email}
                                            </p>
                                            <form>
                                                <Button
                                                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                                                    type="submit"
                                                >
                                                    <Users className="w-5 h-5" />
                                                    <span>Notificar pagamento</span>
                                                </Button>
                                            </form>
                                        </Block>
                                    </>
                                )} */}

                                {/* {ride?.driver.name === user?.name && (
                                    <PassengerList ride={ride} />
                                )}

                                {ride?.driver.name === user?.name && (
                                    <RideRequestList rideRequest={rideRequest} />
                                )} */}

                            </div>

                            <div className="flex justify-center items-start">
                                <div className="bg-gray-100 rounded-lg overflow-hidden w-full h-full">
                                    <Minimap address={ride?.startAddress || ""} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
