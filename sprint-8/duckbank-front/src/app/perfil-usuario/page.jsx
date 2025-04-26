'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { useUserProfile } from "../../components/context/UserProfileContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PerfilUsuario() {
  const { profileData, setProfileData } = useUserProfile();
  const [Nombre, setNombre] = useState("");
  const [Mail, setMail] = useState("");
  const [DNI, setDNI] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({ nombre: "", email: "", dni: "" });
  const [clienteData, setClienteData] = useState(null); // Estado para almacenar los datos del cliente

  const router = useRouter();

  // Cargar datos del perfil
  useEffect(() => {
    if (profileData) {
      setNombre(profileData.Nombre || "");
      setMail(profileData.Mail || "");
      setDNI(profileData.DNI || "");
      setProfileImage(profileData.profileImage || null);
    }
  }, [profileData]);

  // Cargar datos del cliente desde la API de Django
  useEffect(() => {
    const fetchClienteData = async () => {
      try {
        const response = await fetch("https://web-production-b8a3.up.railway.app/api/cuentas/");
        if (!response.ok) {
          throw new Error("Error al obtener datos del cliente");
        }
        const data = await response.json();
        setClienteData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchClienteData();
  }, []);

  const validateInputs = () => {
    let valid = true;
    let newErrors = { nombre: "", email: "", dni: "" };

    if (Nombre.trim() === "") {
      newErrors.nombre = "El nombre es obligatorio.";
      valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(Mail)) {
      newErrors.email = "Email no válido.";
      valid = false;
    }
    if (DNI.trim() === "" || isNaN(DNI)) {
      newErrors.dni = "El DNI debe ser un número válido.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const saveChanges = () => {
    if (!validateInputs()) return;

    const updatedData = {
      Nombre,
      Mail,
      DNI,
      profileImage,
    };

    setProfileData(updatedData);
    setShowModal(true);
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setProfileData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const redirectToModifyAddress = () => {
    router.push("/cambio-de-direccion");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16 gap-8">
      {/* Modificación del perfil */}
      <div className="p-10 rounded-2xl mt-10 bg-white w-full max-w-md">
        <motion.h1 className="text-3xl font-bold text-center">
          Datos de tu cuenta
        </motion.h1>
        {isEditing && <p className="text-green-500 text-center">Modo edición</p>}

        <div className="flex flex-col items-center mt-4">
          {profileImage ? (
            <div className="relative w-40 h-40">
              <Image
                src={profileImage}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                alt="Perfil"
              />
            </div>
          ) : (
            <div className="bg-gray-300 rounded-full w-40 h-40 flex items-center justify-center">
              <span className="text-gray-600">Sin imagen</span>
            </div>
          )}
          <button
            onClick={() => document.querySelector('input[type="file"]').click()}
            className="mt-2 text-[#4e2d1e] transition duration-300"
          >
            <FaEdit />
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-5 hidden"
        />

        <div className="mt-8">
          {["Nombre", "Email", "DNI"].map((label) => {
            const value = label === "Nombre" ? Nombre : label === "Email" ? Mail : DNI;
            const setValue = label === "Nombre" ? setNombre : label === "Email" ? setMail : setDNI;
            const error = errors[label.toLowerCase()];

            return (
              <div key={label} className="mb-4">
                <label className="text-lg font-medium">{label}:</label>
                <input
                  className={`w-full rounded-full p-4 border mt-1 ${
                    error ? "border-red-500" : ""
                  }`}
                  type={label === "Email" ? "email" : "text"}
                  readOnly={!isEditing}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            );
          })}
        </div>

        <p onClick={toggleEdit} className="mt-4 text-blue-500 cursor-pointer">
          {isEditing ? "Salir de Modo Edición" : "Entrar en Modo Edición"}
        </p>
        <button
          onClick={saveChanges}
          className="mt-6 bg-[#4e2d1e] rounded-full px-6 py-2 text-white active:scale-[.98] transition duration-300 mx-auto block"
        >
          Guardar Cambios
        </button>

        <h2 className="text-xl font-semibold mt-8 flex items-center justify-center">
          ¿Deseas cambiar la dirección?
        </h2>
        <button
          onClick={redirectToModifyAddress}
          className="mt-6 text-[#4e2d1e] rounded-full px-6 py-2 active:scale-[.98] transition duration-300 mx-auto block"
        >
          Solicitar Cambio de Dirección
        </button>
      </div>

      {/* Visualización de datos del cliente */}
      <div className="p-10 rounded-2xl mt-10 bg-white w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Datos del Cliente</h2>
        {clienteData ? (
          <ul className="space-y-4">
            {Object.entries(clienteData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Cargando datos...</p>
        )}
      </div>
    </div>
  );
}
