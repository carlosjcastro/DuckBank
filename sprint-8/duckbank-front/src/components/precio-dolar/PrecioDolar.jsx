"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { GoGraph } from "react-icons/go";

export default function PrecioDolar() {
  const [rates, setRates] = useState({
    oficial: null,
    blue: null,
    bolsa: null,
    tarjeta: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrls = useMemo(
    () => ({
      oficial: "https://dolarapi.com/v1/dolares/oficial",
      blue: "https://dolarapi.com/v1/dolares/blue",
      bolsa: "https://dolarapi.com/v1/dolares/bolsa",
      tarjeta: "https://dolarapi.com/v1/dolares/tarjeta",
    }),
    []
  );

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const responses = await Promise.all([
          axios.get(apiUrls.oficial),
          axios.get(apiUrls.blue),
          axios.get(apiUrls.bolsa),
          axios.get(apiUrls.tarjeta),
        ]);

        setRates({
          oficial: responses[0].data,
          blue: responses[1].data,
          bolsa: responses[2].data,
          tarjeta: responses[3].data,
        });

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchRates();
  }, [apiUrls]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 h-full flex items-center justify-center w-full">
        <p className="text-blue-600 font-bold">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-6 h-full flex items-center justify-center w-full">
        <p className="text-red-600 font-bold">
          Error al obtener la solicitud: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[400px] w-full rounded-2xl bg-white p-6 flex flex-col justify-between">
      <div className="flex items-center space-x-2 mb-6">
        <GoGraph size={32} className="text-[#4e2d1e]" />
        <h1 className="text-2xl font-bold">Valor del dólar en Argentina</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="overflow-x-auto rounded-2xl">
          <table className="min-w-full bg-white rounded-2xl shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-bold text-gray-600">
                  Tipo
                </th>
                <th className="px-4 py-2 text-left font-bold text-gray-600">
                  Cotización
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="px-4 py-2 text-gray-700">Oficial</td>
                <td className="px-4 py-2 text-gray-700">
                  ${rates.oficial?.venta ?? "N/A"}
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-2 text-gray-700">Blue</td>
                <td className="px-4 py-2 text-gray-700">
                  ${rates.blue?.venta ?? "N/A"}
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-2 text-gray-700">Bolsa</td>
                <td className="px-4 py-2 text-gray-700">
                  ${rates.bolsa?.venta ?? "N/A"}
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-2 text-gray-700">Tarjeta</td>
                <td className="px-4 py-2 text-gray-700">
                  ${rates.tarjeta?.venta ?? "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
