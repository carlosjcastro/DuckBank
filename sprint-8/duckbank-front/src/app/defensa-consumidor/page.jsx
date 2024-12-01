import React from "react";
import Link from "next/link";

const normativa = [
  {
    titulo: "Ley de Defensa del Consumidor (Ley 24.240)",
    descripcion:
      "Establece tus derechos al contratar servicios financieros y regula las relaciones de consumo.",
  },
  {
    titulo: "Regulaciones del Banco Central (BCRA)",
    descripcion:
      "Normas que supervisan la conducta de las entidades financieras en Argentina.",
  },
];

const canalesReclamo = [
  {
    nombre: "Dirección Nacional de Defensa al Consumidor",
    enlace:
      "https://www.argentina.gob.ar/economia/inclusion-financiera/proteccion-al-consumidor-e-informacion-util",
  },
  {
    nombre: "Banco Central de la República Argentina (BCRA)",
    enlace: "https://www.bcra.gob.ar/",
  },
];

const DefensaAlConsumidor = () => {
  return (
    <div className="container mx-auto p-8 bg-white mt-36 rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Defensa al Consumidor
      </h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tus Derechos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Acceso a información clara y transparente sobre los productos
            financieros.
          </li>
          <li>Protección de datos personales y confidencialidad.</li>
          <li>
            Resolución justa y eficiente de conflictos relacionados con
            servicios bancarios.
          </li>
          <li>
            Derecho a realizar consultas y reclamos a través de múltiples
            canales.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          ¿Cómo realizar un reclamo?
        </h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Contacto inicial con el banco:</strong> Comunícate con
            nuestro Centro de Atención al Cliente.
            <ul className="pl-6">
              <li>Teléfono: 0800-333-3333</li>
              <li>Correo: soporte@duckbank.com.ar</li>
            </ul>
          </li>
          <li>
            <strong>Reclamo interno:</strong> Llena nuestro formulario de
            reclamos. Responderemos en un plazo de 10 días hábiles.
          </li>
          <li>
            <strong>Defensor del Cliente:</strong> Si no estás conforme con la
            respuesta, contacta a nuestro defensor independiente.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Normativa Aplicable</h2>
        <ul className="space-y-4">
          {normativa.map((item, index) => (
            <li key={index}>
              <h3 className="font-bold">{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Canales de Reclamo Externos
        </h2>
        <ul className="space-y-4">
          {canalesReclamo.map((canal, index) => (
            <li key={index}>
              <h3 className="font-bold">{canal.nombre}</h3>
              <Link
                href={canal.enlace}
                target="_blank"
                className="mt-6 text-[#4e2d1e] rounded-full active:scale-[.98] transition duration-300 mx-auto block underline"
              >
                Visitar página
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Información útil</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Prevención de fraudes: Nunca compartas tus datos bancarios con
            desconocidos.
          </li>
          <li>
            Reclamaciones comunes: Ajustes de cargos indebidos, problemas con
            tarjetas, y desconocimiento de operaciones.
          </li>
          <li>Protocolo en caso de pérdida o robo de tarjetas.</li>
        </ul>
      </section>
    </div>
  );
};

export default DefensaAlConsumidor;
