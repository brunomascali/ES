import TopMenu from "../../components/TopMenu";

export default function Profile() {
    return (
        <div className="min-h-screen bg-gray-50">
            <TopMenu />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Perfil</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}