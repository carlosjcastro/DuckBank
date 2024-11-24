import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserProfile } from "./UserProfileContext";

function AuthCheck() {
  const pathname = usePathname();
  const router = useRouter();
  const { profileData } = useUserProfile();

  useEffect(() => {
    const isAuthenticated = !!profileData || !!localStorage.getItem("authToken");
    const publicRoutes = ["/inicio-sesion", "/registro"];

    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push("/inicio-sesion");
    }
  }, [pathname, profileData, router]);

  return null;
}

export default AuthCheck;
