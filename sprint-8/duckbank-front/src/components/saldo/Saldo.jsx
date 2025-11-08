import React, { useEffect, useState, useRef } from "react";
import { MdAttachMoney } from "react-icons/md";
import axios from "axios";

const Saldo = () => {
  const [saldo, setSaldo] = useState(null);
  const [displaySaldo, setDisplaySaldo] = useState(0);
  const [error, setError] = useState("");
  const [fechaActual, setFechaActual] = useState("");
  const requestRef = useRef();

  // Obtener saldo inicial
  useEffect(() => {
    axios
      .get(`https://duckbank-backend.onrender.com/api/perfil-completo/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setSaldo(response.data.balance);
      })
      .catch((error) => {
        setError("No se pudo cargar el saldo.");
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const hoy = new Date();
    const opciones = { day: "numeric", month: "long", year: "numeric" };
    setFechaActual(hoy.toLocaleDateString("es-AR", opciones));
  }, []);

  // Esto permite dar animación al Saldo al transferir
  useEffect(() => {
    if (saldo === null) return;

    const duration = 1000;
    const start = displaySaldo;
    const end = saldo;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setDisplaySaldo(start + (end - start) * progress);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [saldo]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount);
  };

  return (
    <div className="p-4 bg-white hover:bg-gray-100 rounded-2xl shadow-md w-full h-full flex flex-col">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-[#4e2d1e]">
        <MdAttachMoney className="text-2xl" />
        Saldo
      </h2>

      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <div className="flex flex-col flex-1 items-center justify-center text-center">
          <p className="text-3xl md:text-3xl font-semibold text-black">
            {saldo !== null
              ? formatCurrency(displaySaldo.toFixed(2))
              : "Cargando..."}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Tu saldo a fecha de hoy,{" "}
            <span className="font-medium">{fechaActual}.</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Saldo;
