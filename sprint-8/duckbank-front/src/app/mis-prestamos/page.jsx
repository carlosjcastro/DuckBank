"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const MisPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [prestamoAEliminar, setPrestamoAEliminar] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchPrestamos = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        return;
      }

      try {
        const response = await axios.get(
          `https://duckbank-backend.onrender.com/api/mis-prestamos/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setPrestamos(response.data);
      } catch (error) {
        setError(
          "Error al obtener los préstamos: " +
            (error.response?.data?.detail || "Error desconocido")
        );
      }
    };

    fetchPrestamos();
  }, []);

  const confirmarEliminacion = (id) => {
    setPrestamoAEliminar(id);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!prestamoAEliminar) return;

    const token = localStorage.getItem("authToken");

    try {
      await axios.delete(
        `https://web-production-b8a3.up.railway.app/api/eliminar-prestamo/${prestamoAEliminar}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Préstamo con id ${prestamoAEliminar} eliminado.`);

      setPrestamos((prevPrestamos) =>
        prevPrestamos.filter((prestamo) => prestamo.id !== prestamoAEliminar)
      );

      setSuccessMessage("Préstamo eliminado con éxito.");
    } catch (error) {
      console.error(
        "Error al eliminar el préstamo:",
        error.response?.data || error.message
      );
      setError("Error al eliminar el préstamo.");
    } finally {
      setShowConfirmModal(false);
      setPrestamoAEliminar(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-36">
      <h1 className="text-3xl text-center mb-6 font-extrabold">
        Mis Préstamos Solicitados
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {successMessage && (
        <p className="text-green-500 text-center mb-4">{successMessage}</p>
      )}

      {prestamos.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No tenés préstamos registrados.
        </p>
      ) : (
        <div className="space-y-4">
          {prestamos.map((prestamo) => (
            <div
              key={prestamo.id}
              className="bg-white rounded-2xl p-4 relative"
            >
              {/* Botón de eliminar */}
              <button
                onClick={() => confirmarEliminacion(prestamo.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
                title="Eliminar"
              >
                ✖
              </button>

              <p className="font-bold text-lg">Monto: ${prestamo.monto}</p>
              <p className="text-sm text-gray-600">
                <strong>Motivo:</strong> {prestamo.motivo}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Comentario:</strong> {prestamo.comentario || "Ninguno"}
              </p>
              <p
                className={`text-sm font-semibold py-1 rounded-full inline-block ${
                  prestamo.status === "Aprobado"
                    ? "text-[#52b788]"
                    : "text-[#e63946]"
                }`}
              >
                <strong>Estado:</strong> {prestamo.status}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Fecha de solicitud:</strong>{" "}
                {new Date(prestamo.fecha_solicitud).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl text-center w-80">
            <h2 className="text-lg font-semibold mb-4">
              ¿Seguro que queres eliminar el préstamo?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-[#f65151] text-white font-bold py-2 px-4 rounded-full"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setPrestamoAEliminar(null);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisPrestamos;
