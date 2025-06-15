import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export default function TopMenu({ activePage }: { activePage: string }) {
    const { Logout, user } = useContext(AuthContext);

    return (
        <ul className="nav py-1 px-5 fs-5 justify-content-between" style={{ backgroundColor: '#edeef7' }}>
            <div className="d-flex">
                <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                    <a className="py-2 px-3" href="/">
                        <img src={logo} alt="Logo" style={{ height: '60px' }} />
                    </a>
                </li>
                <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                    <a className={`nav-link ${activePage === 'home' ? 'active' : ''} py-2`} href="/">Início</a>
                </li>
                <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                    <a className={`nav-link ${activePage === 'caronas' ? 'active' : ''} py-2 px-3`} href="/caronas">Caronas</a>
                </li>
                <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                    <a className={`nav-link ${activePage === 'perfil' ? 'active' : ''} py-2 px-3`} href="#">Perfil</a>
                </li>
                {
                    user?.roles.includes("DRIVER") && (
                        <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                            <a className={`nav-link ${activePage === 'motorista' ? 'active' : ''} py-2 px-3`} href="/oferecer-carona">Oferecer Carona</a>
                        </li>
                    )
                }
            </div>
            <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                <button className="btn btn-lg btn-danger" onClick={Logout}>Sair</button>
            </li>
        </ul>
    );
}
