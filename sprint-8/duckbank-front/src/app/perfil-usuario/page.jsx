"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { useUserProfile } from "../../components/context/UserProfileContext";
import { motion, AnimatePresence } from "framer-motion";
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
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
        setProfileData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, [setProfileData]);

  useEffect(() => {
    if (profileData) {
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

      if (!response.ok) throw new Error("Error al guardar cambios");

      const updatedProfile = await response.json();
      setProfileData(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://duckbank-backend.onrender.com/api/delete-account/",
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar la cuenta.");

      setShowModal(false);
      localStorage.removeItem("authToken");
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
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
      <div className="p-10 rounded-2xl bg-white w-full max-w-md shadow-lg">
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

          <div className="mb-4">
            <label className="text-lg font-medium">DNI:</label>
            <input
              type="text"
              value={dni || "No disponible"}
              className="w-full rounded-full p-4 border mt-1"
              readOnly
            />
          </div>
        </div>

        <p
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 text-blue-500 cursor-pointer text-center"
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
          onClick={() => setShowModal(true)}
          className="mt-6 bg-red-600 hover:bg-red-700 rounded-full px-6 py-2 text-white active:scale-[.98] transition duration-300 mx-auto block"
        >
          Eliminar mi cuenta
        </button>
      </div>

      {/* Modal de confirmación */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                ¿Eliminar cuenta?
              </h2>
              <p className="text-gray-600 mb-6">
                Esta acción eliminará tu cuenta y todos tus datos de forma
                permanente.
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-5 py-2 rounded-full transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className={`${
                    isDeleting
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white font-medium px-5 py-2 rounded-full transition`}
                >
                  {isDeleting ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
