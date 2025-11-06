"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserProfileProvider } from "../components/context/UserProfileContext";
import AuthCheck from "../components/context/AuthCheck";
import Layout from "../components/layout/page";
import ChatBot from "../components/chatbot/page";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const publicRoutes = ["/inicio-sesion", "/registro"];

    if (!token && !publicRoutes.includes(pathname)) {
      router.push("/inicio-sesion");
    }
  }, [pathname, router]);

  // Mapeo de títulos dinámicos
  const titles = {
    "/": "DuckBank - Inicio",
    "/perfil": "DuckBank - Perfil",
    "/registro": "DuckBank - Registro",
    "/contacto": "DuckBank - Contacto",
    "/error-404": "DuckBank - Error 404",
    "/inicio": "DuckBank - Inicio",
    "/inicio-sesion": "DuckBank - Iniciar Sesión",
    "/inversiones": "DuckBank - Inversiones",
    "/mis-tarjetas": "DuckBank - Mis tarjetas",
    "/nosotros": "DuckBank - Nosotros",
    "/pagina-en-mantenimiento": "DuckBank - Mantenimiento",
    "/perfil-usuario": "DuckBank - Perfil Completo",
    "/sacar-turno": "DuckBank - Turnos",
    "/sucursales": "DuckBank - Sucursales",
    "/tarjetas": "DuckBank - Tarjetas",
    "/terminos-y-condiciones": "DuckBank - TyC",
    "/trabaja-con-nosotros": "DuckBank - Empleos",
  };

  // Cambio de nombres de pestañas de forma dinámica
  useEffect(() => {
    document.title = titles[pathname] || "DuckBank";
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <UserProfileProvider>
          <AuthCheck />
          {pathname !== "/inicio-sesion" && pathname !== "/registro" ? (
            <Layout>
              {children}
              <ChatBot />
            </Layout>
          ) : (
            children
          )}
        </UserProfileProvider>
      </body>
    </html>
  );
}
