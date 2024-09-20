"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import persona from "../../../public/assets/pages/sucursales/sucursal.png";
import provincias from "../../../public/data/sucursales/provincias.json";
import coordenadas from "../../../public/data/sucursales/coordenadas.json";
import direcciones from "../../../public/data/sucursales/direcciones.json";
import { motion } from "framer-motion";

const MapaSucursales = dynamic(
  () => import("../../components/mapa-sucursales/MapaSucursal"),
  {
    ssr: false,
    loading: () => (
      <div>
        <p>Cargando mapa de Sucursales DuckBank...</p>
      </div>
    ),
  }
);

export default function Sucursales() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [mapCenter, setMapCenter] = useState([-38.4161, -63.6167]);
  const [mapZoom, setMapZoom] = useState(6);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedProvince(value);
    if (value) {
      setMapCenter(coordenadas[value]);
      setMapZoom(15);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 mt-28">
      <motion.h1
        className="text-3xl font-extrabold text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Nuestras sucursales
      </motion.h1>

      <div className="mb-8 mt-10">
        <motion.select
          onChange={handleSelectChange}
          className="w-full max-w-xs mx-auto p-2 border rounded-full"
          defaultValue=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <option value="" disabled>
            Selecciona una provincia
          </option>
          {provincias.map((provincia) => (
            <option key={provincia.value} value={provincia.value}>
              {provincia.label}
            </option>
          ))}
        </motion.select>
      </div>

      {/* Mapa */}
      <div className="flex flex-col md:flex-row gap-4">
        <motion.div
          className="relative w-full md:w-2/3 h-64 md:h-[500px] z-0 rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <MapaSucursales
            center={mapCenter}
            zoom={mapZoom}
            selectedProvince={selectedProvince}
          />
        </motion.div>
        <motion.div
          className="w-full md:w-1/3 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="p-4 rounded-2xl text-center">
            <h2 className="text-xl font-bold mb-2">
              {selectedProvince
                ? selectedProvince
                : "Buscá tu sucursal más cercana"}
            </h2>
            <p className="text-gray-600 text-sm">
              {selectedProvince
                ? direcciones[selectedProvince]
                : "Seleccioná una provincia del menú para ver la dirección de la sucursal."}
            </p>
          </div>
          <motion.div
            className="mt-10 flex justify-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Image
              src={persona}
              width={350}
              height={350}
              alt="Dibujo de un hombre feliz por encontrar su sucursal cercana"
              className="rounded-full"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Tarjetas de Ayuda, Contacto y Horarios */}
      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <motion.div
          className="bg-[#f3c677] p-6 rounded-2xl flex flex-col items-center"
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-semibold mb-4">Ayuda</h3>
          <p className="text-black text-center mb-4">
            ¿Necesitas ayuda? Contacta con nuestro equipo de soporte para
            resolver cualquier duda o problema que puedas tener.
          </p>
          <Link
            href="/ayuda"
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300"
          >
            Ir al Centro de Ayuda
          </Link>
        </motion.div>
        <motion.div
          className="bg-[#f3c677] p-6 rounded-2xl flex flex-col items-center"
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-semibold mb-4">Contacto</h3>
          <p className="text-black text-center mb-4">
            Ponte en contacto con nosotros para más información. Estamos
            disponibles a través de correo electrónico, teléfono o redes
            sociales.
          </p>
          <Link
            href="/contacto"
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300"
          >
            Contactános
          </Link>
        </motion.div>
        <motion.div
          className="bg-[#f3c677] p-6 rounded-2xl flex flex-col items-center"
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-semibold mb-4">Horarios</h3>
          <p className="text-black text-center mb-4">
            Consulta nuestros horarios de atención. Estamos aquí para ayudarte
            durante los siguientes horarios de apertura.
          </p>
          <p>Lunes a Viernes de 9 A.M. a 6 P.M.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
