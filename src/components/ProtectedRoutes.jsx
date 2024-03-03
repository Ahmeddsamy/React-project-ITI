import React from "react";
import { Navigate } from "react-router-dom";

function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

export default function ProtectedRoutes(props) {
  const token = getCookie("token");
  if (token) {
    return props.children;
  } else {
    return <Navigate to={"/auth/login"} />;
  }
}
