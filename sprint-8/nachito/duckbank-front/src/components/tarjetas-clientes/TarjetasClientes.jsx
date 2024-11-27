import React from "react";
import TarjetasCliente from "../../components/tarjetas-clientes/TarjetasClientes";

const TarjetasClientePage = () => {
  return (
    <div className="flex p-8 items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Mis Tarjetas</h1>
        <TarjetasCliente />
      </div>
    </div>
  );
};

export default TarjetasClientePage;
