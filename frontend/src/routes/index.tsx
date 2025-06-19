import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import VerifiedUserRoutes from "./VerifiedUserRoutes";
import LoggedOutRoutes from "./LoggedOutRoutes";
import VerifyEmail from "../Pages/VerifyEmail";

export default function AppRoutes() {
    const { signed, user } = useContext(AuthContext);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        if (signed) {
            if (!user?.roles.includes('NOT_VERIFIED_USER')) {
                setIsVerified(true);
            }
        }
    }, [signed, user]);

    if (!signed) {
        return <LoggedOutRoutes />;
    }
    else if (isVerified) {
        return <VerifiedUserRoutes />;
    }
    else {
        return <VerifyEmail />;
    }
}