'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";

const MisPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [prestamoIdToDelete, setPrestamoIdToDelete] = useState(null);

  useEffect(() => {
    const fetchPrestamos = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/mis-prestamos/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPrestamos(response.data);
      } catch (error) {
        setError(
          "Error al obtener los préstamos: " +
            error.response?.data?.detail ||
            "Error desconocido"
        );
      }
    };

    fetchPrestamos();
  }, []);

  const handleEliminarPrestamo = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No estás autenticado. Por favor, inicia sesión.");
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/eliminar-prestamo/${prestamoIdToDelete}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPrestamos(prestamos.filter((prestamo) => prestamo.id !== prestamoIdToDelete));
      setModalVisible(false);
    } catch (error) {
      setError(
        "Error al eliminar el préstamo: " +
          error.response?.data?.detail ||
          "Error desconocido"
      );
    }
  };

  const handleOpenModal = (prestamoId) => {
    setPrestamoIdToDelete(prestamoId);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-36">
      <h1 className="text-3xl text-center mb-6 font-extrabold">
        Mis Préstamos Solicitados
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {prestamos.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No tenes préstamos registrados.
        </p>
      ) : (
        <div className="space-y-4">
          {prestamos.map((prestamo) => (
            <div key={prestamo.id} className="bg-white rounded-2xl p-4">
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

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleOpenModal(prestamo.id)}
                  className="bg-[#e63946] text-white px-4 py-2 rounded-full hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-96">
            <h3 className="text-lg font-bold text-center mb-4">
              ¿Estás seguro que deseas eliminar la solicitud del préstamo?
            </h3>
            <div className="flex justify-around">
              <button
                onClick={handleEliminarPrestamo}
                className="bg-[#e63946] text-white px-4 py-2 rounded-full hover:bg-red-600"
              >
                Sí
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisPrestamos;
