import { Navigate, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Protected from "./Protected";

import Dashboard from "../pages/authenticated/Dashboard";
import UsersData from "../pages/authenticated/UsersData";
import isAuthenticated from "./isAuthenticated";
import Profile from "../pages/authenticated/Profile";

const NotFound = lazy(() => import("../pages/common/NotFound"));

const Register = lazy(() => import("../pages/auth/Register"));
const Login = lazy(() => import("../pages/auth/Login"));
const Forgot = lazy(() => import("../pages/auth/Forgot"));
const Reset = lazy(() => import("../pages/auth/Reset"));
const Home = lazy(() => import("../pages/Home"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/auth/login"} />,
    // Component: Home,
  },
  {
    path: "/auth",
    Component: Protected,
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
    // Component: isAuthenticated,
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
        path: "profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default routes;
