import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Ride } from "../Rides";
import axios from "axios";
import TopMenu from "../../components/TopMenu";
import Minimap from "../../components/Minimap";
import AvailableSeatsIcons from "../../components/AvailableSeatsIcons";

export default function RidePage() {
    const { id } = useParams<{ id: string }>();
    const [ride, setRide] = useState<Ride | null>(null);

    useEffect(() => {
        const fetchRide = async () => {
            const rideResponse = await axios.get(`http://localhost:8080/api/rides/${id}`);
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

    return (
        <div>
            <TopMenu activePage="caronas" />
            <div className="container py-5">
                <h1 className="text-center">Detalhes da Carona de MOTORISTA</h1>
                <div className="row py-5">
                    <div className="col-md-6 text-lg">
                        <p style={{ fontSize: "1.5rem" }}>{ride?.date}</p>
                        <p style={{ fontSize: "1.5rem" }}>{ride?.arrivalTime}</p>
                        <p style={{ fontSize: "1.5rem" }}>R$ {ride?.price.toFixed(2)}</p>
                        <p style={{ fontSize: "1.5rem" }}>{ride?.availableSeats} Vagas Disponíveis</p>
                        <div style={{ fontSize: "1.5rem" }}>
                            <AvailableSeatsIcons availableSeats={ride?.availableSeats || 0} />
                        </div>
                        <p style={{ fontSize: "1.5rem" }} className="text-lg">{ride?.description}</p>

                        <button className="btn btn-primary" style={{ fontSize: "1.5rem" }}
                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                        >Entrar na Carona</button>

                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Launch demo modal
                        </button>

                        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        ...
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {/* <Minimap width={600} height={480} address={ride?.startingAddress || ""} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
