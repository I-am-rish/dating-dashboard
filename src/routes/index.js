import { Navigate, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Protected from "./Protected";
import GuestRoutes from "./GuestRoutes";
import ContentManager from "../pages/authenticated/ContentManager";


const NotFound = lazy(() => import("../pages/common/NotFound"));

const Register = lazy(() => import("../pages/auth/Register"));
const Login = lazy(() => import("../pages/auth/Login"));
const Forgot = lazy(() => import("../pages/auth/Forgot"));
const Reset = lazy(() => import("../pages/auth/Reset"));
const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/authenticated/Dashboard"));
const UsersData = lazy(() => import("../pages/authenticated/UsersData"));
const Profile = lazy(() => import("../pages/authenticated/Profile"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/auth/login"} />,
    // Component: Home,
  },
  {
    path: "/auth",
    Component: GuestRoutes,
    children: [
      {
        path: "",
        element: <Navigate to={"login"} />,
      },
      {
        path: "Register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "forgot",
        Component: Forgot,
      },
      {
        path: "reset",
        Component: Reset,
      },
    ],
  },
  {
    path: "/web",
    Component: Protected,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "users",
        Component: UsersData,
      },
      {
        path: "user/profile",
        Component: Profile,
      },
      {
        path: "content",
        Component: ContentManager,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default routes;
