import { useContext, useState } from "react";
import TopMenu from "../../components/TopMenu";
import { AuthContext } from "../../context/Auth";
import axios from "axios";

type OfferRideData = {
    driverCPF: string,
    startingAddress: string,
    latitude: number,
    longitude: number,
    availableSeats: 1 | 2 | 3,
    date: string,
    arrivalTime: string, 
    description: string,
    price: number,
};

export default function OfferRide() {
    const { user } = useContext(AuthContext);
    const [offerRideData, setOfferRideData] = useState<OfferRideData>({
        driverCPF: user?.cpf || "",
        startingAddress: "Avenida do Forte 1500 Porto Alegre RS",
        latitude: 0,
        longitude: 0,
        availableSeats: 3,
        date: new Date().toISOString().split('T')[0],
        arrivalTime: "10:00",
        description: "A -> B -> C -> D",
        price: 5.0,
    });

    const handleAddressSubmit = async() => {
        if (offerRideData.startingAddress.length === 0) {
            alert("Endereço não pode ser vazio");
            return;
        }
        
        const coordinatesResponse = await axios.get("https://geocode.maps.co/search?q=" + offerRideData.startingAddress + "&api_key=6841a9190344d597744546tmib2caac")
        if (coordinatesResponse.status === 200) {
            const updatedData = { 
                ...offerRideData, 
                latitude: coordinatesResponse.data[0].lat, 
                longitude: coordinatesResponse.data[0].lon,
            };
            setOfferRideData(updatedData);
            console.log(updatedData);
        }
    };

    const handleOfferRideSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (offerRideData.startingAddress.length === 0) {
            alert("Endereço não pode ser vazio");
            return;
        }

        const offerRideResponse = await axios.post("http://127.0.0.1:8080/api/rides/create", {
            ...offerRideData,
            price: Number(offerRideData.price),
            date: offerRideData.date,
            arrivalTime: offerRideData.arrivalTime,
        });
        if (offerRideResponse.status === 200) {
            alert("Carona oferecida com sucesso");
        }
        else if (offerRideResponse.status === 400) {
            alert(offerRideResponse.data);
        }
    };

    return (
        <div>
            <TopMenu />
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-center">
                    <form className="w-full max-w-2xl space-y-6" onSubmit={handleOfferRideSubmit}>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-8">Oferecer Carona</h1>
                        </div>
                        
                        <div>
                            <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
                                Descrição
                            </label>
                            <textarea
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                                id="description"
                                rows={6}
                                value={offerRideData.description}
                                placeholder="Exemplo: saio as 10 da manhã, tenho 2 vagas disponíveis, o preço é de R$5,00. Moro perto da rua X e minha rota é Y"
                                onChange={(e) => setOfferRideData({ ...offerRideData, description: e.target.value })}
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="date" className="block text-lg font-medium text-gray-700 mb-2">
                                    Data
                                </label>
                                <input
                                    required
                                    type="date"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    id="date"
                                    value={offerRideData.date}
                                    onChange={(e) => setOfferRideData({ ...offerRideData, date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-lg font-medium text-gray-700 mb-2">
                                    Horário
                                </label>
                                <input
                                    required
                                    type="time"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    id="time"
                                    value={offerRideData.arrivalTime}
                                    onChange={(e) => setOfferRideData({ ...offerRideData, arrivalTime: e.target.value })}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">
                                Endereço de Partida
                            </label>
                            <input 
                                required 
                                type="text" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                                id="address" 
                                value={offerRideData.startingAddress} 
                                onChange={(e) => setOfferRideData({ ...offerRideData, startingAddress: e.target.value })} 
                            />
                            <button 
                                type="button" 
                                onClick={handleAddressSubmit} 
                                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md text-lg"
                            >
                                Buscar
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="latitude" className="block text-lg font-medium text-gray-700 mb-2">
                                    Latitude
                                </label>
                                <input
                                    disabled
                                    type="text" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500" 
                                    id="latitude" 
                                    value={offerRideData.latitude} 
                                    onChange={(e) => setOfferRideData({ ...offerRideData, latitude: parseFloat(e.target.value) })} 
                                />
                            </div>
                            <div>
                                <label htmlFor="longitude" className="block text-lg font-medium text-gray-700 mb-2">
                                    Longitude
                                </label>
                                <input
                                    disabled
                                    type="text" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500" 
                                    id="longitude" 
                                    value={offerRideData.longitude} 
                                    onChange={(e) => setOfferRideData({ ...offerRideData, longitude: parseFloat(e.target.value) })} 
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="seats" className="block text-lg font-medium text-gray-700 mb-2">
                                Vagas Disponíveis
                            </label>
                            <input
                                required
                                type="number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                id="seats"
                                min={1}
                                max={3}
                                value={offerRideData.availableSeats}
                                onChange={(e) => setOfferRideData({ ...offerRideData, availableSeats: parseInt(e.target.value) as 1 | 2 | 3 })}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-2">
                                Preço
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-medium">
                                    R$
                                </span>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    id="price"
                                    min="0"
                                    step="0.01"
                                    value={offerRideData.price}
                                    onChange={(e) => setOfferRideData({ ...offerRideData, price: Number(e.target.value) })}
                                    placeholder="0,00"
                                />
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md text-lg"
                        >
                            Oferecer Carona
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}