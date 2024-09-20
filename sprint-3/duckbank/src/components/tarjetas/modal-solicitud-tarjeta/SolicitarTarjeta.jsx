import React from 'react';

export default function ModalSolicitud({ isOpen, onClose, onSubmit, formData, onChange }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80">
        <h2 className="text-xl font-bold mb-4">Solicitar Nueva Tarjeta</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={onChange}
              className="border border-gray-300 p-2 rounded-2xl w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Tipo</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={onChange}
              className="border border-gray-300 p-2 rounded-2xl w-full"
              required
            >
              <option value="Black">Black</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-[#4e2d1e] text-white py-2 px-4 rounded-full hover:bg-[#3f2518]">Solicitar</button>
            <button type="button" onClick={onClose} className="bg-[#e63946] text-white py-2 px-4 rounded-full hover:bg-red-600">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
