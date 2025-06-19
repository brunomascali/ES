import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Rides from "../Pages/Rides";
import DriverSignup from "../Pages/DriverSignup";
import OfferRide from "../Pages/OfferRide";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import RidePage from "../Pages/RidePage";

export default function VerifiedUserRoutes() {
    const { user } = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/caronas" element={<Rides />} />
                {
                    !user?.roles.includes("DRIVER") && (
                        <Route path="/cadastro-motorista" element={<DriverSignup />} />
                    )
                }
                {
                    user?.roles.includes("DRIVER") && (
                        <Route path="/oferecer-carona" element={<OfferRide />} />
                    )
                }
                <Route path="/carona/:id" element={<RidePage />} />
            </Routes>
        </BrowserRouter>
    );
}
