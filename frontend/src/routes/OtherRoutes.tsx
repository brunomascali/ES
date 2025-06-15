import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Caronas from "../Pages/Caronas";
import OferecerCarona from "../Pages/OfferRide";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export default function OtherRoutes() {
    const { user } = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/caronas" element={<Caronas />} />
                {
                    user?.roles.includes("DRIVER") && (
                        <Route path="/oferecer-carona" element={<OferecerCarona />} />
                    )
                }
            </Routes>
        </BrowserRouter>
    );
}
