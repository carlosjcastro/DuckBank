import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserProfile } from "./UserProfileContext";

function AuthCheck() {
  const pathname = usePathname();
  const router = useRouter();
  const { profileData, logout, setProfileData } = useUserProfile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const publicRoutes = ["/inicio-sesion", "/registro"];

    if (!token && !publicRoutes.includes(pathname)) {
      router.push("/inicio-sesion");
      setIsLoading(false);
      return;
    }

    if (token && !profileData) {
      // Si hay token, pero no hay datos del perfil, valida el token
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
          // Si el token es válido, actualiza el perfil
          setProfileData(data);
          setIsLoading(false);
        })
        .catch(() => {
          // Si el token no es válido, logout y redirige
          logout();
          if (!publicRoutes.includes(pathname)) {
            router.push("/inicio-sesion");
          }
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [pathname, profileData, router, logout, setProfileData]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return null;
}

export default AuthCheck;
