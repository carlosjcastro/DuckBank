import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserProfile } from "./UserProfileContext";

function AuthCheck() {
  const pathname = usePathname();
  const router = useRouter();
  const { profileData, logout, setProfileData, loading } = useUserProfile();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const publicRoutes = ["/inicio-sesion", "/registro"];

    if (loading) return;

    if (!token && !publicRoutes.includes(pathname)) {
      router.push("/inicio-sesion");
      return;
    }

    if (token && !profileData) {
      fetch("/api/validate-token", {
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
          if (!publicRoutes.includes(pathname)) {
            router.push("/inicio-sesion");
          }
        });
    }
  }, [pathname, profileData, router, logout, setProfileData, loading]);

  return null;
}

export default AuthCheck;
