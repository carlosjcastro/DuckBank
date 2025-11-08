"use client";

import React, { useEffect, useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import axios from "axios";

const TarjetasCliente = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Usuario no autenticado.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://duckbank-backend.onrender.com/api/tarjetas/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = Array.isArray(response.data) ? response.data : [];
        setTarjetas(data);
      } catch (err) {
        setError("No se pudieron cargar las tarjetas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTarjetas();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start px-4 pt-20 pb-10 md:pt-28 md:pb-20">
      <div className="bg-white rounded-2xl p-6 border border-gray-100  w-full max-w-6xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          Tarjetas Asociadas
        </h2>

        <p className="text-gray-600 mb-6 text-sm leading-relaxed text-center md:text-left">
          A continuación se muestran las tarjetas asociadas a tu cuenta. Estos
          datos son generados automáticamente al crear tu cuenta y deben
          mantenerse en confidencialidad.
        </p>

        {loading && (
          <p className="text-gray-500 text-center">Cargando tarjetas...</p>
        )}

        {error && !loading && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {!loading && !error && (
          <>
            {tarjetas.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-6 mt-4">
                {tarjetas.map((tarjeta) => (
                  <div
                    key={tarjeta.id}
                    className="relative bg-gradient-to-r from-[#4e2d1e] to-[#7b4a2e] text-white rounded-xl p-4 w-full sm:w-64 shadow-lg transform hover:scale-[1.02] transition duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <FaRegCreditCard className="text-2xl opacity-90" />
                      <span className="text-sm bg-white/20 px-2 py-1 rounded-md">
                        {tarjeta.tipo}
                      </span>
                    </div>
                    <p className="text-lg tracking-widest font-mono mb-2 text-center">
                      {tarjeta.numero.replace(/(\d{4})(?=\d)/g, "$1 ")}
                    </p>
                    <p className="text-sm opacity-80 text-center">
                      Cliente asociado
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-4">
                No tenés tarjetas asociadas.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TarjetasCliente;
