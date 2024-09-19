"use client"; 
import Image from "next/image"; 
import { useState } from "react"; 
import { useRouter } from "next/navigation"; 
import bank from "../../../public/assets/pages/inicio-sesion/bank.jpeg"; 
import Link from "next/link"; 
import { motion } from "framer-motion";
import { useUserProfile } from "../../components/context/UserProfileContext";

export default function InicioSesion() {
  const router = useRouter(); 
  const { setProfileData } = useUserProfile(); 
  const [usuario, setUsuario] = useState(""); 
  const [contraseña, setContraseña] = useState(""); 
  const [mensaje, setMensaje] = useState(""); 
  const [mensajeColor, setMensajeColor] = useState(""); 
  const [errores, setErrores] = useState({ usuario: "", contraseña: "" });

  const validarInputs = () => {
    let erroresNuevos = { usuario: "", contraseña: "" }; 
    let esValido = true;

    if (!usuario) {
      erroresNuevos.usuario = "El campo de email es obligatorio."; 
      esValido = false; 
    }

    if (!contraseña) {
      erroresNuevos.contraseña = "El campo de contraseña es obligatorio."; 
      esValido = false; 
    }

    setErrores(erroresNuevos); 
    return esValido; 
  };

  const handleClick = () => {
    if (validarInputs()) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || []; 
      const user = existingUsers.find(
        (user) => user.email === usuario && user.password === contraseña
      );
  
      if (user) {
        localStorage.setItem("authToken", "someToken");
        setProfileData(user);
        localStorage.setItem("userProfile", JSON.stringify(user));
        setMensaje("¡Has iniciado sesión correctamente!");
        setMensajeColor("#52b788");
      
        setTimeout(() => {
          router.push("/");
        }, 4000);
      } else {
        setMensaje("Las credenciales son incorrectas."); 
        setMensajeColor("#f65151"); 
      }
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl">
        <div className="bg-white p-10 rounded-l-2xl w-full lg:w-1/2">
          <h1 className="text-2xl lg:text-3xl font-bold text-center">¡Bienvenido a DuckBank!</h1>
          <p className="font-medium text-lg text-center mt-4">Ingresá sus datos:</p>
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
            {[ 
              { label: "Email", type: "email", value: usuario, setValue: setUsuario, error: errores.usuario },
              { label: "Contraseña", type: "password", value: contraseña, setValue: setContraseña, error: errores.contraseña },
            ].map((input, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <label className="text-lg font-medium">{input.label}:</label>
                <input
                  className={`w-full border-2 rounded-2xl p-4 mb-4 ${input.error ? "border-[#f65151]" : ""}`}
                  type={input.type}
                  placeholder={`Ingrese su ${input.label}`}
                  value={input.value}
                  onChange={(e) => input.setValue(e.target.value)}
                />
                {input.error && <p className="text-[#f65151] text-sm mb-4">{input.error}</p>}
              </motion.div>
            ))}
            <div className="mt-8 flex justify-center">
              <button
                className="bg-[#4e2d1e] text-white w-full lg:w-1/2 text-lg font-bold py-3 rounded-full transition transition-300 hover:bg-[#3f2518]"
                onClick={handleClick}
              >
                Iniciar sesión
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link href="/registro">
                <p className="text-[#4e2d1e] cursor-pointer">¿No tenes una cuenta? Regístrate aquí.</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-1/2 justify-center mt-10 lg:mt-0">
          <Image
            src={bank}
            width={600}
            height={600}
            className="w-full h-full object-cover rounded-r-2xl shadow-md"
            alt="Oficinas del banco DuckBank"
          />
        </div>
      </div>
    </div>
  );
}
