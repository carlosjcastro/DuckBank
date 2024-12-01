"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import personas from "../../../public/assets/pages/trabaja-con-nosotros/personas.png";

export default function TrabajaConNosotros() {
  const [jobs, setJobs] = useState([]);
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/data/trabaja-con-nosotros/posiciones.json");
        setJobs(response.data);
      } catch (error) {
        console.error("Error al obtener las ofertas de trabajo:", error);
        setError("No se han podido cargar las ofertas de trabajo. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      (selectedArea === "Todas" || job.area === selectedArea) &&
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const areas = [
    "Todas", "IT", "Marketing", "Contable", "Recursos Humanos",
    "Legal", "Atención al Cliente", "Operaciones", "Ventas",
    "Diseño", "Administración"
  ];

  return (
    <>
      <Head>
        <title>Trabajá con Nosotros - DuckBank</title>
        <meta name="description" content="Oportunidades laborales en DuckBank" />
      </Head>
      <div className="bg-gray-100 min-h-screen">
        <header className="text-black py-4 mt-36">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <motion.h1
              className="text-3xl font-extrabold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Trabajá con Nosotros
            </motion.h1>
            <motion.p
              className="text-lg mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Explorá nuestras oportunidades de empleo y únete a nuestro equipo
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              <Image
                src={personas}
                width={600}
                height={600}
                alt="Dibujo de personas trabajando felices y festejando en una oficina"
                className="mt-4"
              />
            </motion.div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-[#4e2d1e] text-white px-4 py-2 rounded-full mb-4"
            >
              {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
            </button>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="flex flex-col mb-4 md:mb-0 w-full md:w-auto">
                <motion.div
                  className="flex items-center mb-4 md:mb-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <label htmlFor="search" className="mr-2 text-lg font-semibold">
                    Buscar:
                  </label>
                  <input
                    id="search"
                    type="text"
                    placeholder="Buscar ofertas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded-full px-4 py-2"
                  />
                </motion.div>

                <motion.div
                  className={`mt-6 flex flex-wrap ${showFilters ? "" : "hidden md:flex"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {areas.map((area, index) => (
                    <motion.button
                      key={area}
                      onClick={() => setSelectedArea(area)}
                      className={`mr-2 mb-2 px-4 py-2 rounded-full ${
                        selectedArea === area
                          ? "bg-[#4e2d1e] text-white transition duration-300"
                          : "bg-white text-black"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {area}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>

            <motion.h2
              className="text-2xl font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Oportunidades Disponibles
            </motion.h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <div className="col-span-full text-center text-gray-600">
                  Cargando ofertas de trabajo...
                </div>
              ) : error ? (
                <div className="col-span-full text-center text-red-600">
                  {error}
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="col-span-full text-center text-gray-600">
                  No se encontraron ofertas de trabajo.
                </div>
              ) : (
                filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    className="bg-white rounded-2xl p-6 hover:bg-gray-200 transition duration-300 relative pt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                      {job.seniority} | {job.location}
                    </div>
                    <Link href={`/trabaja-con-nosotros/${job.slug}`}>
                      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <p className="text-gray-600">{job.area}</p>
                      <p className="mt-2 text-gray-800">{job.description}</p>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          <motion.section
            className="bg-[#f3c677] py-8 px-4 rounded-2xl justify-center text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-semibold mb-4">¿No ves el trabajo de tus sueños?</h2>
            <p className="mb-4">
              Dejá tu información de contacto y currículum, y nos pondremos en
              contacto si encontramos el ajuste perfecto.
            </p>
            <a
              href="mailto:jobs@duckbank.com.ar"
              className="bg-white text-gray-800 px-6 py-3 rounded-full inline-block hover:bg-gray-200 transition duration-300"
            >
              Presentáte
            </a>
          </motion.section>
        </main>
      </div>
    </>
  );
}
