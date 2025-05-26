import logo from "../assets/logo.png";

export default function TopMenu({ activePage }: { activePage: string }) {

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
            </div>
            <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                <button className="btn btn-lg btn-danger" onClick={
                    () => {
                        localStorage.removeItem('user');
                        // setIsLoggedIn(false);
                        // setUser('');
                    }
                }>Sair</button>
            </li>
        </ul>
    );
}
