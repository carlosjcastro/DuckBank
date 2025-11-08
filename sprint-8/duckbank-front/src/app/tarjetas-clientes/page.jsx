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
    <div className="p-6 m-10 bg-gray-100 bg-white mt-36 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Tarjetas Asociadas</h2>

      {loading && <p className="text-gray-500">Cargando tarjetas...</p>}

      {error && !loading && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="list-disc">
          {tarjetas.length > 0 ? (
            tarjetas.map((tarjeta) => (
              <li key={tarjeta.id} className="flex items-center gap-2">
                <FaRegCreditCard className="text-lg" />
                <span>
                  {tarjeta.tipo} - {tarjeta.numero}
                </span>
              </li>
            ))
          ) : (
            <p>No tenés tarjetas asociadas.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default TarjetasCliente;
