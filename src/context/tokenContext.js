import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const tokenContext = createContext();

export default function TokenContextProvider(props) {
  let [token, setToken] = useState(() => Cookies.get("token"));

  useEffect(() => {
    const handleTokenChange = (newToken) => {
      if (newToken) {
        Cookies.set("token", newToken);
      } else {
        Cookies.remove("token");
      }
    };

    handleTokenChange(token);
  }, [token]);

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </tokenContext.Provider>
  );
}
