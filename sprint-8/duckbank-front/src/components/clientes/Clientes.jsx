import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegCreditCard } from "react-icons/fa";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No se encontró token de autenticación");
          return;
        }

        const response = await axios.get(
          "https://duckbank-backend.onrender.com/api/tarjetas/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (Array.isArray(response.data)) {
          setClientes(response.data);
        } else {
          setError("No se encontraron clientes asociados");
        }
      } catch (err) {
        console.error("Error al cargar clientes:", err);
        setError("Error al obtener los clientes");
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="flex flex-col justify-between p-4 bg-white hover:bg-gray-100 rounded-2xl shadow-md w-full h-full">
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#4e2d1e]">
          <FaRegCreditCard className="text-lg" />
          Clientes
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!error && clientes.length === 0 && (
          <p className="text-gray-500 text-center">
            No hay clientes disponibles.
          </p>
        )}

        {Array.isArray(clientes) && clientes.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {clientes.map((cliente) => (
              <div
                key={cliente.id}
                className="relative bg-gradient-to-r from-[#4e2d1e] to-[#7b4a2e] text-white rounded-xl p-4 w-full sm:w-64 shadow-lg transform hover:scale-[1.02] transition duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <FaRegCreditCard className="text-2xl opacity-90" />
                  <span className="text-sm bg-white/20 px-2 py-1 rounded-md">
                    {cliente.tipo}
                  </span>
                </div>
                <p className="text-lg tracking-widest font-mono mb-2">
                  {cliente.numero.replace(/(\d{4})(?=\d)/g, "$1 ")}
                </p>
                <p className="text-sm opacity-80">Cliente asociado</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => router.push("/tarjetas-clientes")}
          className="text-[#4e2d1e] border border-[#4e2d1e] rounded-full py-2 px-6 active:scale-[.98] transition duration-300 hover:bg-[#4e2d1e] hover:text-white"
        >
          Ver tarjetas asociadas
        </button>
      </div>
    </div>
  );
};

export default Clientes;
