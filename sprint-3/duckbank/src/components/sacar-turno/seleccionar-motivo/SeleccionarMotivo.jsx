import { useState } from "react";

export default function SelectMotivo({ onNext }) {
  const [motivo, setMotivo] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setMotivo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (motivo) {
      onNext();
    } else {
      setError("Por favor, seleccioná un motivo.");
    }
  };

  return (
    <div className="relative container mx-auto p-8 mt-10 max-w-2xl bg-white rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">Motivo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <select
            value={motivo}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-1 ${
              error ? "border-red-500" : "border-gray-300"
            } focus:ring-[#4e2d1e]`}
          >
            <option value="" disabled>
              Seleccionar motivo
            </option>
            <option value="Claves">Claves</option>
            <option value="Tarjetas de crédito">Tarjetas de crédito</option>
            <option value="Tarjetas de débito">Tarjetas de débito</option>
            <option value="Cuentas">Cuentas</option>
            <option value="Préstamos">Préstamos</option>
            <option value="Seguros">Seguros</option>
            <option value="Inversiones">Inversiones</option>
            <option value="Estafas">Estafas</option>
            <option value="Retirar mi tarjeta cuenta sueldo">
              Retirar mi tarjeta cuenta sueldo
            </option>
            <option value="Otras consultas">Otras consultas</option>
          </select>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#4e2d1e] text-white font-semibold rounded-full hover:bg-[#3f2518] transition duration-300"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
}
