import React from "react";

export default function ModalCancelarSolicitud({ isOpen, onClose, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80">
        <h2 className="text-xl font-bold mb-4">Cancelar Solicitud</h2>
        <p>¿Estás seguro de que deseas cancelar esta solicitud?</p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onCancel}
            className="bg-[#e63946] text-white py-2 px-4 rounded-full hover:bg-red-600"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
