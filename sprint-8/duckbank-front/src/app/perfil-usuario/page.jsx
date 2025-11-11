"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { useUserProfile } from "../../components/context/UserProfileContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PerfilUsuario() {
  const { profileData, setProfileData } = useUserProfile();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [dni, setDni] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://duckbank-backend.onrender.com/api/perfil-completo/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener perfil");

        const data = await response.json();
        console.log("Datos del perfil:", data);

        setProfileData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, [setProfileData]);

  useEffect(() => {
    if (profileData) {
      console.log("Datos del perfil:", profileData);
      setFirstName(profileData.first_name || "");
      setLastName(profileData.last_name || "");
      setEmail(profileData.email || "");
      setProfileImage(profileData.profile_image || null);
      setDni(profileData.dni || "");
    }
  }, [profileData]);

  const validateInputs = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "Nombre obligatorio";
    if (!email.includes("@")) newErrors.email = "Email inválido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    if (profileImage instanceof File) {
      formData.append("profile_image", profileImage);
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://duckbank-backend.onrender.com/api/update-profile/",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          console.error("No autorizado. Token inválido o expirado.");
        }
        throw new Error("Error al guardar cambios");
      }

      const updatedProfile = await response.json();
      setProfileData(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-16 gap-8">
      <div className="p-10 rounded-2xl bg-white w-full max-w-md">
        <motion.h1 className="text-3xl font-bold text-center">
          Datos de tu cuenta
        </motion.h1>

        <div className="flex flex-col items-center mt-4">
          {profileImage ? (
            <div className="relative w-40 h-40">
              <Image
                src={
                  typeof profileImage === "string"
                    ? profileImage
                    : URL.createObjectURL(profileImage)
                }
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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profileImageInput"
          />
          <button
            onClick={() => document.getElementById("profileImageInput").click()}
            className="mt-2 text-[#4e2d1e] transition duration-300"
          >
            <FaEdit />
          </button>
        </div>

        <div className="mt-8">
          <div className="mb-4">
            <label className="text-lg font-medium">Nombre:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full rounded-full p-4 border mt-1 ${
                errors.firstName ? "border-red-500" : ""
              }`}
              readOnly={!isEditing}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium">Apellido:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-full p-4 border mt-1"
              readOnly={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-full p-4 border mt-1 ${
                errors.email ? "border-red-500" : ""
              }`}
              readOnly={!isEditing}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Mostrar DNI, pero no editable */}
          <div className="mb-4">
            <label className="text-lg font-medium">DNI:</label>
            <input
              type="text"
              value={dni || "No disponible"}
              className="w-full rounded-full p-4 border mt-1"
            />
          </div>
        </div>

        <p
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 text-blue-500 cursor-pointer"
        >
          {isEditing ? "Salir de Modo Edición" : "Entrar en Modo Edición"}
        </p>
        <button
          onClick={handleSave}
          className="mt-6 bg-[#4e2d1e] rounded-full px-6 py-2 text-white active:scale-[.98] transition duration-300 mx-auto block"
        >
          Guardar Cambios
        </button>

        <button
          onClick={async () => {
            const confirmed = confirm(
              "⚠️ Esta acción eliminará tu cuenta permanentemente junto con todos tus datos.\n¿Seguro que deseas continuar?"
            );
            if (!confirmed) return;

            try {
              const token = localStorage.getItem("authToken");
              const response = await fetch(
                "https://duckbank-backend.onrender.com/api/delete-account/",
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (!response.ok) throw new Error("Error al eliminar la cuenta.");

              alert(
                "Tu cuenta fue eliminada correctamente. ¡Lamentamos verte ir! 😢"
              );

              localStorage.removeItem("authToken");
              router.push("/");
            } catch (error) {
              console.error(error);
              alert("Hubo un error al intentar eliminar tu cuenta.");
            }
          }}
          className="mt-6 bg-red-600 hover:bg-red-700 rounded-full px-6 py-2 text-white active:scale-[.98] transition duration-300 mx-auto block"
        >
          Eliminar mi cuenta
        </button>
      </div>
    </div>
  );
}
