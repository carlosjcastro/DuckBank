"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { FaCreditCard, FaUserAlt, FaKey, FaShieldAlt, FaMoneyCheckAlt, FaCoins, FaFileInvoice, FaStore, FaTruck, FaBoxOpen, FaHandshake, FaRegBuilding } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

// Mapeo de nombres de íconos a los componentes de íconos almacenados en el JSON
const iconMap = {
  FaCreditCard: <FaCreditCard className="text-2xl" />,
  FaUserAlt: <FaUserAlt className="text-2xl" />,
  FaKey: <FaKey className="text-2xl" />,
  FaShieldAlt: <FaShieldAlt className="text-2xl" />,
  FaMoneyCheckAlt: <FaMoneyCheckAlt className="text-2xl" />,
  FaCoins: <FaCoins className="text-2xl" />,
  FaFileInvoice: <FaFileInvoice className="text-2xl" />,
  FaBoxOpen: <FaBoxOpen className="text-2xl" />,
  FaTruck: <FaTruck className="text-2xl" />,
  FaHandshake: <FaHandshake className="text-2xl" />,
  FaStore: <FaStore className="text-2xl" />,
  FaRegBuilding: <FaRegBuilding className="text-2xl" />
};

// Se reciben los datos del JSON para mostrar las tarjetas de ayuda
async function fetchAyudaItems() {
  const response = await fetch("/data/ayuda/ayuda.json");
  const data = await response.json();
  return data;
}

export default function Ayuda() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [ayudaItems, setAyudaItems] = useState([]);
  const controls = useAnimation();

  useEffect(() => {
    fetchAyudaItems().then((data) => {
      setAyudaItems(data);
      setLoading(false);
    });
  }, []);

  // Es un filtrado básico al usar el buscador. Filtra las tarjetas de ayuda según lo que escriba el usuario
  const filteredItems = ayudaItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!loading) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
    }
  }, [loading, controls]);

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      {/* Header */}
      <motion.div
        className="text-center mb-6 mt-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold mb-4">Ayuda</h1>
        <p className="text-lg">Encontrá la respuesta a tus dudas</p>
        <motion.input
          type="text"
          placeholder="Buscá por tema o palabra clave"
          className="mt-4 w-full sm:w-1/2 px-4 py-2 rounded-2xl focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </motion.div>

      {/* Se muestran las tarjetas de ayuda recibidas del JSON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <Box key={index} sx={{ width: "100%", padding: 2 }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={80}
                className="rounded-2xl"
                sx={{ animationDuration: '4s' }}
              />
              <Skeleton variant="text" sx={{ animationDuration: '4s' }} />
              <Skeleton variant="text" width="60%" sx={{ animationDuration: '4s' }} />
            </Box>
          ))
        ) : (
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-center p-4 bg-white rounded-2xl duration-300 hover:bg-gray-200 transition duration-300"
                >
                  <Link href={item.link} className="flex items-center w-full">
                    <div className="text-4xl text-[#4e2d1e] mr-4">
                      {iconMap[item.icon]}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No se encontraron resultados para "{searchTerm}".
              </p>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Contacto */}
      <motion.div
        className="mt-10 bg-[#f3c677] p-6 rounded-2xl flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <MdAlternateEmail className="text-4xl mb-4" />
        <p className="text-lg font-semibold mb-4">
          ¿No encontraste lo que buscabas?
        </p>
        <p className="text-base text-gray-700 mb-4">
          Si tenes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros. Nuestro equipo está aquí para ayudarte y responder a todas tus consultas. Simplemente rellená el formulario en la página de contacto y te responderemos a la mayor brevedad posible.
        </p>
        <Link href="/contacto">
          <motion.div
            className="inline-block bg-white text-black px-6 py-3 rounded-2xl text-lg font-semibold hover:bg-gray-200 transition duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Contáctanos
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
