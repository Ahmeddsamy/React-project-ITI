import React, { useContext, useEffect, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { tokenContext } from "./context/tokenContext";
import { routers } from "./routes"; // Import the router configuration
import "./App.css";

export default function App() {
  let { setToken } = useContext(tokenContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [setToken]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={routers}></RouterProvider>
    </Suspense>
  );
}
