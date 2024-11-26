'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";

const TarjetasCliente = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const [error, setError] = useState("");

  // Se envía la solicitud al servidor para obtener las tarjetas asociadas al cliente
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/tarjetas/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setTarjetas(data);
      })
      .catch((err) => {
        setError("No se pudieron cargar las tarjetas.");
        console.error(err);
      });
  }, []);

  return (
    <div className="p-6 m-10 bg-gray-100 bg-white mt-36 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Tarjetas Asociadas</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="list-disc">
        {Array.isArray(tarjetas) && tarjetas.length > 0 ? (
          tarjetas.map((tarjeta) => (
            <li key={tarjeta.id}>
              {tarjeta.tipo} - {tarjeta.numero}
            </li>
          ))
        ) : (
          <p>No tenes tarjetas asociadas.</p>
        )}
      </ul>
    </div>
  );
};

export default TarjetasCliente;
