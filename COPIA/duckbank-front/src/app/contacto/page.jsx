"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import saludo from '../../../public/assets/pages/contacto/saludo.png';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Se cargan los componentes de manera dinámica y manejar el estado de carga
const FormularioContacto = dynamic(() => import('../../components/contacto/formulario/FormularioContacto'), {
  loading: () => <div>Cargando formulario...</div>
});

const TarjetasContacto = dynamic(() => import('../../components/contacto/tarjetas-contacto/TarjetasContacto'), {
  loading: () => <div>Cargando tarjetas de contacto...</div>
});

export default function Contacto() {
  const [errores, setErrores] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tarjetasContacto, setTarjetasContacto] = useState([]);
  const [formValues, setFormValues] = useState({
    producto: "Pedidos", nombre: "", apellido: "", email: "", telefono: "", empresa: "", mensaje: "", privacidad: false
  });

  const manejarCambio = ({ target: { name, value } }) => setFormValues(prev => ({ ...prev, [name]: value }));
  const manejarCambioCheckbox = ({ target: { checked } }) => setFormValues(prev => ({ ...prev, privacidad: checked }));

  const validarFormulario = () => {
    const tempErrores = {};
    let esValido = true;

    if (!formValues.nombre) { tempErrores.nombre = "El nombre es obligatorio"; esValido = false; }
    if (!formValues.apellido) { tempErrores.apellido = "El apellido es obligatorio"; esValido = false; }
    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) { tempErrores.email = "El correo electrónico es inválido"; esValido = false; }
    if (!formValues.telefono || !/^\d{10,15}$/.test(formValues.telefono)) { tempErrores.telefono = "El teléfono debe tener entre 10 y 15 dígitos"; esValido = false; }
    if (!formValues.mensaje || formValues.mensaje.length < 20) { tempErrores.mensaje = "El mensaje debe tener al menos 20 caracteres"; esValido = false; }
    if (!formValues.privacidad) { tempErrores.privacidad = "Debes aceptar la política de privacidad"; esValido = false; }

    setErrores(tempErrores);
    return esValido;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setIsSubmitted(true);
      setErrorMessage("");
      try {
        const response = await fetch('/api/enviarFormulario', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          setSuccessMessage(true);
          setFormValues({
            producto: "Pedidos", nombre: "", apellido: "", email: "", telefono: "", empresa: "", mensaje: "", privacidad: false
          });
        } else {
          throw new Error('Error al enviar el formulario');
        }
      } catch {
        setErrorMessage("Hubo un problema al enviar tu mensaje. Por favor, intentá nuevamente más tarde.");
      } finally {
        setIsSubmitted(false);
      }
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    fetch('/data/contacto/contacto.json')
      .then(response => response.json())
      .then(setTarjetasContacto)
      .catch(error => console.error('Error al obtener los datos de las tarjetas de contacto:', error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 mt-10">
      <motion.h1 className="text-3xl font-bold text-gray-800 mb-6 mt-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contactános
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
        <motion.div className="p-8 text-justify"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">¿Cómo podemos ayudarte?</h2>
          <p className="text-gray-600 mb-4">Si no encontraste lo que buscabas, por favor revisá nuestro{" "}
            <a href="#" className="text-blue-500 underline">centro de documentación</a>.</p>
          <p className="text-gray-600 mb-4">¿Tienes preguntas? Llámanos al{" "}
            <a href="tel:0800-333-3333" className="text-blue-500 underline">0800-333-3333</a>.</p>
          <p className="text-gray-600 mb-4">Puedes visitar nuestro{" "}
            <a href="#" className="text-blue-500 underline">soporte en vivo</a> si necesitas asistencia inmediata.</p>
          <p className="text-gray-600 mb-4">Antes de enviar el formulario, selecciona el producto correcto, introduce tu nombre, número de teléfono y un mensaje detallado para que sea más fácil ayudarte.</p>
          <p className="text-gray-600 mb-4">Nuestros canales de atención funcionan las 24 horas los 7 días de la semana.</p>
          <motion.div className="rounded-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={saludo.src} width={500} height={500} alt="Dibujo de personas saludandose felizmente" className="rounded-full" />
          </motion.div>
        </motion.div>

        <FormularioContacto
          formValues={formValues}
          manejarCambio={manejarCambio}
          manejarCambioCheckbox={manejarCambioCheckbox}
          manejarEnvio={manejarEnvio}
          errores={errores}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      </div>

      <TarjetasContacto tarjetasContacto={tarjetasContacto} />
    </div>
  );
}
