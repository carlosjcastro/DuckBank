'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Transferencias() {
  const [transfers, setTransfers] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `https://duckbank-backend.onrender.com/api/transferencias/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransfers(response.data.transferencias);
      } catch (err) {
        setError("Hubo un error al cargar las transferencias.");
        console.error(err);
      }
    };

    fetchTransfers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 mt-36">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Mis Transferencias
        </h2>

        {error && (
          <div className="mb-4 text-red-500 p-2 rounded border border-red-300">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">De</th>
                <th className="px-4 py-2 text-left">A</th>
                <th className="px-4 py-2 text-left">Monto</th>
                <th className="px-4 py-2 text-left">Descripción</th>
                <th className="px-4 py-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
                {transfers.length === 0 ? (
                    <tr>
                    <td colSpan="6" className="px-4 py-2 text-center">
                        No tenes transferencias.
                    </td>
                    </tr>
                ) : (
                    transfers.map((transfer) => (
                    <tr key={transfer.id}>
                        <td className="px-4 py-2">
                        {new Date(transfer.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-2">{transfer.sender_name}</td>
                        <td className="px-4 py-2">{transfer.receiver_name}</td>
                        <td className="px-4 py-2">{transfer.amount}</td>
                        <td className="px-4 py-2">{transfer.description || "N/A"}</td>
                        <td className="px-4 py-2">{transfer.status}</td>
                    </tr>
                    ))
                )}
                </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
