import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Rides from "../Pages/Rides";
import DriverSignup from "../Pages/DriverSignup";
import OfferRide from "../Pages/OfferRide";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import Complaints from "../Pages/Complaints";
import RidePage from "../Pages/RidePage";
import Profile from "../Pages/Profile";
import VerifyEmail from "../Pages/VerifyEmail";

export default function OtherRoutes() {
    const { user } = useContext(AuthContext);

    const isVerified = !user?.roles.includes("NOT_VERIFIED_USER");
    const isDriver = user?.roles.includes("DRIVER") && isVerified;
    const isAdmin = user?.roles.includes("ADMIN") && isVerified;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/caronas/:id" element={<RidePage />} />
                <Route path="/perfil" element={<Profile />} />

                { isAdmin && ( <Route path="/denuncias" element={<Complaints />} /> ) }

                { !isVerified && ( <Route path="/verificar-email" element={<VerifyEmail />} /> ) }

                { isVerified && ( <Route path="/caronas" element={<Rides />} /> ) }

                { !isDriver && ( <Route path="/cadastro-motorista" element={<DriverSignup />} />) }

                { isDriver && ( <Route path="/oferecer-carona" element={<OfferRide />} />) }
            </Routes>
        </BrowserRouter>
    );
}
