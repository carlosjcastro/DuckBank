import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Saldo = () => {
  const [saldo, setSaldo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-balance/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSaldo(response.data.balance);
      } catch (error) {
        setError("No se pudo cargar el saldo");
      }
    };

    fetchSaldo();
  }, []);

  return (
    <div className="p-4 bg-white hover:bg-gray-200 rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Saldo</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-2xl font-bold">${saldo?.toLocaleString("es-AR")}</p>
      )}
      {/* <Link href="/transferencia">Realizar Transferencia</Link> */}
    </div>
  );
};

export default Saldo;
