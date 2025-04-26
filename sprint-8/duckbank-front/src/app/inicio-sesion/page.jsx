'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";
import { useUserProfile } from "../../components/context/UserProfileContext";

export default function InicioSesion() {
  const router = useRouter();
  const { setProfileData } = useUserProfile();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeColor, setMensajeColor] = useState("");
  const [errores, setErrores] = useState({ usuario: "", contraseña: "" });
  const [loading, setLoading] = useState(false);

  const validarInputs = () => {
    const erroresNuevos = { usuario: "", contraseña: "" };
    let esValido = true;

    if (!usuario) {
      erroresNuevos.usuario = "El campo de usuario es obligatorio.";
      esValido = false;
    }

    if (!contraseña) {
      erroresNuevos.contraseña = "El campo de contraseña es obligatorio.";
      esValido = false;
    }

    setErrores(erroresNuevos);
    return esValido;
  };

  const handleClick = async () => {
    if (!validarInputs()) return;

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login/`, {
        username: usuario,
        password: contraseña,
      });

      if (response.status === 200 && response.data.access_token) {
        localStorage.setItem("authToken", response.data.access_token);
        setProfileData(response.data.user);
        setMensaje("¡Inicio de sesión exitoso!");
        setMensajeColor("#52b788");
        router.push("/");
      }
    } catch (error) {
      setMensaje(error.response?.data?.detail || "Error al iniciar sesión.");
      setMensajeColor("#f65151");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl">
        <div className="bg-white p-10 rounded-l-2xl w-full lg:w-1/2">
          <h1 className="text-2xl lg:text-3xl font-bold text-center">¡Bienvenido a DuckBank!</h1>
          {mensaje && (
            <motion.div
              className="mt-4 text-center"
              style={{ color: mensajeColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {mensaje}
            </motion.div>
          )}
          <div className="mt-8">
            <label className="text-lg font-medium">Usuario:</label>
            <input
              className={`w-full border-2 rounded-2xl p-4 mb-4 ${errores.usuario && "border-[#f65151]"}`}
              type="text"
              placeholder="Ingrese su usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            {errores.usuario && <p className="text-[#f65151] text-sm mb-4">{errores.usuario}</p>}
            <label className="text-lg font-medium">Contraseña:</label>
            <input
              className={`w-full border-2 rounded-2xl p-4 mb-4 ${errores.contraseña && "border-[#f65151]"}`}
              type="password"
              placeholder="Ingrese su contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            {errores.contraseña && <p className="text-[#f65151] text-sm mb-4">{errores.contraseña}</p>}
            <div className="mt-8 flex justify-center">
              <button
                className="bg-[#4e2d1e] text-white w-full lg:w-1/2 text-lg font-bold py-3 rounded-full"
                onClick={handleClick}
                disabled={loading}
              >
                {loading ? "Cargando..." : "Iniciar sesión"}
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link href="/registro">
                <p className="text-[#4e2d1e] cursor-pointer">¿No tienes cuenta? Regístrate aquí.</p>
              </Link>
            </div>
            <div className="mt-4 text-center">
              <Link href="/registrar-empleado">
                <p className="text-[#4e2d1e] cursor-pointer">¿No tenes cuenta? Registráte como Empleado</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
