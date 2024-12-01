"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { FaBriefcase, FaMapMarkerAlt, FaStar } from "react-icons/fa";

export default function JobDetails() {
  const [job, setJob] = useState(null);
  const [id, setId] = useState("");

  useEffect(() => {
    // Se extrae el ID del JSON para obtener toda la información de la oferta de trabajo
    const path = window.location.pathname;
    const pathParts = path.split("/");
    const jobId = pathParts[pathParts.length - 1];
    setId(jobId);

    if (jobId) {
      axios
        .get("/data/trabaja-con-nosotros/posiciones.json")
        .then((response) => {
          const jobData = response.data.find((job) => job.id === jobId);
          setJob(jobData);
        })
        .catch((error) =>
          console.error("Error al obtener las ofertas de trabajo...:", error)
        );
    }
  }, []);

  if (!job) return <p className="text-center py-4">Cargando...</p>;

  return (
    <>
      <Head>
        <title>{job.title} - DuckBank</title>
        <meta
          name="description"
          content={`Detalles sobre la oferta de trabajo: ${job.title}`}
        />
      </Head>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-600 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Detalles de la Oferta</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sección principal de los detalles del trabajo */}
          <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
            <div className="flex items-center mb-2 text-gray-600">
              <FaBriefcase className="mr-2" />
              <p>Área: {job.area}</p>
            </div>
            <div className="flex items-center mb-2 text-gray-600">
              <FaStar className="mr-2" />
              <p>Seniority: {job.seniority}</p>
            </div>
            <div className="flex items-center mb-2 text-gray-600">
              <FaMapMarkerAlt className="mr-2" />
              <p>Ubicación: {job.location}</p>
            </div>
            <p className="text-gray-800 mb-4">{job.description}</p>

            {/* Calificaciones Requeridas */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Calificaciones Requeridas:
              </h3>
              <ul className="list-disc ml-5 text-gray-700">
                {job.qualifications &&
                  job.qualifications.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))}
              </ul>
            </div>

            {/* Habilidades Requeridas */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Habilidades Requeridas:
              </h3>
              <ul className="list-disc ml-5 text-gray-700">
                {job.skills &&
                  job.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
              </ul>
            </div>

            <a
              href={job.applyLink}
              className="bg-[#4e2d1e] text-white px-6 py-3 rounded-full inline-block hover:bg-[#3f2518] transition duration-300"
            >
              Aplicar
            </a>
          </div>

          {/* Barra lateral con información adicional de DuckBank*/}
          <aside className="bg-white rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">
              ¿Por qué trabajar con nosotros?
            </h3>
            <p className="text-gray-700 mb-4">
              En DuckBank, te ofrecemos la oportunidad de enfrentar desafíos
              emocionantes y participar en tareas significativas que realmente
              hacen una diferencia. Valoramos la innovación y el impacto
              positivo, y buscamos personas apasionadas que deseen contribuir a
              proyectos que transforman el futuro. Únete a nuestro equipo y sé
              parte de una empresa que no solo se preocupa por el éxito, sino
              también por crear un impacto positivo en la comunidad y en el
              mundo. ¡Juntos, podemos construir un futuro mejor y más
              prometedor!
            </p>

            <h3 className="text-xl font-semibold mb-4">Sobre Nosotros</h3>
            <p className="text-gray-700">
              En DuckBank, estamos comprometidos con la creación de una cultura
              inclusiva que promueva la diversidad y la igualdad. Creemos
              firmemente en construir un entorno donde cada voz sea escuchada y
              respetada, y donde el libre intercambio de ideas pueda florecer.
              Nos esforzamos por ser un lugar donde cada miembro del equipo
              pueda expresar sus opiniones con libertad y confianza,
              contribuyendo a un ambiente de trabajo enriquecedor y
              colaborativo. Valoramos la autenticidad y el respeto mutuo, y
              estamos dedicados a asegurar que todos se sientan bienvenidos y
              valorados. Únete a nosotros y forma parte de un equipo que se
              preocupa por el crecimiento personal y profesional de cada uno de
              sus integrantes.
            </p>
          </aside>
        </main>
      </div>
    </>
  );
}
