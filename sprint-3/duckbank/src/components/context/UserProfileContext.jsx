import { createContext, useContext, useState, useEffect } from "react";

const UserProfileContext = createContext();

export const useUserProfile = () => {
  return useContext(UserProfileContext);
};

export const UserProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userProfile");
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    }
  }, []);

  const logout = () => {
    setProfileData(null);
    localStorage.removeItem("authToken");
    // localStorage.removeItem("userProfile");
  };

  useEffect(() => {
    if (profileData) {
      localStorage.setItem("userProfile", JSON.stringify(profileData));
    }
  }, [profileData]);

  return (
    <UserProfileContext.Provider value={{ profileData, setProfileData, logout }}>
      {children}
    </UserProfileContext.Provider>
  );
};
