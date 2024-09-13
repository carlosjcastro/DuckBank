"use client";
import Head from "next/head";
import PropTypes from "prop-types";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Banco from '/public/assets/pages/iniciosesion/bank.jpeg'
import { useInView } from 'react-intersection-observer';

export default function InicioSesion({ onLogin }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeColor, setMensajeColor] = useState("");
  const [errores, setErrores] = useState({ usuario: "", contraseña: "" });
  const [ref, inView] = useInView();

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
      if (usuario === "grupo4@duckbank.com.ar" && contraseña === "grupo4") {
        setMensaje("¡Has iniciado sesión correctamente!");
        setMensajeColor("#52b788");
        onLogin();
        setTimeout(() => {
          router.push("/"); // Redirige usando el enrutador
        }, 2000);
      } else {
        setMensaje("Las credenciales son incorrectas.");
        setMensajeColor("#e63946");
      }
    }
  };

  return (
    <>
      <Head>
        <title>¡Bienvenido a Duckbank!</title>
        <meta
          name="description"
          content="Página de inicio de sesión del homebanking DuckBank."/>
      </Head>

      <div className="flex flex:col lg:flex-row lg:items-center lg:justify-between  max-w-7xl min-h-screen ml-80">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="bg-white p-10 rounded-2xl ">
            <h1 className="lg:text-5xl font-semibold text-center">
              ¡Bienvenido a DuckBank!
            </h1>
            <h2 className="font-medium text-lg text-center mt-4">
              Ingrese sus datos:
            </h2>

            {mensaje && (
              <div className="mt-4 text-center" style={{ color: mensajeColor }}>
                {mensaje}
              </div>
            )}

            <div className="mt-8">
              <div>
                <label className="text-lg font-medium" htmlFor="email">
                  Email:
                </label>
                <input
                  className={`w-full border-2 rounded-2xl p-4 mt-1 ${
                    errores.usuario ? "border-red-500" : ""
                  }`}
                  type="email"
                  id="email"
                  placeholder="Ingrese su E-mail"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
                {errores.usuario && (
                  <p className="text-red-500 text-sm mb-4">{errores.usuario}</p>
                )}
              </div>

              <div>
                <label className="text-lg font-medium" htmlFor="password">
                  Contraseña:
                </label>
                <input
                  className={`w-full border-2 rounded-2xl p-4 mt-1 ${
                    errores.contraseña ? "border-red-500" : ""
                  }`}
                  type="password"
                  id="password"
                  placeholder="Ingrese su Contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                />
                {errores.contraseña && (
                  <p className="text-red-500 text-sm">{errores.contraseña}</p>
                )}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div>
                  <input type="checkbox" id="recuerdame" />
                  <label className="ml-2 font-medium" htmlFor="recuerdame">
                    Recuérdame
                  </label>
                </div>
                <button className="text-sm font-medium">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  className="bg-[#4e2d1e] text-white w-full lg:w-1/2 text-lg font-bold py-3 rounded-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] hover:bg-[#3f2518]"
                  onClick={handleClick}
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 justify-center lg:ml-2 mt-10 lg:mt-0">
        
          <Image
            src={Banco}
            className="w-128 h-auto object-cover rounded-2xl shadow-md"
            alt="Edificio del banco DuckBank"
            width={550}
            height={550}
            loading={inView ? 'eager' : 'lazy'}
          /> 
        </div>
      </div>
      </>
  );
}

InicioSesion.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

