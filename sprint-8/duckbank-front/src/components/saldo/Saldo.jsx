import React, { useEffect, useState } from "react";
import axios from "axios";

const Saldo = () => {
  const [saldo, setSaldo] = useState(null);
  const [error, setError] = useState("");


  // Se envía la solicitud al servidor para obtener el saldo del usuario
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     })
  //     .then((response) => {
  //       setSaldo(response.data.saldo);
  //     })
  //     .catch((error) => {
  //       setError("No se pudo cargar el saldo.");
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div className="p-4 bg-white hover:bg-gray-200  rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Saldo</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-lg">Saldo disponible: ${saldo}</p>
      )}
    </div>
  );
};

export default Saldo;
