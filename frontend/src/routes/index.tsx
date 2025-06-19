import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import OtherRoutes from "./OtherRoutes";
import SignRoutes from "./SignRoutes";
import VerifyEmail from "../Pages/VerifyEmail";

export default function AppRoutes() {
    const { signed, user } = useContext(AuthContext);
    const [isVerified, setIsVerified] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (signed) {
            if (!user?.roles.includes('NOT_VERIFIED_USER')) {
                setIsVerified(true);
            }
            if (user?.roles.includes('ADMIN')) {
                setIsAdmin(true);
            }
        }
    }, [signed, user]);

    return (
        signed ? (isVerified ? <OtherRoutes isAdmin={isAdmin} /> : <VerifyEmail />) : <SignRoutes />
    )
}