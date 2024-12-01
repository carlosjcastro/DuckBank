import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp, FaRegCommentDots, FaInstagram, FaRegBuilding } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { FaXTwitter } from "react-icons/fa6";
const iconMap = {
  FaWhatsapp: <FaWhatsapp className="text-black w-8 h-8" />,
  FaRegCommentDots: <FaRegCommentDots className="text-black w-8 h-8" />,
  FaInstagram: <FaInstagram className="text-black w-8 h-8" />,
  FaXTwitter: <FaXTwitter className="text-black w-8 h-8" />,
  FiPhone: <FiPhone className="text-black w-8 h-8" />,
  FaRegBuilding: <FaRegBuilding className="text-black w-8 h-8" />
};

export default function TarjetasContacto({ tarjetasContacto }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-10">
      {tarjetasContacto.map((tarjeta, index) => (
        <motion.div
          key={tarjeta.id}
          className="flex flex-col items-start p-6 rounded-2xl"
          style={{ backgroundColor: tarjeta.color, color: 'black' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <div className="mr-4">{iconMap[tarjeta.icono]}</div>
            <div>
              <h3 className="text-xl font-semibold">{tarjeta.titulo}</h3>
              <p className="text-sm">{tarjeta.descripcion}</p>
            </div>
          </div>
          {tarjeta.boton.link ? (
            <Link href={tarjeta.boton.link} className="mt-auto bg-white text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
              {tarjeta.boton.texto}
            </Link>
          ) : (
            <a
              href={tarjeta.boton.url}
              className="mt-auto bg-white text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
              target={tarjeta.boton.url.startsWith("tel:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
            >
              {tarjeta.boton.texto}
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
}
