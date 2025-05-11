import { LoggedProps } from "../Pages/LoggedIn";

export default function TopMenu({ user, setIsLoggedIn, setUser }: LoggedProps) {
    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser('');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <span className="ms-2">GoVale</span>
                </a>
                <div className="d-flex align-items-center">
                    <button 
                        className="btn btn-outline-danger"
                        onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    );
}
