"use client";
import { useState } from "react";

export default function Seguros() {
  const [selectedOption, setSelectedOption] = useState(null);

  const segurosOptions = [
    {
      title: "Seguro de Vida",
      description:
        "Protegé a tus seres queridos ante cualquier eventualidad con planes flexibles y adaptados a tus necesidades.",
      benefits: [
        "Cobertura por fallecimiento",
        "Adicionales para enfermedades graves",
        "Descuentos en check-ups médicos",
      ],
    },
    {
      title: "Seguro de Auto",
      description:
        "Condicí con tranquilidad con nuestras coberturas completas, desde daños a terceros hasta daños totales.",
      benefits: [
        "Cobertura por accidentes y robos",
        "Asistencia vial 24/7",
        "Auto sustituto disponible",
      ],
    },
    {
      title: "Seguro de Hogar",
      description:
        "Protegé tu patrimonio contra incendios, robos y desastres naturales con nuestras pólizas personalizadas.",
      benefits: [
        "Cobertura contra desastres naturales",
        "Asistencia en reparaciones urgentes",
        "Protección para bienes personales",
      ],
    },
    {
      title: "Seguro de Salud",
      description:
        "Cuidá tu bienestar y el de tu familia con seguros médicos integrales y accesibles.",
      benefits: [
        "Consultas médicas ilimitadas",
        "Hospitalización cubierta",
        "Red amplia de especialistas",
      ],
    },
    {
      title: "Seguro para Mascotas",
      description:
        "Asegurá la salud de tus fieles compañeros con planes que cubren emergencias y atención regular.",
      benefits: [
        "Cobertura por enfermedades y accidentes",
        "Vacunas anuales incluidas",
        "Consultas veterinarias sin costo",
      ],
    },
    {
      title: "Seguro de Viajes",
      description:
        "Viajá sin preocupaciones con cobertura médica, cancelaciones y asistencia en todo el mundo.",
      benefits: [
        "Asistencia médica internacional",
        "Cobertura por pérdida de equipaje",
        "Cancelaciones imprevistas",
      ],
    },
    {
      title: "Seguro de Educación",
      description:
        "Asegurá el futuro académico de tus hijos con planes de respaldo financiero.",
      benefits: [
        "Planes para primaria a universidad",
        "Ahorro programado",
        "Beneficios fiscales",
      ],
    },
    {
      title: "Seguro de Jubilación",
      description:
        "Planeá tu retiro con tranquilidad con opciones de ahorro a largo plazo.",
      benefits: [
        "Rendimientos asegurados",
        "Retiro flexible",
        "Cobertura por invalidez",
      ],
    },
    {
      title: "Seguro de PyMEs",
      description:
        "Protegé tu negocio contra riesgos y eventos inesperados con planes diseñados para emprendedores.",
      benefits: [
        "Cobertura por daños a instalaciones",
        "Seguros para empleados",
        "Asesoría empresarial",
      ],
    },
    {
      title: "Seguro de Inversiones",
      description:
        "Maximizá tu capital con seguros que combinan protección y altos rendimientos.",
      benefits: [
        "Rendimientos garantizados",
        "Cobertura por pérdidas",
        "Ahorro fiscal",
      ],
    },
  ];

  const handleOptionClick = (index) => {
    setSelectedOption(index === selectedOption ? null : index);
  };

  return (
    <div className="min-h-screen mt-32 bg-gray-100 p-4">
      <div className="container mx-auto max-w-7xl bg-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Seguros DuckBank
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Encontrá el plan de seguros que mejor se adapte a tu estilo de vida y
          necesidades. DuckBank te protege en todo momento.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {segurosOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`cursor-pointer p-8 border rounded-2xl transition transform ${
                selectedOption === index
                  ? "bg-[#f3c677] bg-opacity-50 border-[#4e2d1e]"
                  : "bg-white border-gray-200"
              } hover:bg-[#f3c677] bg-opacity-50 duration-300`}
            >
              <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{option.description}</p>
              {selectedOption === index && (
                <ul className="mt-4 space-y-2 text-gray-800 text-sm">
                  {option.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-2xl mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
