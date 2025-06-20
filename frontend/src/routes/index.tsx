import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import UserRoutes from "./UserRoutes";
import LoggedOutRoutes from "./LoggedOutRoutes";

export default function AppRoutes() {
    const { signed } = useContext(AuthContext);

    return (
        signed ? <UserRoutes /> : <LoggedOutRoutes />
    )
}