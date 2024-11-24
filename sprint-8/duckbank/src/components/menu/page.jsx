"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useUserProfile } from "../context/UserProfileContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IoMdExit } from "react-icons/io";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const { profileData, logout } = useUserProfile();

  const isAuthenticated = profileData !== null;

  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Cuentas", path: "/cuentas" },
    { name: "Tarjetas", path: "/tarjetas" },
    { name: "Inversiones", path: "/pagina-en-mantenimiento" },
    { name: "Seguros", path: "/pagina-en-mantenimiento" },
    { name: "Pagos y servicios", path: "/servicios" },
    { name: "Historial de cuenta", path: "/pagina-en-mantenimiento" },
    { name: "Préstamos", path: "/prestamos" },
    { name: "Cuotificalo", path: "/pagina-en-mantenimiento" },
    { name: "¡Mis beneficios!", path: "/pagina-en-mantenimiento" },
    { name: "Ayuda", path: "/ayuda" },
    { name: "Sucursales", path: "/sucursales" },
    { name: "Turnos", path: "/sacar-turno" },
    { name: "Contacto", path: "/contacto" },
    { name: "Seguridad y Privacidad", path: "/terminos-y-condiciones" },
  ];

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/inicio-sesion");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-50">
      <button
        ref={buttonRef}
        className={`fixed right-4 top-4 flex flex-col h-12 w-12 rounded-full justify-center items-center z-60`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`h-1 w-8 mb-1 rounded-full bg-white transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <div
          className={`h-1 w-8 mb-1 rounded-full bg-white transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`h-1 w-8 rounded-full bg-white transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      <nav
        ref={menuRef}
        className={`fixed top-0 left-0 w-64 h-full bg-[#f4f4f4] shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center p-4 transition-transform duration-500 ease-in-out hover:translate-x-4">
          {profileData?.profileImage ? (
            <div className="relative w-10 h-10 mr-2 rounded-full overflow-hidden">
              <Image
                src={profileData.profileImage}
                layout="fill"
                objectFit="cover"
                alt="Foto de perfil"
              />
            </div>
          ) : (
            <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center mr-2">
              {/* <span className="text-gray-600">Sin imagen</span> */}
            </div>
          )}
          <Link
            href="/perfil-usuario"
            className="text-lg font-semibold text-gray-900"
          >
            {profileData?.Nombre || "Usuario"}
          </Link>
        </div>
        <ul className="p-4">
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.path}
                className={`flex items-center p-2 text-gray-900 rounded-full hover:bg-[#2e2828] hover:text-white group transition duration-300 ${
                  pathname === item.path ? "bg-[#2e2828] text-white" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="ms-3">{item.name}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-2 text-[#f65151] transition duration-300 mt-auto transition-transform duration-500 ease-in-out hover:translate-x-2"
          >
            <IoMdExit className="mr-2" /> Cerrar sesión
          </button>
        )}
      </nav>
    </div>
  );
}
