import { Navigate } from "react-router-dom";

export default function PublicOnlyRoute({ children }) {
  const userIsAuthenticated = localStorage.getItem("token");

  // If the user is authenticated, redirect them to the home page
  if (userIsAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render the requested route (children)
  return children;
}
