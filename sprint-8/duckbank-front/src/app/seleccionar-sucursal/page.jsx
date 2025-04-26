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
  const [isDisabled, setIsDisabled] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError("");

    try {
      const sucursalesResponse = await axios.get(`https://web-production-b8a3.up.railway.app/api/sucursales/`);
      setSucursales(sucursalesResponse.data);

      const token = localStorage.getItem("authToken");
      if (token) {
        const permissionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/check-sucursal-permission/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsDisabled(!permissionResponse.data.can_change_sucursal);

        const assignedResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/mi-sucursal/`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-sucursal/${selectedSucursal}/`,
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

        const sucursalSeleccionada = sucursales.find((s) => s.id === parseInt(selectedSucursal));
        if (sucursalSeleccionada) {
          setAssignedSucursal({
            provincia: sucursalSeleccionada.provincia,
            direccion: sucursalSeleccionada.direccion,
          });
        }

        setIsDisabled(true);
      } else {
        setError("Hubo un error al guardar la sucursal.");
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : "Hubo un error al guardar la sucursal.";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 mt-36">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Seleccionar Sucursal</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : error ? (
          <div>
            <p className="text-center text-red-500">{error}</p>
            <button
              onClick={fetchData}
              className="w-full text-white py-2 rounded-full transition duration-300 mt-4"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div>
            {successMessage && (
              <p className="text-center text-green-500 mb-4">{successMessage}</p>
            )}
            <label htmlFor="sucursal" className="block text-lg font-medium mb-2">
              Elegí una sucursal:
            </label>
            <select
              id="sucursal"
              value={selectedSucursal}
              onChange={handleSucursalChange}
              className={`w-full p-4 border border-gray-300 rounded-full mb-4 ${isDisabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
              disabled={isDisabled}
            >
              <option value="">Seleccioná una sucursal</option>
              {sucursales.map((sucursal) => (
                <option key={sucursal.id} value={sucursal.id}>
                  {sucursal.provincia} - {sucursal.direccion}
                </option>
              ))}
            </select>

            <button
              onClick={saveSucursal}
              className={`w-full text-white py-2 rounded-full transition duration-300 ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#4e2d1e] hover:bg-[#3c1d14]"}`}
              disabled={isDisabled}
            >
              Guardar Sucursal
            </button>
          </div>
        )}
      </div>

      {assignedSucursal && (
        <div className="p-6 w-full max-w-md text-center mb-12">
          <h3 className="text-3xl font-extrabold mb-2 text-[#4e2d1e]">Sucursal asignada:</h3>
          <p className="text-gray-700 text-xl">
            {assignedSucursal.provincia} - {assignedSucursal.direccion}
          </p>
          <p className="text-gray-600 text-sm mt-4">
            Cualquier trámite debe realizarse en esta sucursal. Para cambiar de sucursal, por favor contactáte con soporte.
          </p>
        </div>
      )}

      <div className="w-full max-w-7xl px-4">
        <h3 className="text-xl font-semibold mb-6 text-center">Nuestras sucursales</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sucursales.map((sucursal) => (
            <div key={sucursal.id} className="bg-white rounded-2xl p-6">
              <h4 className="text-lg font-semibold">{sucursal.provincia}</h4>
              <p className="text-sm text-gray-500">{sucursal.direccion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
