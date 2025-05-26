import TopMenu from "./TopMenu";

export default function HomePage() {
    return (
        <div>
            <TopMenu activePage="home" />
            <div className="container py-5">
                <h1>Bem-vindo de volta, USUARIO!</h1>
            </div>
        </div>
    );
}
