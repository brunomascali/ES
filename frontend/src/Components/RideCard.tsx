import { Ride } from "../Pages/Rides";

export default function RideCard(ride: Ride) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Carona de {ride.driver}</h5>
                    <p className="card-text">Data: {formatDate(ride.date)}</p>
                    <p className="card-text">
                        Horário de chegada no Campus do Vale: {
                            ride.arrivalTime.length === 5
                                ? ride.arrivalTime
                                : ride.arrivalTime.slice(0, 5)
                        }
                    </p>
                    <p className="card-text">R$ {ride.price.toFixed(2)}</p>
                    <p className="card-text">{ride.availableSeats} Vagas Disponíveis</p>
                    <p>
                        {Array.from({ length: ride.availableSeats }).map((_, i) => (
                            <span key={i}>
                                {i < ride.availableSeats ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#00A36C" className="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#C70039" className="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                    </svg>
                                )}
                            </span>
                        ))}
                    </p>
                    <a href="#" className="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    );
}