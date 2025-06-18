import { useContext, useState } from "react";
import TopMenu from "../../Components/TopMenu";
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
}

export default function OfferRide() {
    const { user } = useContext(AuthContext);
    const [offerRideData, setOfferRideData] = useState<OfferRideData>({
        driverCPF: user?.cpf || "",
        startingAddress: "Avenida Ipiranga 1500, Porto Alegre",
        latitude: 0,
        longitude: 0,
        availableSeats: 3,
        date: new Date().toISOString().split('T')[0],
        arrivalTime: "10:00",
        description: "",
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
                startingAddress: coordinatesResponse.data[0].display_name, 
                latitude: coordinatesResponse.data[0].lat, 
                longitude: coordinatesResponse.data[0].lon,
            };
            setOfferRideData(updatedData);
            console.log(updatedData);
        }
    }

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
            arrivalTime: offerRideData.arrivalTime
        });
        if (offerRideResponse.status === 200) {
            alert("Carona oferecida com sucesso");
        }
        else if (offerRideResponse.status === 400) {
            alert(offerRideResponse.data);
        }
    }

    return (
        <div>
            <TopMenu activePage="oferecerCarona" />
            <div className="container py-5 d-flex justify-content-center">
                <form style={{ width: "600px" }} onSubmit={handleOfferRideSubmit}>
                    <div className="mb-4 d-flex flex-column align-items-center">
                        <h1 className="mb-5">Oferecer Carona</h1>
                        <div className="mb-4 w-100">
                            <label htmlFor="description" className="form-label fs-4">Descrição</label>
                            <textarea
                                className="form-control form-control-lg"
                                id="description"
                                rows={6}
                                value={offerRideData.description}
                                placeholder="Exemplo: saio as 10 da manhã, tenho 2 vagas disponíveis, o preço é de R$5,00. Moro perto da rua X e minha rota é Y"
                                onChange={(e) => setOfferRideData({ ...offerRideData, description: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="mb-4 w-100 d-flex gap-3">
                            <div className="flex-fill">
                                <label htmlFor="date" className="form-label fs-4">Data</label>
                                <input
                                    required
                                    type="date"
                                    className="form-control form-control-lg"
                                    id="date"
                                    value={offerRideData.date}
                                    onChange={(e) => setOfferRideData({ ...offerRideData, date: e.target.value })}
                                />
                            </div>
                            <div className="flex-fill">
                                <label htmlFor="time" className="form-label fs-4">Horário</label>
                                <input
                                    required
                                    type="time"
                                    className="form-control form-control-lg"
                                    id="time"
                                    value={offerRideData.arrivalTime}
                                    onChange={(e) => setOfferRideData({ ...offerRideData, arrivalTime: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mb-4 w-100">
                                <label htmlFor="address" className="form-label fs-4">Endereço</label>
                                <input required type="text" className="form-control form-control-lg" id="address" value={offerRideData.startingAddress} onChange={(e) => setOfferRideData({ ...offerRideData, startingAddress: e.target.value })} />
                                <button type="button" onClick={handleAddressSubmit} className="btn btn-primary btn-lg w-100 mt-3" style={{ fontSize: "1.5rem" }}>Buscar</button>
                        </div>
                        <div className="mb-2 w-100 d-flex gap-3">
                            <div className="flex-fill">
                                <label htmlFor="latitude" className="form-label fs-4">Latitude</label>
                                <input
                                    disabled
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="latitude" 
                                    value={offerRideData.latitude} 
                                    onChange={(e) => setOfferRideData({ ...offerRideData, latitude: parseFloat(e.target.value) })} 
                                />
                            </div>
                            <div className="flex-fill">
                                <label htmlFor="longitude" className="form-label fs-4">Longitude</label>
                                <input
                                    disabled
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="longitude" 
                                    value={offerRideData.longitude} 
                                    onChange={(e) => setOfferRideData({ ...offerRideData, longitude: parseFloat(e.target.value) })} 
                                />
                            </div>
                        </div>
                        <div className="mb-4 w-100">
                            <label htmlFor="seats" className="form-label fs-4">Vagas Disponíveis</label>
                            <input
                                required
                                type="number"
                                className="form-control form-control-lg"
                                id="seats"
                                min={1}
                                max={3}
                                value={offerRideData.availableSeats}
                                onChange={(e) => setOfferRideData({ ...offerRideData, availableSeats: parseInt(e.target.value) as 1 | 2 | 3 })}
                            />
                        </div>
                        <div className="mb-4 w-100">
                            <label htmlFor="price" className="form-label fs-4">Preço</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{ fontSize: "1.5rem" }}>R$</span>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    className="form-control form-control-lg"
                                    id="price"
                                    min="0"
                                    step="0.01"
                                    value={offerRideData.price}
                                    onChange={(e) => setOfferRideData({ ...offerRideData, price: Number(e.target.value) })}
                                    placeholder="0,00"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100 mt-3" style={{ fontSize: "1.5rem" }}>
                            Oferecer Carona
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}