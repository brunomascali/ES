import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Rides from "../Pages/Rides";
import DriverRegistration from "../Pages/DriverRegistration";
import RideCreation from "../Pages/RideCreation";
import Complaints from "../Pages/Complaints";
import RidePage from "../Pages/RideDetails";
import Profile from "../Pages/Profile";
import VerifyEmail from "../Pages/VerifyEmail";
import { useAuth } from "../hooks/useAuth";

export default function OtherRoutes() {
    const { user } = useAuth();

    const isVerified = !user?.roles.includes("NOT_VERIFIED_USER");
    const isDriver = user?.roles.includes("DRIVER") && isVerified;
    const isAdmin = user?.roles.includes("ADMIN") && isVerified;

    return (
        <BrowserRouter>
            { !isVerified ?
                <Routes>
                    <Route path="/" element={<VerifyEmail />} />
                </Routes>
                :
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/caronas/:id" element={<RidePage />} />
                    <Route path="/perfil" element={<Profile />} />

                    {isAdmin && (<Route path="/denuncias" element={<Complaints />} />)}

                    {isVerified && (<Route path="/caronas" element={<Rides />} />)}

                    {!isDriver && (<Route path="/cadastro-motorista" element={<DriverRegistration />} />)}

                    {isDriver && (<Route path="/oferecer-carona" element={<RideCreation />} />)}
                </Routes>
            }
        </BrowserRouter>
    );
}
