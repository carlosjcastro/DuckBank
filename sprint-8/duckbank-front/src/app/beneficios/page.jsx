"use client";
import { useState } from "react";
import { FaCheckCircle, FaDollarSign, FaShieldAlt, FaStar } from "react-icons/fa";

export default function BeneficiosDuckBank() {
  const [selectedPlan, setSelectedPlan] = useState("Classic");

  const beneficios = {
    Classic: [
      {
        title: "Banca en Línea",
        description:
          "Accedé a tus cuentas, realizá transferencias y consultá tu saldo de manera rápida y segura desde cualquier dispositivo.",
        icon: <FaCheckCircle className="text-[#4e2d1e]" />,
      },
      {
        title: "Red de Cajeros Automáticos",
        description:
          "Disfrutá de acceso gratuito a más de 5,000 cajeros automáticos a nivel nacional.",
        icon: <FaShieldAlt className="text-[#4e2d1e]" />,
      },
      {
        title: "Consultas Sin Cargo",
        description:
          "Consultá tu saldo y movimientos sin costo alguno en nuestros cajeros y plataformas en línea.",
        icon: <FaDollarSign className="text-[#4e2d1e]" />,
      },
    ],
    Gold: [
      {
        title: "Beneficios de Viaje",
        description:
          "Accedé a descuentos exclusivos en vuelos, hoteles y alquiler de autos con nuestros acuerdos internacionales.",
        icon: <FaStar className="text-[#4e2d1e]" />,
      },
      {
        title: "Seguro de Viaje",
        description:
          "Protegé tu bienestar con un seguro de viaje integral que cubre desde cancelaciones hasta emergencias médicas.",
        icon: <FaShieldAlt className="text-[#4e2d1e]" />,
      },
      {
        title: "Atención Personalizada",
        description:
          "Disfrutá de atención preferencial por teléfono, chat en vivo o correo electrónico, disponible las 24 horas.",
        icon: <FaCheckCircle className="text-[#4e2d1e]" />,
      },
      {
        title: "Red de Cajeros Automáticos Premium",
        description:
          "Accedé a cajeros automáticos exclusivos en todo el mundo sin cargos adicionales.",
        icon: <FaDollarSign className="text-[#4e2d1e]" />,
      },
    ],
    Black: [
      {
        title: "Asesoría Financiera Personalizada",
        description:
          "Recibí orientación sobre inversiones, ahorro e impuestos de expertos financieros dedicados a tu perfil.",
        icon: <FaCheckCircle className="text-[#4e2d1e]" />,
      },
      {
        title: "Acceso VIP a Eventos",
        description:
          "Obtené invitaciones exclusivas a eventos y experiencias privadas en todo el mundo.",
        icon: <FaStar className="text-[#4e2d1e]" />,
      },
      {
        title: "Líneas de Crédito Preferenciales",
        description:
          "Aprovechá tasas de interés preferenciales y límites de crédito más altos en tus préstamos y tarjetas.",
        icon: <FaDollarSign className="text-[#4e2d1e]" />,
      },
      {
        title: "Acceso a Salas VIP",
        description:
          "Accedé a salas VIP en aeropuertos internacionales, con servicios exclusivos durante tus viajes.",
        icon: <FaShieldAlt className="text-[#4e2d1e]" />,
      },
      {
        title: "Cajeros Automáticos y Servicios Premium",
        description:
          "Sin comisiones por retiros en cualquier cajero automático y acceso a servicios premium en nuestras sucursales.",
        icon: <FaCheckCircle className="text-[#4e2d1e]" />,
      },
    ],
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="min-h-screen p-6 mt-36">
      <div className="container mx-auto max-w-7xl bg-white rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Beneficios DuckBank</h1>
        <p className="text-center text-gray-600 mb-10">
          Explorá los beneficios exclusivos que DuckBank tiene para ofrecerte. Descubre las ventajas que puedes aprovechar
          según tu plan de cliente.
        </p>

        <div className="flex justify-center space-x-8 mb-10">
          <button
            onClick={() => handlePlanChange("Classic")}
            className={`${
              selectedPlan === "Classic" ? "bg-[#463f3a] text-white" : "bg-gray-200 text-gray-700"
            } px-6 py-3 rounded-full text-xl font-semibold transition duration-300 hover:bg-[#463f3a] hover:text-[#ffffff]`}
          >
            Classic
          </button>
          <button
            onClick={() => handlePlanChange("Gold")}
            className={`${
              selectedPlan === "Gold" ? "bg-[#f3c677] text-white" : "bg-gray-200 text-gray-700"
            } px-6 py-3 rounded-full text-xl font-semibold transition duration-300 hover:bg-[#f3c677]`}
          >
            Gold
          </button>
          <button
            onClick={() => handlePlanChange("Black")}
            className={`${
              selectedPlan === "Black" ? "bg-black text-white" : "bg-gray-200 text-gray-700"
            } px-6 py-3 rounded-full text-xl font-semibold transition duration-300 hover:bg-gray-800 hover:text-[#ffffff]`}
          >
            Black
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios[selectedPlan].map((beneficio, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl text-indigo-500 mr-4">{beneficio.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800">{beneficio.title}</h3>
              </div>
              <p className="text-gray-600">{beneficio.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">¡Beneficios Exclusivos solo para Vos!</h2>
          <p className="text-lg text-gray-600">
            Los beneficios de DuckBank no terminan aquí. Dependiendo de tu plan, puedes acceder a descuentos en
            restaurantes, promociones exclusivas y mucho más.
          </p>
          <button
            className="mt-6 px-8 py-4 bg-[#4e2d1e] text-white py-2 rounded-full hover:bg-[#3f2518] transition duration-300"
            onClick={() => alert("Más detalles sobre otros beneficios pronto!")}
          >
            Descubre más beneficios
          </button>
        </div>
      </div>
    </div>
  );
}
