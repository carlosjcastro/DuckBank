'use client'
import { useState } from "react";

export default function Transferencias({ handleTransfer }) {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [monto, setMonto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const origenId = parseInt(origen, 10);
    const destinoId = parseInt(destino, 10);
    const montoValido = parseFloat(monto);

    if (
      isNaN(origenId) ||
      isNaN(destinoId) ||
      isNaN(montoValido) ||
      montoValido <= 0
    ) {
      alert("Por favor, completá todos los campos.");
      return;
    }

    handleTransfer(origenId, destinoId, montoValido);

    setOrigen("");
    setDestino("");
    setMonto("");

    const response = await fetch("/api/transferencias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ origen, destino, monto }),
    });
    const data = await response.json();
    console.log(data.message);
  };

  return (
    <div className="container mx-auto p-8 bg-[#ffffff] rounded-2xl max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-[#143D60]">
        Transferencia Bancaria
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block mb-2 text-[#143D60]"
            aria-label="Cuenta origen"
          >
            Cuenta origen
          </label>
          <input
            type="number"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            className="w-full p-2 rounded-full bg-white text-[#143D60] border"
          />
        </div>
        <div>
          <label
            className="block mb-2 text-[#143D60]"
            aria-label="Cuenta destino"
          >
            Cuenta de Destino
          </label>
          <input
            type="number"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            className="w-full p-2 rounded-full bg-white text-[#143D60] border"
          />
        </div>
        <div>
          <label className="block mb-2 text-[#143D60]" aria-label="Monto">
            Monto
          </label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="w-full p-2 rounded-full bg-white text-[#143D60] border"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[#4e2d1e] text-white rounded-full hover:bg-[#3f2518] transition duration-300"
          aria-label="Transferir"
        >
          Transferir
        </button>
      </form>
    </div>
  );
}
