"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SeleccionarSucursal() {
  const [sucursales, setSucursales] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState("");
  const [assignedSucursal, setAssignedSucursal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [canChangeSucursal, setCanChangeSucursal] = useState(false);
  const [changesLeft, setChangesLeft] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    setError("");

    try {
      // 1️⃣ Obtener todas las sucursales disponibles
      const sucursalesResponse = await axios.get(
        `https://duckbank-backend.onrender.com/api/sucursales/`
      );
      setSucursales(sucursalesResponse.data);

      // 2️⃣ Verificar si el usuario puede cambiar sucursal
      const token = localStorage.getItem("authToken");
      if (token) {
        const permissionResponse = await axios.get(
          `https://duckbank-backend.onrender.com/api/check-sucursal-permission/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { can_change_sucursal, changes_left } = permissionResponse.data;
        setCanChangeSucursal(can_change_sucursal);
        setChangesLeft(changes_left);

        // 3️⃣ Obtener la sucursal actual asignada
        const assignedResponse = await axios.get(
          `https://duckbank-backend.onrender.com/api/mi-sucursal/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setAssignedSucursal(assignedResponse.data);
        setSelectedSucursal(assignedResponse.data.id);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setAssignedSucursal(null);
      } else {
        setError("Hubo un error al cargar los datos.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSucursalChange = (e) => {
    setSelectedSucursal(e.target.value);
  };

  const saveSucursal = async () => {
    if (!selectedSucursal) {
      setError("Por favor, seleccioná una sucursal.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No estás autenticado. Por favor, iniciá sesión.");
      return;
    }

    try {
      const response = await axios.post(
        `https://duckbank-backend.onrender.com/api/update-sucursal/${selectedSucursal}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Sucursal asignada correctamente.");
        setError("");

        const sucursalSeleccionada = sucursales.find(
          (s) => s.id === parseInt(selectedSucursal)
        );
        if (sucursalSeleccionada) {
          setAssignedSucursal({
            provincia: sucursalSeleccionada.provincia,
            direccion: sucursalSeleccionada.direccion,
          });
        }

        // 🔒 Actualizar el contador de cambios
        setChangesLeft((prev) => Math.max(prev - 1, 0));

        // Si ya no le quedan cambios, bloquear
        if (changesLeft - 1 <= 0) {
          setCanChangeSucursal(false);
        }
      } else {
        setError("Hubo un error al guardar la sucursal.");
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : "Hubo un error al guardar la sucursal.";
      setError(errorMessage);
    }
  };

  // 🔥 Mensaje dinámico según cambios restantes
  const renderChangeMessage = () => {
    if (changesLeft > 1) {
      return (
        <p className="text-sm text-gray-600 mb-2 text-center">
          Te quedan <strong>{changesLeft}</strong> cambios disponibles.
        </p>
      );
    } else if (changesLeft === 1) {
      return (
        <p className="text-sm text-yellow-600 mb-2 text-center">
          ⚠️ Te queda <strong>1 cambio</strong> disponible.
        </p>
      );
    } else {
      return (
        <p className="text-sm text-red-500 mb-2 text-center">
          Ya no podés cambiar de sucursal.
        </p>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 mt-36">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md mb-12 shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Seleccionar Sucursal
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : error ? (
          <div>
            <p className="text-center text-red-500">{error}</p>
            <button
              onClick={fetchData}
              className="w-full bg-[#4e2d1e] hover:bg-[#3c1d14] text-white py-2 rounded-full transition duration-300 mt-4"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div>
            {successMessage && (
              <p className="text-center text-green-600 mb-4 font-medium">
                {successMessage}
              </p>
            )}

            <label htmlFor="sucursal" className="block text-lg font-medium mb-2">
              Elegí una sucursal:
            </label>

            <select
              id="sucursal"
              value={selectedSucursal}
              onChange={handleSucursalChange}
              className={`w-full p-4 border border-gray-300 rounded-full mb-4 ${
                !canChangeSucursal ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              disabled={!canChangeSucursal}
            >
              <option value="">Seleccioná una sucursal</option>
              {sucursales.map((sucursal) => (
                <option key={sucursal.id} value={sucursal.id}>
                  {sucursal.provincia} - {sucursal.direccion}
                </option>
              ))}
            </select>

            {renderChangeMessage()}

            {canChangeSucursal && (
              <button
                onClick={saveSucursal}
                className="w-full bg-[#4e2d1e] hover:bg-[#3c1d14] text-white py-2 rounded-full transition duration-300"
              >
                Guardar Sucursal
              </button>
            )}
          </div>
        )}
      </div>

      {assignedSucursal && (
        <div className="p-6 w-full max-w-md text-center mb-12">
          <h3 className="text-3xl font-extrabold mb-2 text-[#4e2d1e]">
            Sucursal asignada:
          </h3>
          <p className="text-gray-700 text-xl">
            {assignedSucursal.provincia} - {assignedSucursal.direccion}
          </p>
          <p className="text-gray-600 text-sm mt-4">
            Cualquier trámite debe realizarse en esta sucursal. Para cambiar de
            sucursal nuevamente, contactá con soporte.
          </p>
        </div>
      )}

      <div className="w-full max-w-7xl px-4">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Nuestras sucursales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sucursales.map((sucursal) => (
            <div key={sucursal.id} className="bg-white rounded-2xl p-6 shadow">
              <h4 className="text-lg font-semibold">{sucursal.provincia}</h4>
              <p className="text-sm text-gray-500">{sucursal.direccion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
