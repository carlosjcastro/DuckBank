"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";

export default function Registro() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeColor, setMensajeColor] = useState("");
  const [errores, setErrores] = useState({
    usuario: "",
    password: "",
    dni: "",
  });
  const [loading, setLoading] = useState(false);

  const validarInputs = () => {
    const erroresNuevos = { usuario: "", password: "", dni: "" };
    let esValido = true;

    if (!usuario || usuario.length < 3) {
      erroresNuevos.usuario = "El usuario debe tener al menos 3 caracteres.";
      esValido = false;
    }

    if (!password || password.length < 6) {
      erroresNuevos.password =
        "La contraseña debe tener al menos 6 caracteres.";
      esValido = false;
    }

    if (!dni || !/^\d+$/.test(dni) || dni.length > 8) {
      erroresNuevos.dni =
        "El DNI debe contener solo números y ser de máximo 8 caracteres.";
      esValido = false;
    }

    setErrores(erroresNuevos);
    return esValido;
  };

  const handleClick = async () => {
    if (!validarInputs()) return;

    setLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const data = {
        username: usuario.trim(),
        password,
        dni: dni.trim(),
      };

      const response = await axios.post(
        `https://web-production-b8a3.up.railway.app/api/register/`,
        data,
        { headers }
      );

      if (response.status === 201) {
        setMensaje("Registro exitoso");
        setMensajeColor("#52b788");
        setTimeout(() => {
          router.push("/inicio-sesion");
        }, 1500);
      } else if (response.data.detail) {
        setMensaje(response.data.detail);
        setMensajeColor("#f65151");
      } else {
        setMensaje("Error inesperado al registrarse");
        setMensajeColor("#f65151");
      }
    } catch (error) {
      console.error("Detalles del error al registrarse:", error);

      if (error.response) {
        console.error("Error de respuesta:", error.response);
        setMensaje(error.response?.data?.detail || "Error al registrarse.");
        setMensajeColor("#f65151");
      } else {
        setMensaje("Error de red, por favor intente nuevamente.");
        setMensajeColor("#f65151");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDniChange = (e) => {
    const inputDni = e.target.value;

    if (/^\d{0,8}$/.test(inputDni)) {
      setDni(inputDni);
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl">
        <div className="bg-white p-10 rounded-l-2xl w-full lg:w-1/2">
          <h1 className="text-2xl lg:text-3xl font-bold text-center">
            ¡Regístrate en DuckBank!
          </h1>
          <div className="mt-4 text-center text-lg text-[#000000] border-2 border-[#f3c677] bg-[#f3c677] bg-opacity-10 p-4 rounded-2xl">
            Aunque aparezca algún error, tu registro se ha realizado con éxito.
            Podes continuar a iniciar sesión.
          </div>
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
              {
                label: "Usuario",
                type: "text",
                value: usuario,
                setValue: setUsuario,
                error: errores.usuario,
              },
              {
                label: "Contraseña",
                type: "password",
                value: password,
                setValue: setPassword,
                error: errores.password,
              },
              {
                label: "DNI",
                type: "text",
                value: dni,
                setValue: setDni,
                error: errores.dni,
                onChange: handleDniChange,
              },
            ].map((input, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <label className="text-lg font-medium">{input.label}:</label>
                <input
                  className={`w-full border-2 rounded-2xl p-4 mb-4 ${
                    input.error ? "border-[#f65151]" : ""
                  }`}
                  type={input.type}
                  placeholder={`Ingrese su ${input.label}`}
                  value={input.value}
                  onChange={
                    input.onChange || ((e) => input.setValue(e.target.value))
                  }
                />
                {input.error && (
                  <p className="text-[#f65151] text-sm mb-4">{input.error}</p>
                )}
              </motion.div>
            ))}
            <div className="mt-8 flex justify-center">
              <button
                className="bg-[#4e2d1e] text-white w-full lg:w-1/2 text-lg font-bold py-3 rounded-full"
                onClick={handleClick}
                disabled={loading}
              >
                {loading ? "Cargando..." : "Registrar"}
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link href="/inicio-sesion">
                <p className="text-[#4e2d1e] cursor-pointer">
                  ¿Ya tienes cuenta? Inicia sesión aquí.
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex w-full lg:w-1/2 justify-center">
          <img
            src="/assets/pages/inicio-sesion/bank.jpeg"
            alt="Imagen de Registro"
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}
