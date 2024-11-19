"use client";
import Image from "next/image";
import React from "react";

const Nosotros = () => {
  const historia = [
    "DuckBank fue fundado en 1995 en la ciudad de Córdoba, Argentina, con un objetivo claro: hacer que los servicios bancarios fueran accesibles para todos. Desde nuestros comienzos como un pequeño banco comunitario, hemos trabajado incansablemente para eliminar las barreras financieras que enfrentan las personas y empresas en el país.",
    "Durante los primeros años, nos enfocamos en ofrecer cuentas de ahorro y créditos básicos a los habitantes de nuestra región. Sin embargo, nuestra pasión por la innovación y el servicio al cliente nos llevó rápidamente a ampliar nuestra oferta de servicios y a explorar nuevas tecnologías que simplificaran la experiencia bancaria.",
    "A principios de la década de 2000, fuimos pioneros en la implementación de la banca digital en Argentina, permitiendo que nuestros clientes pudieran realizar transacciones desde la comodidad de sus hogares. Este avance marcó un antes y un después en nuestra historia, consolidándonos como un líder en el sector financiero.",
    "Hoy en día, DuckBank es reconocido no solo por su capacidad de innovación, sino también por su compromiso con la sostenibilidad y el bienestar social. Ofrecemos una amplia gama de productos, incluyendo cuentas virtuales, préstamos personalizados, inversiones seguras y soluciones para pequeñas y medianas empresas.",
    "En DuckBank, nuestra prioridad es brindar un servicio inclusivo, transparente y responsable. Creemos en un futuro donde todos tengan las herramientas necesarias para alcanzar sus metas financieras, y trabajamos día a día para hacerlo realidad.",
  ];

  const valores = [
    {
      titulo: "Innovación",
      descripcion:
        "Siempre estamos a la vanguardia para ofrecerte las mejores herramientas financieras.",
    },
    {
      titulo: "Transparencia",
      descripcion:
        "Nuestra comunicación es clara y honesta, siempre priorizando tu confianza.",
    },
    {
      titulo: "Sostenibilidad",
      descripcion:
        "Trabajamos para reducir nuestro impacto ambiental y promover prácticas responsables.",
    },
  ];

  const equipo = [
    {
      nombre: "Carlos Castro",
      imagen: "/assets/pages/nosotros/CC.jpg",
      linkedin: "https://linkedin.com/in/carlosjcastrog",
      email: "",
    },
    {
      nombre: "Celina Bono",
      imagen: "/images/team2.jpg",
      linkedin: "https://linkedin.com/in/celina-bono",
      email: "",
    },
    {
      nombre: "Ignacio Iannino",
      imagen: "/images/team3.jpg",
      email: "",
    },
  ];

  return (
    <div className="min-h-screen mt-36 m-4 bg-gray-100 text-gray-800 rounded-2xl">
      {/* Hero Section */}
      <section className="bg-[#f3c677] text-[#000000] p-10 text-center rounded-t-2xl">
        <h1 className="text-4xl font-bold">Acerca de DuckBank</h1>
        <p className="mt-4 text-lg">
          Transformamos la manera en que las personas interactúan con sus
          finanzas. DuckBank, un banco para todos.
        </p>
      </section>

      {/* Historia */}
      <section className="p-10 bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          Nuestra Historia
        </h2>
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
          <Image
            src="/assets/pages/nosotros/duckbank.jpeg"
            alt="Imagen de las oficinas de DuckBank"
            className="rounded-2xl"
            loading="lazy"
            width={600}
            height={600}
          />
          <div>
            {historia.map((parrafo, index) => (
              <p key={index} className="text-justify mb-4">
                {parrafo}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="p-10 bg-[#f3c677]">
        <h2 className="text-2xl font-bold text-center mb-6">
          Nuestros Valores
        </h2>
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3 text-center">
          {valores.map((valor, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-[#000000]">
                {valor.titulo}
              </h3>
              <p className="mt-2 text-sm">{valor.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="p-10 bg-white rounded-b-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Nuestro Equipo</h2>
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          {equipo.map((miembro, index) => (
            <div key={index} className="text-center">
              <Image
                src={miembro.imagen}
                alt={`Foto de ${miembro.nombre}`}
                width={600}
                height={600}
                loading="lazy"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h3 className="font-bold">{miembro.nombre}</h3>
              <p className="text-sm text-gray-600">{miembro.puesto}</p>
              <div className="mt-4">
                <a
                  href={miembro.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm block"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${miembro.email}`}
                  className="text-blue-600 hover:underline text-sm block"
                >
                  {miembro.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
