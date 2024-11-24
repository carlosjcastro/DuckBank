import React from 'react';
import { motion } from 'framer-motion';

const opcionesProducto = ["Tarjetas", "Cuentas", "Claves", "Seguros", "Préstamos", "Inversiones", "Pago de servicios", "Seguimiento de productos", "Seguridad"];

export default function FormularioContacto({ formValues, manejarCambio, manejarCambioCheckbox, manejarEnvio, errores, successMessage, errorMessage }) {
  const renderInputField = (name, type = 'text', extraProps = {}) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      <input
        type={type}
        name={name}
        value={formValues[name]}
        onChange={manejarCambio}
        className={`mt-1 block w-full rounded-2xl px-4 py-2 border ${errores[name] ? "border-[#e63946]" : "border-gray-300"} focus:ring-[#4e2d1e]`}
        {...extraProps}
      />
      {errores[name] && <p className="text-[#e63946] text-xs mt-1">{errores[name]}</p>}
    </div>
  );

  return (
    <motion.div className="bg-white p-8 rounded-2xl" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <form onSubmit={manejarEnvio} className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Producto</label>
          <select
            name="producto"
            value={formValues.producto}
            onChange={manejarCambio}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-[#4e2d1e]"
          >
            {opcionesProducto.map(opcion => <option key={opcion} value={opcion}>{opcion}</option>)}
          </select>
        </div>
        {['nombre', 'apellido', 'email', 'telefono'].map(field => renderInputField(field, field === 'email' ? 'email' : 'text'))}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Empresa / Organización (Opcional)</label>
          <input
            type="text"
            name="empresa"
            value={formValues.empresa}
            onChange={manejarCambio}
            className="mt-1 block w-full rounded-2xl px-4 py-2 border border-gray-300 focus:ring-[#4e2d1e]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Mensaje</label>
          <textarea
            name="mensaje"
            value={formValues.mensaje}
            onChange={manejarCambio}
            rows={4}
            className={`resize-none mt-1 block w-full rounded-2xl px-4 py-2 border ${errores.mensaje ? "border-[#e63946]" : "border-gray-300"} shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          ></textarea>
          {errores.mensaje && <p className="text-[#e63946] text-xs mt-1">{errores.mensaje}</p>}
        </div>
        <div className="flex items-start">
          <input
            type="checkbox"
            name="privacidad"
            checked={formValues.privacidad}
            onChange={manejarCambioCheckbox}
            className="h-4 w-4 bg-[#463f3a] focus:ring-[#463f3a] border-gray-300 rounded-2xl"
          />
          <label className="ml-2 text-sm text-gray-700 block">
            Acepto la{" "}
            <a href="#" className="text-[#463f3a] underline">política de privacidad</a>
          </label>
          {errores.privacidad && <p className="text-[#e63946] text-xs mt-1 block">{errores.privacidad}</p>}
        </div>
        <div>
          <motion.button
            type="submit"
            className="w-full bg-[#4e2d1e] text-white py-2 rounded-full hover:bg-[#3f2518] transition duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Enviar
          </motion.button>
        </div>
        {successMessage && (
          <motion.div
            className="bg-green-100 text-[#52b788] p-3 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ¡Recibimos tu mensaje! Te responderemos a la brevedad.
          </motion.div>
        )}
        {errorMessage && (
          <motion.div
            className="bg-red-100 text-[#e63946] p-3 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {errorMessage}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
