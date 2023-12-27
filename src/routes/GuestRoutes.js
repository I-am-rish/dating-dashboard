import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
  const token = localStorage.getItem("token");
  if(!token) return <Outlet />
  return <Navigate to={"/web/dashboard"} />
};

export default GuestRoutes;
