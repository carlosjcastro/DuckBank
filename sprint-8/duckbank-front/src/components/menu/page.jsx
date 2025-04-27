import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUserProfile } from "../context/UserProfileContext";
import { motion } from "framer-motion";

import { 
  IoExitOutline, IoHomeOutline, IoCardOutline, IoCashOutline, 
  IoHelpCircleOutline, IoCallOutline, IoLockClosedOutline, 
  IoBusinessOutline, IoCalendarOutline 
} from "react-icons/io5";
import { FaRegMoneyBillAlt, FaRegSmileBeam } from "react-icons/fa";
import { MdOutlinePayments, MdOutlineHistory, MdOutlineManageAccounts } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs"; 
import { TbListDetails } from "react-icons/tb";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const { profileData, logout } = useUserProfile();

  const isAuthenticated = profileData !== null;

  const menuGroups = [
    {
      title: "Inicio",
      items: [
        { name: "Inicio", path: "/", icon: <IoHomeOutline /> },
      ],
    },
    {
      title: "Cuentas y Tarjetas",
      items: [
        { name: "Cuentas", path: "/cuentas", icon: <FaRegMoneyBillAlt /> },
        { name: "Tarjetas", path: "/tarjetas", icon: <IoCardOutline /> },
        { name: "Inversiones", path: "/inversiones", icon: <FaRegSmileBeam /> },
        { name: "Seguros", path: "/seguros", icon: <MdOutlineManageAccounts /> },
      ],
    },
    {
      title: "Servicios y Pagos",
      items: [
        { name: "Pagos y servicios", path: "/servicios", icon: <MdOutlinePayments /> },
        { name: "Historial de cuenta", path: "/pagina-en-mantenimiento", icon: <MdOutlineHistory /> },
      ],
    },
    {
      title: "Préstamos",
      items: [
        { name: "Préstamos", path: "/prestamos", icon: <IoCashOutline /> },
        { name: "Mis Préstamos", path: "/mis-prestamos", icon: <BsCashCoin /> },
        { name: "Gestionar Préstamos", path: "/gestionar-prestamos", icon: <MdOutlineManageAccounts /> },
        { name: "Cuotificalo", path: "/cuotificalo", icon: <TbListDetails /> },
      ],
    },
    {
      title: "Otros",
      items: [
        { name: "¡Mis beneficios!", path: "/beneficios", icon: <FaRegSmileBeam /> },
        { name: "Tu Sucursal", path: "/seleccionar-sucursal", icon: <RiBuilding2Line /> },
        { name: "Sucursales", path: "/sucursales", icon: <IoBusinessOutline /> },
        { name: "Turnos", path: "/sacar-turno", icon: <IoCalendarOutline /> },
        { name: "Ayuda", path: "/ayuda", icon: <IoHelpCircleOutline /> },
        { name: "Contacto", path: "/contacto", icon: <IoCallOutline /> },
        { name: "Seguridad y Privacidad", path: "/terminos-y-condiciones", icon: <IoLockClosedOutline /> },
      ],
    }
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
        className="fixed right-4 top-4 flex flex-col h-12 w-12 rounded-full justify-center items-center z-60"
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
        } transition-transform duration-300 ease-in-out z-50 flex flex-col`}
      >
        {/* Perfil arriba */}
        <div className="flex items-center p-4">
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
            <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center mr-2"></div>
          )}
          <Link
            href="/perfil-usuario"
            className="text-lg font-semibold text-gray-900"
          >
            {profileData?.first_name || "Usuario"}
          </Link>
        </div>

        {/* Links del menú */}
        <ul className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">{group.title}</h3>
              <ul className="space-y-2">
                {group.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 p-2 text-gray-900 rounded-full hover:bg-[#2e2828] hover:text-white group transition duration-300 ${
                        pathname === item.path ? "bg-[#2e2828] text-white" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </ul>

        {/* Botón logout abajo */}
        {isAuthenticated && (
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full p-2 text-[#f65151] transition duration-300 hover:translate-x-2"
            >
              <IoExitOutline className="mr-2" /> Cerrar sesión
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
