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
      fetch("https://duckbank-backend.onrender.com/api/validate-token/", {
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
    return (
      <div className="flex justify-center items-center h-screen bg-[#f9f9f9]">
        <span className="loader"></span>

        <style jsx>{`
          .loader {
            width: 48px;
            height: 48px;
            background: #4e2d1e; /* color institucional */
            animation: rotate 1s linear infinite;
          }

          @keyframes rotate {
            0% {
              transform: rotate(0deg) scale(0.2);
              border-radius: 10%;
            }
            50% {
              transform: rotate(180deg) scale(1.5);
              border-radius: 50%;
            }
            100% {
              transform: rotate(360deg) scale(0.2);
              border-radius: 10%;
            }
          }
        `}</style>
      </div>
    );
  }

  return null;
}

export default AuthCheck;
