import { isDriver, isPassenger } from '../../utils/Roles';
import TopMenu from "../../components/TopMenu";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../hooks/useAuth";


export default function Home() {
    const { user } = useAuth();

    const buttons = [
        {
            shouldDisplay: !isDriver(user),
            text: "Cadastre-se como motorista",
            onClick: () => {
                window.location.href = "/cadastro-motorista";
            }
        },
        {
            shouldDisplay: isDriver(user),
            text: "Oferecer carona",
            onClick: () => {
                window.location.href = "/oferecer-carona";
            }
        },
        {
            shouldDisplay: isPassenger(user),
            text: "Ver caronas disponíveis",
            onClick: () => {
                window.location.href = "/caronas";
            }
        }
    ]

    return (
        <div className="flex flex-col w-full">
            <TopMenu />
            <div className="flex flex-1 items-center justify-center px-4">
                <div className="flex flex-col items-center space-y-6 w-full">
                    <h1 className="text-4xl font-bold text-gray-900 text-center mt-16">
                        Bem-vindo de volta, {user?.name}!
                    </h1>
                    <div className="flex flex-col gap-4 w-full max-w-md">
                        {
                            buttons.map((button) => (
                                button.shouldDisplay && (
                                    <Button
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-5 px-10 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                                        onClick={button.onClick}
                                        key={button.text}
                                    >
                                        {button.text}
                                    </Button>
                                )
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}