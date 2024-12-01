import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  
  return (
    <div className="relative p-4 bg-white hover:bg-gray-200 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Clientes</h2>
      {error && <p className="text-red-500">{error}</p>}
      {clientes.length === 0 && !error && (
        <p className="text-gray-500">No hay clientes disponibles.</p>
      )}
      <ul className="list-disc pl-6">
        {Array.isArray(clientes) &&
          clientes.map((cliente) => (
            <li key={cliente.customer_id}>
              {cliente.customer_name} {cliente.customer_surname}
            </li>
          ))}
      </ul>
      
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => router.push("/tarjetas-clientes")}
          className="mt-6 text-[#4e2d1e] rounded-full py-2 px-6 active:scale-[.98] transition duration-300 mx-auto block"
        >
          Ver tarjetas asociadas
        </button>
      </div>
    </div>
  );
};

export default Clientes;
