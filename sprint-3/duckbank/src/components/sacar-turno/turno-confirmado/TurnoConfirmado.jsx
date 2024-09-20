import React from "react";

export default function TurnoConfirmado({
  userData = {},
  appointmentData = {},
  onRestart,
}) {
  return (
    <div className="container mx-auto p-8 mt-10 max-w-2xl bg-white rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">Turno Confirmado</h2>
      <div className="mb-4">
        <p>
          <strong>Nombre:</strong> {userData.nombre || 'No disponible'}
        </p>
        <p>
          <strong>DNI:</strong> {userData.dni || 'No disponible'}
        </p>
        <p>
          <strong>Celular:</strong> {userData.celular || 'No disponible'}
        </p>
        <p>
          <strong>Email:</strong> {userData.mail || 'No disponible'}
        </p>
        <p>
          <strong>Provincia:</strong> {appointmentData.provincia || 'No disponible'}
        </p>
        <p>
          <strong>Dirección:</strong> {appointmentData.direccion || 'No disponible'}
        </p>
        <p>
          <strong>Horario:</strong> {appointmentData.horario || 'No disponible'}
        </p>
      </div>
      <button
        onClick={onRestart}
        className="w-full py-3 px-4 bg-[#4e2d1e] text-white font-semibold rounded-full hover:bg-[#3f2518] transition duration-300"
      >
        Confirmar otro turno
      </button>
    </div>
  );
}
