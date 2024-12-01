"use client";
import React from "react";
import { FaExchangeAlt, FaIdCard, FaBuilding, FaClipboardList, FaCreditCard } from "react-icons/fa";
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
    {
      href: "/tarjetas-clientes",
      icon: <FaCreditCard className="text-[#4e2d1e] text-4xl mb-4" />,
      title: "Tus Tarjetas",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {cardData.map((card, index) => (
          <Link key={index} href={card.href}>
            <div className="bg-white p-6 rounded-2xl flex flex-col items-center hover:bg-gray-200">
              {card.icon}
              <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
