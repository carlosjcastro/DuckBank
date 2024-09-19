"use client";
import { useState, useEffect, Suspense, lazy } from "react";
import { tarjetas } from "../../../public/data/tarjetas/tarjetas";
import { FaRegClock } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { BsThreeDots } from 'react-icons/bs';

// Carga dinámica de componentes
const Tarjeta = lazy(() => import('../../components/tarjetas/tarjeta/Tarjeta'));
const ModalSolicitud = lazy(() => import('../../components/tarjetas/modal-solicitud-tarjeta/SolicitarTarjeta'));
const ModalCancelarSolicitud = lazy(() => import('../../components/tarjetas/modal-cancelar-solicitud/CancelarSolicitud'));

export default function Tarjetas() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", tipo: "Black", fecha: "" });
  const [solicitudes, setSolicitudes] = useState([]);
  const [tarjetasGeneradas, setTarjetasGeneradas] = useState(tarjetas);
  const [solicitudToCancel, setSolicitudToCancel] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    setSolicitudes(JSON.parse(localStorage.getItem("solicitudes")) || []);
  }, []);

  useEffect(() => {
    setMensaje(solicitudes.length >= 3 ? 
      "Has alcanzado el límite de solicitudes. Espera que sean aceptadas o cancela una para crear otra." : 
      ""
    );
  }, [solicitudes]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSolicitudes(prev =>
        prev.map(s => s.estado === "En curso" && Date.now() - new Date(s.fechaHora).getTime() > 5000 
          ? { ...s, estado: "Aceptada" } : s
        )
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleOpenModal = () => solicitudes.length < 3 && setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenCancelModal = (solicitud) => {
    setSolicitudToCancel(solicitud);
    setIsCancelModalOpen(true);
  };
  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
    setSolicitudToCancel(null);
  };

  const handleChange = ({ target: { name, value } }) => setFormData(prev => ({ ...prev, [name]: value }));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newSolicitud = { id: uuidv4(), ...formData, fechaHora: new Date().toLocaleString(), estado: "En curso" };
    const updatedSolicitudes = [...solicitudes, newSolicitud];
    localStorage.setItem("solicitudes", JSON.stringify(updatedSolicitudes));
    setSolicitudes(updatedSolicitudes);
    setFormData({ nombre: "", tipo: "Black", fecha: "" });
    handleCloseModal();
  };

  const handleCancelSolicitud = () => {
    const updatedSolicitudes = solicitudes.filter(s => s.id !== solicitudToCancel.id);
    localStorage.setItem("solicitudes", JSON.stringify(updatedSolicitudes));
    setSolicitudes(updatedSolicitudes);
    handleCloseCancelModal();
  };

  const handleAcceptSolicitud = (id) => {
    const updatedSolicitudes = solicitudes.map(s => s.id === id ? { ...s, estado: "Aceptada" } : s);
    setSolicitudes(updatedSolicitudes);

    const newCard = { id: uuidv4(), type: "Gold", issuer: "DuckBank", number: `**** **** **** ${Math.floor(Math.random() * 10000)}`, 
      fechaInicio: new Date().toLocaleDateString(), fechaVencimiento: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toLocaleDateString(),
      name: "Nueva Tarjeta", color: "#d4af37"
    };
    setTarjetasGeneradas([...tarjetasGeneradas, newCard]);
  };

  const handleDeleteCard = (id) => {
    setSolicitudes(prev => {
      const updatedSolicitudes = prev.filter(s => s.id !== id);
      localStorage.setItem("solicitudes", JSON.stringify(updatedSolicitudes));
      return updatedSolicitudes;
    });

    setTarjetasGeneradas(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="p-6 mt-10">
      <h1 className="text-4xl text-white font-bold mb-4 text-center mt-10 p-20 bg-[#463f3a] rounded-2xl">
        Tus Tarjetas de Crédito
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-20">
        <Suspense fallback={<div>Cargando tarjetas...</div>}>
          {tarjetasGeneradas.map(tarjeta => (
            <Tarjeta 
              key={tarjeta.id}
              tarjeta={tarjeta}
              onDelete={handleDeleteCard}
              onMenuToggle={setMenuOpen}
              menuOpen={menuOpen}
              onClick={() => setMenuOpen(menuOpen === tarjeta.id ? null : tarjeta.id)}
            />
          ))}
        </Suspense>
        <div className="relative rounded-2xl p-4 bg-[#f9f9f9] flex items-center justify-center hover:bg-gray-200">
          <button onClick={handleOpenModal} disabled={solicitudes.length >= 3} className={`flex flex-col items-center ${solicitudes.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}`}>
            <span className="text-5xl font-bold text-gray-500">+</span>
            <span className="text-lg font-semibold text-gray-700">Solicitar nueva tarjeta</span>
          </button>
        </div>
      </div>

      <Suspense fallback={<div>Cargando modales...</div>}>
        <ModalSolicitud 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}
        />
        
        <ModalCancelarSolicitud 
          isOpen={isCancelModalOpen}
          onClose={handleCloseCancelModal}
          onCancel={handleCancelSolicitud}
        />
      </Suspense>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Solicitudes en Curso</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {solicitudes.length > 0 ? (
            solicitudes.map(s => (
              <div key={s.id} className="bg-[#f9f9f9] p-4 rounded-2xl flex flex-col justify-between">
                <div>
                  <p><strong>Nombre:</strong> {s.nombre}</p>
                  <p><strong>Categoría:</strong> {s.tipo}</p>
                  <p><strong>Solicitado:</strong> {s.fechaHora}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <FaRegClock className="text-green-600 text-xl mr-2" />
                    <p className="text-green-600 font-bold">{s.estado}</p>
                  </div>
                  {s.estado === "Aceptada" && (
                    <button onClick={() => handleAcceptSolicitud(s.id)} className="text-[#4e2d1e] hover:underline">
                      <span className="text-xl">✓</span> Aceptar
                    </button>
                  )}
                  <button onClick={() => handleOpenCancelModal(s)} className="text-[#e63946] font-bold">
                    <span className="text-xl"><BsThreeDots /></span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay solicitudes en curso.</p>
          )}
        </div>

        {mensaje && (
          <div className="mt-4 p-4 bg-yellow-200 text-black rounded-2xl flex items-center">
            <FiAlertTriangle className="bg-yellow-200 text-2xl mr-2" />
            <span>{mensaje}</span>
          </div>
        )}
      </div>
    </div>
  );
}
