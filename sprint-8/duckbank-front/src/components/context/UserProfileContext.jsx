import { createContext, useContext, useState, useEffect } from "react";

const UserProfileContext = createContext();

export const useUserProfile = () => {
  return useContext(UserProfileContext);
};

export const UserProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch("https://web-production-b8a3.up.railway.app/api/validate-token/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Token inválido");
          }
        })
        .then((data) => {
          setProfileData(data);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  const logout = () => {
    setProfileData(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
  };

  useEffect(() => {
    if (profileData) {
      localStorage.setItem("userProfile", JSON.stringify(profileData));
    } else {
      localStorage.removeItem("userProfile");
    }
  }, [profileData]);

  return (
    <UserProfileContext.Provider value={{ profileData, setProfileData, logout }}>
      {children}
    </UserProfileContext.Provider>
  );
};
