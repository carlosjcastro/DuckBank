'use client';
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserProfileProvider } from '../components/context/UserProfileContext';
import AuthCheck from "../components/context/AuthCheck";
import Layout from "../components/layout/page";
import ChatBot from "../components/chatbot/page";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    if (pathname === "/" && !localStorage.getItem("authToken")) {
      router.push("/inicio-sesion");
    }
  }, [pathname, router]);

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
