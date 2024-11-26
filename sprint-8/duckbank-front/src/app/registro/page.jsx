"use client"; 
import Image from "next/image"; 
import { useState } from "react"; 
import { useRouter } from "next/navigation"; 
import { motion } from "framer-motion";
import bankImage from "../../../public/assets/pages/inicio-sesion/bank.jpeg";

export default function Registro() {
  const router = useRouter(); 
  const [usuarionew, setUsuarionew] = useState(""); 
  const [contraseñanew, setContraseñanew] = useState(""); 
  const [dni, setDni] = useState(""); 
  const [mensaje, setMensaje] = useState(""); 
  const [mensajeColor, setMensajeColor] = useState(""); 
  const [errores, setErrores] = useState({ email: "", password: "", dni: "" });

  const validarInputs = () => {
    let erroresNuevos = { email: "", password: "", dni: "" }; 
    let esValido = true;

    // Validación de email si el usuario completó o no el campo.
    if (!usuarionew) {
      erroresNuevos.email = "El campo de email es obligatorio.";
      esValido = false; 
    } else if (!/\S+@\S+\.\S+/.test(usuarionew)) {
      erroresNuevos.email = "El email no es válido.";
      esValido = false; 
    }

    // Validación de contraseña si el usuario completó o no el campo.
    if (!contraseñanew) {
      erroresNuevos.password = "El campo de contraseña es obligatorio.";
      esValido = false; 
    } else if (contraseñanew.length < 6) {
      erroresNuevos.password = "La contraseña debe tener al menos 6 caracteres.";
      esValido = false; 
    }

    // Validación de DNI. Solo se permiten hasta 4 caracteres.
    if (!dni) {
      erroresNuevos.dni = "El campo de DNI es obligatorio.";
      esValido = false; 
    } else if (dni.length !== 4) {
      erroresNuevos.dni = "El DNI debe tener exactamente 4 caracteres.";
      esValido = false; 
    }

    setErrores(erroresNuevos); 
    return esValido; 
  };

  // Si el usuario no completó ningún campo o están mal escritos, muestra un mensaje de error
  const handleRegister = () => {
    if (!validarInputs()) {
      setMensaje("Por favor, completá o corregí los campos."); 
      setMensajeColor("#f65151"); 
      return; 
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || []; 
    const userExists = existingUsers.some(user => user.email === usuarionew || user.dni === dni);

    if (userExists) {
      setMensaje("El usuario ya existe y es parte de DuckBank."); 
      setMensajeColor("#f65151"); 
      return; 
    }

    const newUser = { 
      email: usuarionew, 
      password: contraseñanew, 
      dni: dni, 
    };

    existingUsers.push(newUser); 
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setMensaje("¡Te has registrado correctamente!"); 
    setMensajeColor("#52b788");

    setTimeout(() => {
      router.push("/inicio-sesion"); 
    }, 4000); 
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl">
        <motion.div 
          className="bg-white p-10 rounded-l-2xl w-full lg:w-1/2" 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 20 }} 
          transition={{ duration: 0.5 }} 
        >
          <h1 className="text-4xl font-bold text-center">¡Registrá tu cuenta!</h1>
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
              { label: "Email", type: "email", value: usuarionew, setValue: setUsuarionew, error: errores.email },
              { label: "Contraseña", type: "password", value: contraseñanew, setValue: setContraseñanew, error: errores.password },
              { label: "Últimos 4 dígitos de DNI", type: "text", value: dni, setValue: setDni, error: errores.dni }
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
                  placeholder={`Ingresá su ${input.label}`}
                  value={input.value}
                  onChange={(e) => input.setValue(e.target.value)}
                />
                {input.error && <p className="text-[#f65151] text-sm mb-4">{input.error}</p>}
              </motion.div>
            ))}

            <div className="mt-8 flex justify-center">
              <button
                className="bg-[#4e2d1e] text-white w-full lg:w-1/2 text-lg font-bold py-3 rounded-full transition transition-300 hover:bg-[#3f2518]"
                onClick={handleRegister}
              >
                Registrarse
              </button>
            </div>
          </div>
        </motion.div>

        <div className="hidden lg:flex lg:w-1/2 justify-center mt-10 lg:mt-0">
          <Image
            src={bankImage}
            width={600}
            height={600}
            className="w-full h-auto object-cover rounded-r-2xl shadow-md"
            alt="Oficinas del banco DuckBank"
          />
        </div>
      </div>
    </div>
  );
}
