import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Cuentas", path: "/pagina-en-mantenimiento" },
    { name: "Tarjetas", path: "/tarjetas" },
    { name: "Inversiones", path: "/inversiones" },
    { name: "Seguros", path: "/pagina-en-mantenimiento" },
    { name: "Pagos y servicios", path: "/pagina-en-mantenimiento" },
    { name: "Historial de cuenta", path: "/pagina-en-mantenimiento" },
    { name: "Préstamos", path: "/pagina-en-mantenimiento" },
    { name: "Cuotificalo", path: "/pagina-en-mantenimiento" },
    { name: "¡Mis beneficios!", path: "/pagina-en-mantenimiento" },
    { name: "Seguridad y Privacidad, Contacto", path: "/pagina-en-mantenimiento" },
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
        id="drawer-navigation"
        className={`fixed top-0 left-0 w-64 h-full bg-[#f4f4f4] shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <ul className="p-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center p-2 text-gray-900 rounded-full hover:bg-[#463f3a] hover:text-white group"
                onClick={() => setIsOpen(false)}
              >
                <span className="ms-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
