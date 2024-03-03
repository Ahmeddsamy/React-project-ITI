import { createContext, useState } from "react";

export const tokenContext = createContext();
export default function TokenContectProvider(props) {
  let [token, setToken] = useState(null);
  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </tokenContext.Provider>
  );
}
