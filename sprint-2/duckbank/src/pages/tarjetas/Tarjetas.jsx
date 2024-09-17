import { useState } from "react";
import { FaPlusCircle, FaEllipsisV } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const provincias = [
  "Buenos Aires",
  "Ciudad Autónoma de Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "CABA",
  "Corrientes",
  "Córdoba",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

const Tarjetas = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);

  const tarjetasDebito = [
    {
      tipo: "Duck VISA",
      numero: "**** **** **** 1234",
      movimientos: 31466.5,
      saldoPesos: 31466.5,
      saldoDolares: 7.66,
      limites: { compra: 350000, extraccion: 70000 },
      color: "bg-[#463f3a]",
    },
  ];

  const tarjetasCredito = [
    {
      tipo: "Platinum VISA",
      numero: "**** **** **** 5678",
      movimientos: 129866.7,
      saldoPesos: 126466.3,
      saldoDolares: 150.2,
      limites: { compra: 500000, extraccion: 100000 },
      color: "bg-[#6c757d]",
    },
    {
      tipo: "Black VISA",
      numero: "**** **** **** 9012",
      movimientos: 250000.0,
      saldoPesos: 250000.0,
      saldoDolares: 500.75,
      limites: { compra: 1000000, extraccion: 200000 },
      color: "bg-black text-white",
    },
  ];

  const openModal = (type) => {
    setModalType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalType("");
    setSelectedCard(null);
    setDeleteModalIsOpen(false);
  };

  const openDeleteModal = (card) => {
    setSelectedCard(card);
    setDeleteModalIsOpen(true);
  };

  const handleDeleteCard = () => {
    setSolicitudes((prevSolicitudes) =>
      prevSolicitudes.filter((solicitud) => solicitud !== selectedCard)
    );
    closeModal();
  };

  const handleSubmitRequest = (event) => {
    event.preventDefault();
    setSolicitudes([...solicitudes, { tipo: modalType, status: "En curso" }]);
    closeModal();
  };

  return (
    <div className="p-6 min-h-full z-0">
      <header className="text-center p-6 sm:p-10 bg-[#463f3a] rounded-2xl mt-10 sm:mt-20">
        <img
          className="w-24 h-16 sm:w-30 sm:h-20 mx-auto"
          src="/src/assets/pages/tarjetas/card.svg"
          alt="Tarjetas Ícono"
        />
        <h1 className="text-3xl sm:text-6xl text-[#ffffff] font-bold mt-4">
          Tus Tarjetas
        </h1>
        <p className="text-lg sm:text-base text-[#ffffff] mt-4">
          Gestioná de forma rápida y segura tus tarjetas.
        </p>
      </header>

      {/* Tarjetas de Débito */}
      <section className="z-0">
        <h2 className="text-2xl font-bold mb-8 mt-8 z-0">Tarjetas de Débito</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-0">
          {tarjetasDebito.map((tarjeta, index) => (
            <div
              key={index}
              className={`z-0 rounded-2xl p-6 shadow-lg text-white relative ${tarjeta.color}`}
              style={{ minHeight: "220px" }}
            >
              <div className="flex justify-between items-center z-0">
                <img
                  className="h-10"
                  src="/src/assets/icons/LogoDuckBank2.png"
                  alt=""
                />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{tarjeta.tipo}</h3>
                  <button
                    className="text-white"
                    onClick={() => openDeleteModal(tarjeta)}
                  >
                    <FaEllipsisV />
                  </button>
                </div>
              </div>
              <p className="text-2xl mt-4 tracking-widest">{tarjeta.numero}</p>
              <div className="mt-6 mb-4">
                <p>
                  Movimientos: ${tarjeta.movimientos.toLocaleString("es-AR")}
                </p>
                <p>
                  Saldo pesos: ${tarjeta.saldoPesos.toLocaleString("es-AR")}
                </p>
                <p>Saldo USD: U$D{tarjeta.saldoDolares.toFixed(2)}</p>
              </div>
              <p className="absolute bottom-4 left-6">
                Límites: ${tarjeta.limites.compra.toLocaleString("es-AR")} ·
                Extracción: $
                {tarjeta.limites.extraccion.toLocaleString("es-AR")}
              </p>
            </div>
          ))}

          {/* Botón para solicitar nueva tarjeta Débito */}
          <div
            className="rounded-2xl p-6 shadow-lg text-[#adb5bd] relative bg-[#e9ecef] flex flex-col justify-center items-center"
            style={{ minHeight: "220px" }}
          >
            <FaPlusCircle size={32} />
            <button
              className="text-lg font-semibold mt-4"
              onClick={() => openModal("Débito")}
            >
              Solicitar nueva tarjeta
            </button>
          </div>
        </div>
      </section>

      {/* Tarjetas de Crédito */}
      <section>
        <h2 className="text-2xl font-bold mb-8 mt-8">Tarjetas de Crédito</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tarjetasCredito.map((tarjeta, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 shadow-lg text-white relative ${tarjeta.color}`}
              style={{ minHeight: "220px" }}
            >
              <div className="flex justify-between items-center">
                <img
                  className="h-10"
                  src="/src/assets/icons/LogoDuckBank2.png"
                  alt=""
                />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{tarjeta.tipo}</h3>
                  <button
                    className="text-white"
                    onClick={() => openDeleteModal(tarjeta)}
                  >
                    <FaEllipsisV />
                  </button>
                </div>
              </div>
              <p className="text-2xl mt-4 mb-4 tracking-widest">
                {tarjeta.numero}
              </p>
              <div className="mt-6 mb-4">
                <p>
                  Movimientos: ${tarjeta.movimientos.toLocaleString("es-AR")}
                </p>
                <p>
                  Saldo pesos: ${tarjeta.saldoPesos.toLocaleString("es-AR")}
                </p>
                <p>Saldo USD: U$D{tarjeta.saldoDolares.toFixed(2)}</p>
              </div>
              <p className="absolute bottom-4 mt-4 left-6">
                Límites: ${tarjeta.limites.compra.toLocaleString("es-AR")} ·
                Extracción: $
                {tarjeta.limites.extraccion.toLocaleString("es-AR")}
              </p>
            </div>
          ))}

          {/* Botón para solicitar nueva tarjeta Crédito*/}
          <div
            className="rounded-2xl p-6 shadow-lg text-[#adb5bd] relative bg-[#e9ecef] flex flex-col justify-center items-center"
            style={{ minHeight: "220px" }}
          >
            <FaPlusCircle size={32} />
            <button
              className="text-lg font-semibold mt-4"
              onClick={() => openModal("Crédito")}
            >
              Solicitar nueva tarjeta
            </button>
          </div>
        </div>
      </section>

      {/* Solicitudes en curso */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-8">Solicitudes en Curso</h2>
        {solicitudes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solicitudes.map((solicitud, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 shadow-lg text-white relative bg-[#adb5bd]"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Solicitud de Tarjeta de {solicitud.tipo}
                </h3>
                <MdAccessTime size={25} />{" "}
                <p className="text-xl">Estado: {solicitud.status}</p>
                <p>Revisá nuevamente más tarde.</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No hay solicitudes en curso.</p>
        )}
      </section>

      {/* Modal para nueva tarjeta */}
      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">
              Solicitar nueva tarjeta {modalType}
            </h2>
            <form onSubmit={handleSubmitRequest}>
              <label className="block mb-2">Seleccioná tu provincia:</label>
              <select required className="w-full mb-4 p-2 border rounded-2xl">
                <option value="" disabled selected>
                  Seleccioná tu provincia
                </option>
                {provincias.map((provincia, index) => (
                  <option key={index} value={provincia}>
                    {provincia}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="text-white px-4 py-2 rounded-full bg-[#4e2d1e] hover:bg-[#3f2518]"
              >
                Solicitar tarjeta
              </button>
            </form>
            <button
              className="mt-4 px-4 py-2 rounded-full bg-[#f4f4f4] hover:bg-[#e4e4e4]"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para eliminar tarjeta */}
      {deleteModalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Eliminar tarjeta</h2>
            <p className="mb-4">
              ¿Estás seguro de que querés eliminar esta tarjeta?
            </p>
            <button
              className="text-white px-4 py-2 rounded-full mr-2 bg-[#e63946] hover:bg-[#d13440]"
              onClick={handleDeleteCard}
            >
              Eliminar
            </button>
            <button
              className="px-4 py-2 rounded-full bg-[#f4f4f4] hover:bg-[#e4e4e4]"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tarjetas;
