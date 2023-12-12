import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const isAuthenticated = window.cookieStore.get({ name: "token" });

  if (isAuthenticated) return true;
  return false;
};

export default isAuthenticated;
