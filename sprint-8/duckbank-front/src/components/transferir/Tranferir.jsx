"use client";
import React from "react";
import { FaExchangeAlt, FaIdCard, FaBuilding, FaClipboardList } from "react-icons/fa";
import Link from "next/link";

export default function Transferir() {
  const cardData = [
    {
      href: "/transferencia",
      icon: <FaExchangeAlt className="text-[#4e2d1e] text-4xl mb-4" />,
      title: "Transferir",
    },
    {
      href: "/tu-informacion",
      icon: <FaIdCard className="text-[#4e2d1e] text-4xl mb-4" />,
      title: "Consultar CBU/Alias",
    },
    {
      href: "/seleccionar-sucursal",
      icon: <FaBuilding className="text-[#4e2d1e] text-4xl mb-4" />,
      title: "Ver Sucursal Asignada",
    },
    {
      href: "/mis-transferencias",
      icon: <FaClipboardList className="text-[#4e2d1e] text-4xl mb-4" />,
      title: "Transferencias Realizadas",
    },
  ];

  return (
    <div className="w-full px-4 md:px-0">
      <div className="flex flex-wrap justify-center md:justify-between gap-6">
        {cardData.map((card, index) => (
          <Link 
            key={index} 
            href={card.href} 
            className="w-full sm:w-[45%] md:w-[22%]">
            <div className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-transform transform hover:shadow-xl min-h-[160px] ease-in-out">
              {card.icon}
              <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
