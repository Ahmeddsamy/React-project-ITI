import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout1 from "./Layouts/Layout1";

// Lazy load components
const Home = React.lazy(() => import("./components/Home"));
const Product = React.lazy(() => import("./components/Product"));
const ProductDetail = React.lazy(() => import("./components/ProductDetail"));
const Cart = React.lazy(() => import("./components/Cart"));
const Orders = React.lazy(() => import("./components/Orders"));
const Category = React.lazy(() => import("./components/Category"));
const Brand = React.lazy(() => import("./components/Brand"));
const About = React.lazy(() => import("./components/About"));
const Contact = React.lazy(() => import("./components/Contact"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const Settings = React.lazy(() => import("./components/Settings"));
const AppSettings = React.lazy(() => import("./components/AppSettings"));
const ProfileSettings = React.lazy(() =>
  import("./components/ProfileSettings")
);
const WebSettings = React.lazy(() => import("./components/WebSettings"));
const Login = React.lazy(() => import("./components/Login"));
const Signup = React.lazy(() => import("./components/Signup"));
const ProtectedRoutes = React.lazy(() =>
  import("./components/ProtectedRoutes")
);
const PublicOnlyRoute = React.lazy(() => import("./components/PublicRoutes"));

// ProtectedRoutes and PublicOnlyRoute should also be adapted for lazy loading if not already

export const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout1 />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "product", element: <Product /> },
      {
        path: "product/:productId",
        element: (
          <ProtectedRoutes>
            <ProductDetail />
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "order",
        element: (
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        ),
      },
      {
        path: "category/:categoryName",
        element: <Category />,
      },
      { path: "brand", element: <Brand /> },
      { path: "about", element: <About /> },
      { path: "contactus", element: <Contact /> },
      {
        path: "settings",
        element: (
          <ProtectedRoutes>
            <Settings />
          </ProtectedRoutes>
        ),
        children: [
          { path: "appsettings", element: <AppSettings /> },
          { path: "profilesettings", element: <ProfileSettings /> },
          { path: "websettings", element: <WebSettings /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "auth",
    element: <Layout1 />,
    children: [
      {
        path: "login",
        element: (
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
