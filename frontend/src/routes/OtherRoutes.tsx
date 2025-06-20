import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Rides from "../Pages/Rides";
import DriverSignup from "../Pages/DriverSignup";
import OfferRide from "../Pages/OfferRide";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import Complaints from "../Pages/Complaints";
import RidePage from "../Pages/RidePage";

export default function OtherRoutes({ isAdmin }: { isAdmin: boolean }) {
    const { user } = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/caronas" element={<Rides />} />
                <Route path="/caronas/:id" element={<RidePage />} />
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
                {
                    isAdmin && (
                        <Route path="/denuncias" element={<Complaints />} />
                    )
                }
            </Routes>
        </BrowserRouter>
    );
}
