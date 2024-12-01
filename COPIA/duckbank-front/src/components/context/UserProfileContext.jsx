import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserProfileContext = createContext();

export const useUserProfile = () => useContext(UserProfileContext);

export const UserProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    setProfileData(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        setProfileData(JSON.parse(storedProfile));
        setLoading(false);
      } else {
        axios
          .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setProfileData(response.data);
            localStorage.setItem("userProfile", JSON.stringify(response.data));
            setLoading(false);
          })
          .catch(() => {
            logout();
            setLoading(false);
          });
      }
    } else {
      setProfileData(null);
      setLoading(false);
    }
  }, []);

  return (
    <UserProfileContext.Provider value={{ profileData, setProfileData, logout, loading }}>
      {children}
    </UserProfileContext.Provider>
  );
};
