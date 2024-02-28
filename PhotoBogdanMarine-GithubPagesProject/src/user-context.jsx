import React, { useEffect, useState } from "react";

export const UserContext = React.createContext();

export default function UserContextProvider(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    const tokenFromStorage = getAccessToken();

    if (tokenFromStorage) {
      setUser(tokenFromStorage);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export function getAccessToken() {
  const tokenFromStorage = JSON.parse(
    window.localStorage.getItem("access_token") || "{}"
  );
  return tokenFromStorage?.accessToken;
}
