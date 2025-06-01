import TopMenu from "../../Components/TopMenu";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

export default function Home() {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <TopMenu activePage="home" />
            <div className="container py-5">
                <h1>Bem-vindo de volta, {user?.name}!</h1>
            </div>
        </div>
    );
}