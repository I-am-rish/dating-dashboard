import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
    if (!1) {
        return <Navigate to={'/about'} />
    }
    return <Outlet />
}

export default Protected;