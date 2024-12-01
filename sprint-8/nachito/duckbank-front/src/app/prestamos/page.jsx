'use client'
import React from "react";
import SolicitarPrestamo from "../../components/solicitar-prestamo/SolicitarPrestamo";

export default function Prestamos() {
  return (
    <div className="p-6 mt-36 max-w-3xl mx-auto bg-gray-100 rounded">
      <h1 className="text-3xl font-extrabold text-center mb-6">Solicitar Préstamo</h1>
      <SolicitarPrestamo />
    </div>
  );
}
