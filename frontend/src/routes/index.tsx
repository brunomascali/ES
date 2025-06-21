import { useAuth } from '../hooks/useAuth'
import UserRoutes from "./UserRoutes";
import LoggedOutRoutes from "./LoggedOutRoutes";

export default function AppRoutes() {
    const { user } = useAuth();

    return (
        user ? <UserRoutes /> : <LoggedOutRoutes />
    )
}