"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const SolicitarPrestamo = () => {
  const [monto, setMonto] = useState("");
  const [motivo, setMotivo] = useState("");
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [solicitudes, setSolicitudes] = useState(0);
  const [prestamoDetails, setPrestamoDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (solicitudes >= 3) {
      setError("Solo puedes realizar hasta 3 solicitudes de préstamo.");
      return;
    }

    if (!monto || !motivo) {
      setError("Por favor ingrese monto y motivo.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/solicitar-prestamo/`,
        {
          monto,
          motivo,
          comentario,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPrestamoDetails(response.data);

      setMonto("");
      setMotivo("");
      setComentario("");
      setSolicitudes(solicitudes + 1);
      setSuccess("Solicitud enviada exitosamente");

    } catch (error) {
      setError("Solicitud rechazada: " + error.response?.data?.detail || "Error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl">
        {error && <p className="text-[#e63946] text-center">{error}</p>}
        {success && <p className="text-[#52b788] text-center">{success}</p>}

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

      {prestamoDetails && (
        <div className="mt-8 p-6 rounded-2xl bg-white">
          <h3 className="text-lg font-semibold mb-4 text-[#4e2d1e]">Detalles de tu solicitud de préstamo</h3>
          <p><strong>Monto:</strong> ${prestamoDetails.monto}</p>
          <p><strong>Motivo:</strong> {prestamoDetails.motivo}</p>
          <p><strong>Comentario:</strong> {prestamoDetails.comentario || "Ninguno"}</p>
          <p><strong>Estado:</strong> {prestamoDetails.status === "aprobado" ? "Aprobado" : "Rechazado"}</p>
          {/* <p><strong>Fecha de solicitud:</strong> {new Date(prestamoDetails.fecha_solicitud).toLocaleString()}</p> */}
        </div>
      )}
      <div className="mt-4">
        <p className="block">Revisá tus solicitudes en <Link href="/mis-prestamos" className="font-bold">Mis Préstamos</Link></p>
      </div>
    </div>
  );
};

export default SolicitarPrestamo;
