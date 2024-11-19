"use client";

import React, { useState } from "react";
import axios from "axios";

const SolicitarPrestamo = () => {
  const [monto, setMonto] = useState("");
  const [motivo, setMotivo] = useState("");
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [solicitudes, setSolicitudes] = useState(0);

  // Esto permite obtener la cantidad de solicitudes de préstamo realizadas por el usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Se verifica que el usuario no haya realizado más de 3 solicitudes de préstamo
    if (solicitudes >= 3) {
      setError("Solo podes realizar hasta 3 solicitudes de préstamo.");
      return;
    }

    // Esto permite validar que el monto y el motivo no estén vacíos
    if (!monto || !motivo) {
      setError("El monto y el motivo son obligatorios.");
      return;
    }

    // Esto envía la solicitud de préstamo al servidor y muestra un mensaje de éxito o error
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prestamos/solicitud/`,
        { monto, motivo, comentario },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccess("Solicitud de préstamo enviada exitosamente.");
      setSolicitudes((prev) => prev + 1);
      setMonto("");
      setMotivo("");
      setComentario("");
    } catch (err) {
      setError("No se pudo enviar la solicitud de préstamo.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-2xl"
    >
      {error && <p className="text-[#e63946]">{error}</p>}
      {success && <p className="text-[#52b788]">{success}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Monto del préstamo
        </label>
        <input
          type="text"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Ingresa el monto"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={9}
          className="mt-1 block w-full rounded-2xl px-4 py-2 border border-gray-300 focus:ring-[#4e2d1e]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Motivo del préstamo
        </label>
        <select
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="mt-1 block w-full rounded-2xl px-4 py-2 border border-gray-300 focus:ring-[#4e2d1e]"
        >
          <option value="">Selecciona un motivo</option>
          <option value="Educación">Educación</option>
          <option value="Negocios">Negocios</option>
          <option value="Emergencia médica">Emergencia médica</option>
          <option value="Compra personal">Compra personal</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comentario adicional (opcional)
        </label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Agrega un comentario (opcional)"
          className="mt-1 block w-full rounded-2xl px-4 py-2 border border-gray-300 focus:ring-[#4e2d1e] resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#4e2d1e] text-white py-2 rounded-full hover:bg-[#3f2518] transition duration-300"
      >
        Enviar Solicitud
      </button>
    </form>
  );
};

export default SolicitarPrestamo;
