"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TuInformacion() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No se encuentra el token de autenticación.");
          return;
        }
  
        const response = await axios.get(`https://web-production-b8a3.up.railway.app/api/perfil-completo/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log(response.data);
  
        setUserData({
          ...response.data,
          sucursal: response.data.sucursal || 'No asignada'
        });
      } catch (err) {
        console.error("Error al cargar los datos del usuario:", err);
        setError('No se pudo obtener los datos del usuario.');
      }
    };
  
    fetchUserData();
  }, []);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  if (error) {
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  }

  if (!userData) return <div className="text-center mt-4">Cargando información...</div>;

  return (
    <div className="container mx-auto p-8 rounded-2xl max-w-3xl mt-36">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#000000]">Perfil de Usuario</h1>
        <p className="text-lg text-gray-600 mt-2">Detalles de tu cuenta</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="text-xl font-medium text-[#000000] mb-4">Información Personal</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <strong>Nombre:</strong>
              <span>{userData.first_name || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <strong>Apellido:</strong>
              <span>{userData.last_name || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <strong>Email:</strong>
              <span>{userData.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <strong>DNI:</strong>
              <span>{userData.dni || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl">
          <h3 className="text-xl font-medium text-[#495057] mb-4">Información Financiera</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <strong>CBU:</strong>
              <span>{userData.cbu || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <strong>Alias:</strong>
              <span>{userData.alias || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <strong>Saldo:</strong>
              <span>${userData.balance?.toLocaleString("es-AR") || '0'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Imagen de perfil */}
      {userData.profile_image && (
        <div className="flex justify-center mt-8 cursor-pointer">
          <div className="relative" onClick={() => openModal(`${process.env.NEXT_PUBLIC_API_BASE_URL}${userData.profile_image}`)}>
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${userData.profile_image}`}
              alt="Imagen de perfil"
              className="w-48 h-48 rounded-full object-cover border-4 border-[#4e2d1e]"
            />
            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[#4e2d1e]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Modal de imagen */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt=""
              className="w-96 h-96 rounded-2xl object-cover"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-[#4e2d1e] rounded-full p-2"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Mensaje final */}
      <div className="mt-12 text-center text-lg text-gray-600">
        <p className="font-semibold text-[#4e2d1e]">
          Mantén siempre tu información actualizada para recibir las últimas novedades y disfrutar de nuestros servicios de manera eficiente.
        </p>
        <p className="mt-4">
          En DuckBank, tu seguridad y comodidad son nuestra prioridad. No olvides revisar y actualizar tus datos periódicamente para aprovechar todas las ventajas que ofrecemos.
        </p>
      </div>
    </div>
  );
}
