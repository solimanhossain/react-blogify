import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks";

function Protected() {
    const { auth } = useAuth();

    if (!auth?.user?.id) {
        return <Navigate to="./login" replace />;
    }

    return <Outlet />;
}

function LogedIn() {
    const { auth } = useAuth();

    if (auth?.user?.id) {
        return <Navigate to="./profile" replace />;
    }

    return <Outlet />;
}

export { Protected, LogedIn };
