import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Caronas from "../Pages/Caronas";

export default function OtherRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/caronas" element={<Caronas />} />
            </Routes>
        </BrowserRouter>
    );
}
