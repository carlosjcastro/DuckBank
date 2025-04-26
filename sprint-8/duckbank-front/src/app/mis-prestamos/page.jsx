'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

const MisPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrestamos = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        return;
      }

      try {
        const response = await axios.get(
          `https://web-production-b8a3.up.railway.app/api/mis-prestamos/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setPrestamos(response.data);
      } catch (error) {
        setError("Error al obtener los préstamos: " + error.response?.data?.detail || "Error desconocido");
      }
    };

    fetchPrestamos();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-36">
      <h1 className="text-3xl text-center mb-6 font-extrabold">Mis Préstamos Solicitados</h1>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {prestamos.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No tenes préstamos registrados.</p>
      ) : (
        <div className="space-y-4">
          {prestamos.map((prestamo) => (
            <div
              key={prestamo.id}
              className="bg-white rounded-2xl p-4"
            >
              <p className="font-bold text-lg">Monto: ${prestamo.monto}</p>
              <p className="text-sm text-gray-600"><strong>Motivo:</strong> {prestamo.motivo}</p>
              <p className="text-sm text-gray-600"><strong>Comentario:</strong> {prestamo.comentario || "Ninguno"}</p>
              <p 
                className={`text-sm font-semibold py-1 rounded-full inline-block ${
                  prestamo.status === "Aprobado" ? "text-[#52b788]" : "text-[#e63946]"
                }`}
              >
                <strong>Estado:</strong> {prestamo.status}
              </p>

              <p className="text-sm text-gray-600"><strong>Fecha de solicitud:</strong> {new Date(prestamo.fecha_solicitud).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPrestamos;
