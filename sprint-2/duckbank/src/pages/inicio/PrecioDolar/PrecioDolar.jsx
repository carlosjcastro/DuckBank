import { useState, useEffect } from "react";
import axios from "axios";
import { GoGraph } from "react-icons/go";

const PrecioDolar = () => {
  const [rates, setRates] = useState({
    oficial: null,
    blue: null,
    bolsa: null,
    tarjeta: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrls = {
    oficial: "https://dolarapi.com/v1/dolares/oficial",
    blue: "https://dolarapi.com/v1/dolares/blue",
    bolsa: "https://dolarapi.com/v1/dolares/bolsa",
    tarjeta: "https://dolarapi.com/v1/dolares/tarjeta",
  };

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

  if (loading) return <p className="text-blue-600">Cargando...</p>;
  if (error)
    return (
      <p className="text-red-600">
        Error al obtener la solicitud: {error.message}
      </p>
    );

  return (
    <div className="rounded-2xl shadow-lg p-6">
      <GoGraph size={35} className="m-2" />
      <h2 className="text-xl font-bold mb-4"> Valor del dólar en Argentina</h2>
      <div className="overflow-x-auto rounded-2xl">
        <table className="min-w-full bg-white rounded-2xl shadow-md">
          <thead className="bg-[#]">
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
                ${rates.oficial?.venta || "N/A"}
              </td>
            </tr>

            <tr className="bg-white">
              <td className="px-4 py-2 text-gray-700">Blue</td>
              <td className="px-4 py-2 text-gray-700">
                ${rates.blue?.venta || "N/A"}
              </td>
            </tr>

            <tr className="bg-white">
              <td className="px-4 py-2 text-gray-700">Bolsa</td>
              <td className="px-4 py-2 text-gray-700">
                ${rates.bolsa?.venta || "N/A"}
              </td>
            </tr>

            <tr className="bg-white">
              <td className="px-4 py-2 text-gray-700">Tarjeta</td>
              <td className="px-4 py-2 text-gray-700">
                ${rates.tarjeta?.venta || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrecioDolar;
