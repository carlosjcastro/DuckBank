import { useState } from 'react';

export default function FormularioTurno({ onNext }) {
  const [form, setForm] = useState({
    nombre: '',
    dni: '',
    celular: '',
    mail: '',
  });
  const [errors, setErrors] = useState({});

  const formatDNI = (value) => {
    const cleaned = value.replace(/\D/g, '');

    // Formatea el valor con puntos tipo 00.000.000
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && (i === 2 || i === 5)) {
        formatted += '.';
      }
      formatted += cleaned[i];
    }

    return formatted;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'dni' ? formatDNI(value) : value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validación de Nombre y Apellido
    if (!form.nombre.trim()) {
      newErrors.nombre = 'Este campo es obligatorio.';
    } else if (form.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre y apellido deben tener al menos 3 caracteres.';
    }

    // Validación de DNI formato Argentino
    const dniPattern = /^\d{2}\.\d{3}\.\d{3}$/;
    if (!form.dni.trim()) {
      newErrors.dni = 'Este campo es obligatorio.';
    } else if (!dniPattern.test(form.dni)) {
      newErrors.dni = 'El formato del DNI debe ser: 00.000.000.';
    }

    // Validación de Celular
    const celularPattern = /^\d{10}$/;
    if (!form.celular.trim()) {
      newErrors.celular = 'Este campo es obligatorio.';
    } else if (!celularPattern.test(form.celular)) {
      newErrors.celular = 'El número de celular debe tener 10 dígitos sin 0 y sin 15.';
    }

    // Validación de Correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.mail.trim()) {
      newErrors.mail = 'Este campo es obligatorio.';
    } else if (!emailPattern.test(form.mail)) {
      newErrors.mail = 'El correo electrónico no es válido.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
  
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({});
      onNext(form);
    }
  };

  return (
    <div className="container mx-auto p-8 mt-10 max-w-2xl bg-white rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">Completá estos datos para que te ayudemos</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre y Apellido</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-1 ${errors.nombre ? 'border-red-500' : 'border-gray-300'} focus:ring-[#4e2d1e]`}
          />
          {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700">Nº de DNI</label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={form.dni}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-1 ${errors.dni ? 'border-red-500' : 'border-gray-300'} focus:ring-[#4e2d1e]`}
            placeholder="00.000.000"
          />
          {errors.dni && <span className="text-red-500 text-sm">{errors.dni}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="celular" className="block text-sm font-medium text-gray-700">Nº de celular (sin 0 y sin 15)</label>
          <input
            type="text"
            id="celular"
            name="celular"
            value={form.celular}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-1 ${errors.celular ? 'border-red-500' : 'border-gray-300'} focus:ring-[#4e2d1e]`}
            placeholder="1234567890"
          />
          {errors.celular && <span className="text-red-500 text-sm">{errors.celular}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="mail" className="block text-sm font-medium text-gray-700">Mail</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={form.mail}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-1 ${errors.mail ? 'border-red-500' : 'border-gray-300'} focus:ring-[#4e2d1e]`}
          />
          {errors.mail && <span className="text-red-500 text-sm">{errors.mail}</span>}
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-[#4e2d1e] text-white font-semibold rounded-full hover:bg-[#3f2518] transition duration-300">
          Siguiente
        </button>
      </form>
    </div>
  );
}
