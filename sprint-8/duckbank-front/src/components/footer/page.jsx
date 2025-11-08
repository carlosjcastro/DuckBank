"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Footer() {
  const redes = [
    {
      descripcion: "logo red social facebook",
      url: "https://www.facebook.com",
      img: "/assets/icons/facebook-logo.png",
    },
    {
      descripcion: "logo red social instagram",
      url: "https://www.instagram.com",
      img: "/assets/icons/instagram-logo.png",
    },
    {
      descripcion: "logo red social x",
      url: "https://www.x.com",
      img: "/assets/icons/x-logo.png",
    },
    {
      descripcion: "logo Whatsapp",
      url: "https://www.whatsapp.com",
      img: "/assets/icons/whatsApp-logo.png",
    },
  ];

  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatusMessage("Por favor, ingresá un correo válido.");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("¡Gracias por suscribirte al newsletter!");
        setEmail("");
      } else {
        setStatusMessage(
          data.message || "Hubo un problema. Intentálo más tarde."
        );
      }
    } catch (error) {
      setStatusMessage("Error al conectar con el servidor.");
    }
  };

  // Estado del servidor
  const [serverStatus, setServerStatus] = useState("checking");

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch(
          "https://duckbank-backend.onrender.com/api/status/"
        );
        const data = await response.json();
        if (data.status === "online") {
          setServerStatus("online");
        } else {
          setServerStatus("offline");
        }
      } catch (error) {
        setServerStatus("offline");
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#2e2828] w-full mt-24 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:border-b lg:border-gray-400 pb-6">
          <Link href="/">
            <span className="text-[#f3f4f4] font-bold text-2xl lg:mb-0">
              DuckBank
            </span>
          </Link>
          <div className="flex flex-col md:flex-row md:justify-center lg:gap-10 lg:text-sm">
            <ul className="text-center md:text-left lg:w-1/4 mb-6 lg:mb-0">
              <li className="text-[#f3c677] font-semibold mb-2">Contacto</li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] mb-1 transition transition-300">
                <Link href="/contacto">Escribínos</Link>
              </li>
              <li className="text-[#d1d1d1]">0800-333-3333</li>
            </ul>
            <ul className="text-center md:text-left lg:w-1/4 mb-6 lg:mb-0">
              <li className="text-[#f3c677] font-semibold mb-2">Nosotros</li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] mb-1 transition transition-300">
                <Link href="/blog">Blog</Link>
              </li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] transition transition-300">
                <Link href="/trabaja-con-nosotros">Trabajá con nosotros</Link>
              </li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] mb-1 transition transition-300">
                <Link href="/nosotros">Nosotros y Equipo</Link>
              </li>
            </ul>
            <ul className="text-center md:text-left lg:w-1/4 mb-6 lg:mb-0">
              <li className="text-[#f3c677] font-semibold mb-2">
                Otros enlaces
              </li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] mb-1 transition transition-300">
                <Link href="/seguridad">Seguridad</Link>
              </li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] transition transition-300">
                <Link href="/defensa-consumidor">Defensa consumidor</Link>
              </li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] transition transition-300">
                <Link href="/cambio-de-direccion">Cambio de Dirección</Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-72 lg:items-start">
            <p className="text-[#f3c677] font-bold text-xl mb-2 text-center lg:text-left lg:font-normal lg:text-lg">
              Únete al NewsLetter!
            </p>
            <form
              className="flex flex-col lg:flex-row items-center"
              onSubmit={handleSubmit}
            >
              <input
                className="bg-[#463f3a] rounded-full text-white placeholder-[#a3a3a3] p-2 w-48 lg:w-36 lg:mr-2 mb-2 lg:mb-0 lg:text-sm"
                type="email"
                name="email"
                id="email"
                placeholder="Ingresá tu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-[#f3c677] text-black rounded-full px-4 py-2 cursor-pointer lg:ml-2 lg:mr-0"
                type="submit"
                value="Suscribirse"
              />
            </form>
            {statusMessage && (
              <p className="text-sm text-center text-[#e63946] mt-2">
                {statusMessage}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center mt-8 text-sm text-[#d1d1d1]">
          <p className="mb-2 lg:mb-0">
            © Duckbank Argentina S.A. {new Date().getFullYear()}
          </p>
          <p
            className={`text-sm mt-2 ml-2 mb-2 lg:mt-0 ${
              serverStatus === "online"
                ? "text-green-400"
                : serverStatus === "offline"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {serverStatus === "online"
              ? "Servidor activo"
              : serverStatus === "offline"
              ? "Servidor caído"
              : "Verificando servidor..."}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 lg:w-1/3">
            <Link href="/terminos-y-condiciones">
              <span className="hover:text-[#fef4f4] border-t border-[#d1d1d1] pt-1 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-4 transition transition-300">
                Términos y condiciones
              </span>
            </Link>
            <ul className="flex items-center gap-3 mt-2 lg:mt-0">
              {redes.map((red, index) => (
                <li key={index}>
                  <a href={red.url} target="_blank" rel="noopener noreferrer">
                    <Image
                      className="h-7 lg:h-6"
                      src={red.img}
                      alt={red.descripcion}
                      width={25}
                      height={25}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row lg:items-center lg:gap-4">
            <span>Diseñado y Desarrollado por:</span>
            <ul className="flex gap-4">
              <li className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/carlosjcastrog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fef4f4] flex items-center"
                >
                  <img
                    src="/assets/pages/nosotros/CC.jpg"
                    alt="Carlos José Castro Galante"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  Carlos José Castro Galante
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/celina-bono"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fef4f4] flex items-center"
                >
                  <img
                    src="/assets/pages/nosotros/celina.jpg"
                    alt="Celina Bono"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  Celina Bono
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/nacho-i-9341822a1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fef4f4] flex items-center"
                >
                  <img
                    src="/assets/pages/nosotros/ignacio.png"
                    alt="Ignacio Iannino"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  Ignacio Iannino
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
