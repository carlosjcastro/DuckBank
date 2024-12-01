'use client';
import { useState } from "react";

export default function Simulador() {
  const [form, setForm] = useState({
    monto: "",
    plazo: "",
    tasa: 75,
  });
  const [errors, setErrors] = useState({});
  const [resultado, setResultado] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Se valida que el monto sea un número mayor a 0
    if (!form.monto.trim()) {
      newErrors.monto = "El monto es obligatorio.";
    } else if (isNaN(Number(form.monto.replace(/\./g, ""))) || Number(form.monto.replace(/\./g, "")) <= 0) {
      newErrors.monto = "Debe ingresar un monto válido mayor a 0.";
    }

    // Se valida que el plazo no esté vacío
    if (!form.plazo.trim()) {
      newErrors.plazo = "Debe seleccionar un plazo.";
    }

    return newErrors;
  };

    //   Esto permite que el usuario pueda ingresar un monto con puntos y que se formatee correctamente
  const handleMontoChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, "");
    if (!isNaN(Number(rawValue))) {
      const formattedValue = Number(rawValue).toLocaleString("es-AR").replace(/,/g, ".");
      setForm({ ...form, monto: formattedValue });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setResultado(null);
    } else {
      setErrors({});
      calcularInversion();
    }
  };

  const calcularInversion = () => {
    const montoInicial = Number(form.monto.replace(/\./g, ""));
    const plazoDias = Number(form.plazo);
    const tasaEfectivaDiaria = form.tasa / 365 / 100;
    const montoFinal = montoInicial * Math.pow(1 + tasaEfectivaDiaria, plazoDias);

    setResultado({
      montoInicial,
      montoFinal: montoFinal.toFixed(2),
      intereses: (montoFinal - montoInicial).toFixed(2),
    });
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">Simulador de Inversiones</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Monto */}
        <div>
          <label htmlFor="monto" className="block text-sm font-medium text-gray-700">
            Monto a invertir (ARS)
          </label>
          <input
            type="text"
            id="monto"
            name="monto"
            value={form.monto}
            onChange={handleMontoChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.monto ? "border-red-500" : "border-gray-300"
            } mt-1 block w-full rounded-2xl px-4 py-2 border border-gray-300 focus:ring-[#4e2d1e]`}
            placeholder="Ej: 600.000"
          />
          {errors.monto && <span className="text-red-500 text-sm">{errors.monto}</span>}
        </div>

        {/* Plazo */}
        <div>
          <label htmlFor="plazo" className="block text-sm font-medium text-gray-700">
            Plazo (días)
          </label>
          <select
            id="plazo"
            name="plazo"
            value={form.plazo}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.plazo ? "border-red-500" : "border-gray-300"
            } mt-1 block w-full rounded-2xl px-4 py-2 border border-gray-300 focus:ring-[#4e2d1e]`}
          >
            <option value="" disabled>
              Seleccione un plazo
            </option>
            <option value="30">30 días</option>
            <option value="60">60 días</option>
            <option value="90">90 días</option>
            <option value="365">365 días</option>
          </select>
          {errors.plazo && <span className="text-red-500 text-sm">{errors.plazo}</span>}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-[#4e2d1e] text-white py-2 rounded-full hover:bg-[#3f2518] transition duration-300"
        >
          Calcular Inversión
        </button>
      </form>

      {/* Resultado */}
      {resultado && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold text-lg">Resultado</h3>
          <p>Monto inicial: ${resultado.montoInicial.toLocaleString("es-AR")}</p>
          <p>Intereses generados: ${resultado.intereses.toLocaleString("es-AR")}</p>
          <p>Monto final: ${resultado.montoFinal.toLocaleString("es-AR")}</p>
        </div>
      )}
    </div>
  );
}
