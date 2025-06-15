import { useState } from "react";
import TopMenu from "../../Components/TopMenu";

type OfferRideData = {
    description: string;
    day: string;
    arrivalTime: string;
    seats: number;
    price: number;
    longitude: string;
    latitude: string;
}

export default function OfferRide() {
    const [offerRideData, setOfferRideData] = useState<OfferRideData>({
        description: "",
        day: "",
        arrivalTime: "",
        seats: 1,
        price: 5,
        longitude: "",
        latitude: "",
    });

    return (
        <div>
            <TopMenu activePage="oferecerCarona" />
            <div className="container py-5 d-flex justify-content-center">
                <form style={{ width: "600px" }}>
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
                                <label htmlFor="date" className="form-label fs-4">Dia</label>
                                <select className="form-select form-select-lg" id="date" value={offerRideData.day} onChange={(e) => setOfferRideData({ ...offerRideData, day: e.target.value })}>
                                    <option value="MONDAY">Segunda-feira</option>
                                    <option value="TUESDAY">Terça-feira</option>
                                    <option value="WEDNESDAY">Quarta-feira</option>
                                    <option value="THURSDAY">Quinta-feira</option>
                                    <option value="FRIDAY">Sexta-feira</option>
                                </select>
                            </div>
                            <div className="flex-fill">
                                <label htmlFor="time" className="form-label fs-4">Horário</label>
                                <input
                                    type="time"
                                    className="form-control form-control-lg"
                                    id="time"
                                    value={offerRideData.arrivalTime}
                                    onChange={(e) => setOfferRideData({ ...offerRideData, arrivalTime: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mb-2 w-100 d-flex gap-3">
                            <div className="flex-fill">
                                <label htmlFor="longitude" className="form-label fs-4">Longitude</label>
                                <input
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="longitude" 
                                    value={offerRideData.longitude} 
                                    onChange={(e) => setOfferRideData({ ...offerRideData, longitude: e.target.value })} 
                                />
                            </div>
                            <div className="flex-fill">
                                <label htmlFor="longitude" className="form-label fs-4">Longitude</label>
                                <input
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="longitude" 
                                    value={offerRideData.longitude} 
                                    onChange={(e) => setOfferRideData({ ...offerRideData, longitude: e.target.value })} 
                                />
                            </div>
                        </div>
                        <small className="text-muted">Pegue suas coordenadas aqui: <a href="https://www.latlong.net/" target="_blank" rel="noopener noreferrer">https://www.latlong.net/</a></small>
                        <div className="mb-4 w-100">
                            <label htmlFor="seats" className="form-label fs-4">Vagas Disponíveis</label>
                            <input
                                type="number"
                                className="form-control form-control-lg"
                                id="seats"
                                min={1}
                                max={3}
                                value={offerRideData.seats}
                                onChange={(e) => setOfferRideData({ ...offerRideData, seats: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="mb-4 w-100">
                            <label htmlFor="price" className="form-label fs-4">Preço</label>
                            <input
                                type="number"
                                className="form-control form-control-lg"
                                id="price"
                                value={offerRideData.price}
                                onChange={(e) => setOfferRideData({ ...offerRideData, price: parseInt(e.target.value) })}
                            />
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