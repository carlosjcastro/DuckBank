'use client';
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useUserProfile } from "../../components/context/UserProfileContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { FaMapMarkerAlt, FaInfoCircle, FaBuilding } from "react-icons/fa";

export default function PerfilUsuario() {
  const { profileData, setProfileData } = useUserProfile();
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Mail, setMail] = useState("");
  const [DNI, setDNI] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({ nombre: "", apellido: "", email: "", dni: "" });
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const cards = [
    {
      icon: <FaMapMarkerAlt size={24} className="text-[#4e2d1e]" />,
      title: "Cambiar Dirección",
      description: "Actualizá la dirección asociada a tu cuenta.",
      action: "/cambio-de-direccion",
    },
    {
      icon: <FaInfoCircle size={24} className="text-[#4e2d1e]" />,
      title: "Ver Perfil Completo",
      description: "Consultá todos los detalles de tu perfil.",
      action: "/tu-informacion/",
    },
    {
      icon: <FaBuilding size={24} className="text-[#4e2d1e]" />,
      title: "Seleccionar Sucursal",
      description: "Elegí o cambiá tu sucursal preferida.",
      action: "/seleccionar-sucursal/",
    },
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
        setNombre(response.data.first_name);
        setApellido(response.data.last_name);
        setMail(response.data.email);
        setDNI(response.data.dni);
        setProfileImage(response.data.profile_image);
      } catch (error) {
        console.error("Error al cargar los datos del perfil", error);
      }
    };

    fetchProfileData();
  }, []);

  const validateInputs = () => {
    let valid = true;
    let newErrors = { nombre: "", apellido: "", email: "", dni: "" };

    if (Nombre.trim() === "") {
      newErrors.nombre = "El nombre es obligatorio.";
      valid = false;
    }
    if (Apellido.trim() === "") {
      newErrors.apellido = "El apellido es obligatorio.";
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

  const saveChanges = async () => {
    if (!validateInputs()) return;

    const updatedData = new FormData();
    updatedData.append("first_name", Nombre);
    updatedData.append("last_name", Apellido);
    updatedData.append("email", Mail);
    updatedData.append("dni", DNI);
    if (profileImage) {
      updatedData.append("profile_image", profileImage);
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-profile/`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        setProfileData(response.data);
        localStorage.setItem("userProfile", JSON.stringify(response.data));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const completeProfileImageURL = profileImage
    ? process.env.NEXT_PUBLIC_API_BASE_URL + profileImage
    : null;

  if (!profileData) return <div>Cargando datos de perfil...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16 gap-8">
      <div className="p-10 rounded-2xl mt-10 bg-white w-full max-w-md">
        <motion.h1 className="text-3xl font-bold text-center">Datos de tu cuenta</motion.h1>
        {isEditing && <p className="text-green-500 text-center">Modo edición</p>}

        <div className="flex flex-col items-center mt-4">
          {completeProfileImageURL ? (
            <div className="relative w-40 h-40">
              <img
                src={completeProfileImageURL}
                style={{ objectFit: "cover" }}
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
            onClick={() => document.querySelector("input[type='file']").click()}
            className="mt-2 text-[#4e2d1e] transition duration-300"
          >
            <FaEdit />
          </button>
        </div>

        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-5 hidden" />

        <div className="mt-8">
          {["Nombre", "Apellido", "Email", "DNI"].map((label) => {
            const value =
              label === "Nombre"
                ? Nombre
                : label === "Apellido"
                ? Apellido
                : label === "Email"
                ? Mail
                : DNI;
            const setValue =
              label === "Nombre"
                ? setNombre
                : label === "Apellido"
                ? setApellido
                : label === "Email"
                ? setMail
                : setDNI;
            const error = errors[label.toLowerCase()] || '';

            return (
              <div key={label} className="mb-4">
                <label className="text-lg font-medium">{label}:</label>
                <input
                  className={`w-full rounded-full p-4 border mt-1 ${error ? "border-red-500" : ""}`}
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

        <p onClick={() => setIsEditing((prev) => !prev)} className="mt-4 text-blue-500 cursor-pointer">
          {isEditing ? "Salir de Modo Edición" : "Entrar en Modo Edición"}
        </p>
        <button onClick={saveChanges} className="mt-6 bg-[#4e2d1e] rounded-full px-6 py-2 text-white transition duration-300 mx-auto block">
          Guardar cambios
        </button>

        <div className="flex justify-center gap-4 mt-8">
          {cards.map((card, index) => (
            <Link href={card.action} key={index} className="w-32 h-40 bg-white flex flex-col hover:bg-gray-200 rounded-2xl items-center justify-center p-2">
              <div className="mb-2">{card.icon}</div>
              <h3 className="text-sm font-semibold text-gray-800 text-center">{card.title}</h3>
              <p className="text-xs text-center">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
