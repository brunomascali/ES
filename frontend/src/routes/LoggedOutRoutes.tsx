import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

export default function LoggedOutRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}
