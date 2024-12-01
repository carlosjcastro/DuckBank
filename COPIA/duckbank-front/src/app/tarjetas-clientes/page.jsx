'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const TarjetasCliente = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cvvVisible, setCvvVisible] = useState(false);

  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Usuario no autenticado.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tarjetas/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = Array.isArray(response.data) ? response.data : [];
        setTarjetas(data);
      } catch (err) {
        setError("No se pudieron cargar las tarjetas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTarjetas();
  }, []);

  const toggleCvvVisibility = () => {
    setCvvVisible(!cvvVisible);
  };

  return (
    <div className="p-6 m-10 bg-gray-100 rounded-2xl mt-36">
      <h2 className="text-3xl font-extrabold mb-6 text-center">Tarjetas Asociadas</h2>

      {loading && <p className="text-gray-500 text-center">Cargando tarjetas...</p>}

      {error && !loading && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-wrap justify-center gap-6">
          {tarjetas.length > 0 ? (
            tarjetas.map((tarjeta) => (
              <div key={tarjeta.id} className="w-full sm:w-80 md:w-96 xl:w-1/4">
                <div className="relative w-full h-full bg-[#463f3a] text-white rounded-xl shadow-lg p-4 flex flex-col justify-between">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold">DuckBank</h3>
                      <img
                        src="/assets/pages/mis-tarjetas/Visa.png"
                        alt="Visa"
                        className="w-8"
                      />
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-xl font-semibold tracking-widest">
                        {tarjeta.numero.match(/.{1,4}/g).join(" ")}
                      </p>
                      <p className="text-sm mt-2">Tipo de tarjeta:</p>
                      <p className="text-lg font-medium">Débito</p>
                    </div>
                    <div className="flex justify-between mt-4 text-xs">
                      <div>
                        <p className="text-sm">Emisión:</p>
                        <p>{new Date(tarjeta.fecha_emision).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm">Expira:</p>
                        <p>{new Date(tarjeta.fecha_vencimiento).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center relative">
                    <p className="text-sm text-gray-300">Código de seguridad (CVV):</p>
                    <div className="w-24 h-8 bg-gray-700 text-center text-white font-bold text-lg flex items-center justify-center rounded-md mx-auto mt-2">
                      {cvvVisible ? tarjeta.cvv : '***'}
                    </div>

                    <button
                      className="absolute top-1/2 transform -translate-y-1/2 right-0 text-sm text-blue-500"
                      onClick={toggleCvvVisibility}
                    >
                      {cvvVisible ? (
                        <FaEyeSlash className="text-white" size={25} />
                      ) : (
                        <FaEye className="text-white" size={25} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-2 text-center text-lg text-gray-500">
              No tenés tarjetas asociadas.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TarjetasCliente;
