import TopMenu from "../../Components/TopMenu";
import Carona from "../../Components/RideCard";

export default function Caronas() {
    return (
        <div>
            <TopMenu activePage="caronas" />
            <div className="container py-5">
                <h1 className="mb-4">Caronas</h1>
                <Carona />
            </div>
        </div>
    );
}

