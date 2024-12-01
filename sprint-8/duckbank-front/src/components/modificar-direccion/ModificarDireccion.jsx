import React, { useState, useEffect } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { MdOutlineErrorOutline } from "react-icons/md";
import axios from "axios";

const ModificarDireccion = () => {
  const [direccion, setDireccion] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [changeCount, setChangeCount] = useState(0);
  const [lastChangeTime, setLastChangeTime] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");

  // Se realiza un conteo de cambios de dirección en los últimos 30 días. Si se llega a 3 cambios, se bloquea la posibilidad de hacer más cambios durante 30 días.
  const maxChanges = 3;
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;

  // Se obtiene el conteo de cambios y la fecha del último cambio desde el localStorage
  useEffect(() => {
    const storedChangeCount = parseInt(localStorage.getItem("changeCount") || "0", 10);
    const storedLastChangeTime = parseInt(localStorage.getItem("lastChangeTime") || "0", 10);

    // Si han pasado más de 30 días desde el último cambio, se reinicia el conteo de cambios
    const currentTime = Date.now();
    if (storedLastChangeTime && currentTime - storedLastChangeTime > thirtyDays) {
      localStorage.setItem("changeCount", "0");
      localStorage.setItem("lastChangeTime", "0");
      setChangeCount(0);
      setLastChangeTime(null);
    } else {
      setChangeCount(storedChangeCount);
      setLastChangeTime(storedLastChangeTime);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const currentTime = Date.now();

    if (changeCount >= maxChanges) {
      setError("Has alcanzado el límite de cambios de dirección en los últimos 30 días.");
      return;
    }

    // Se muestra el error si la dirección está vacía
    if (!direccion.trim()) {
      setError("La dirección no puede estar vacía.");
      return;
    }

    try {
      // Se envía la dirección al servidor para ser modificada
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/direccion/`,
        { direccion },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      
      setSuccess("Dirección modificada exitosamente.");
      setDireccion("");

      // Esto permite realizar un conteo hasta llegar a 3 cambios. Una vez que se llega a 3, se bloquea la posibilidad de hacer más cambios durante 30 días.
      const newChangeCount = changeCount + 1;
      setChangeCount(newChangeCount);
      setLastChangeTime(currentTime);

      // Se guarda en el localStorage el conteo de cambios y la fecha del último cambio
      localStorage.setItem("changeCount", newChangeCount.toString());
      localStorage.setItem("lastChangeTime", currentTime.toString());
    } catch (err) {
      setError("No se pudo modificar la dirección.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-2xl">
        {error && (
          <p className="text-[#e63946] flex items-center">
            <VscError className="mr-2" />
            {error}
          </p>
        )}
        {success && (
          <p className="text-[#52b788] flex items-center">
            <MdOutlineVerified className="mr-2" />
            {success}
          </p>
        )}
        {warningMessage && (
          <p className="text-[#e63946] flex items-center">
            {warningMessage}
          </p>
        )}
      <input
        type="text"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        placeholder="Nueva dirección"
        className="mt-1 block w-full rounded-2xl mb-6 px-4 py-2 border border-gray-300 focus:ring-[#4e2d1e]"
        disabled={changeCount >= maxChanges}
      />
      <button
        type="submit"
        className={`w-full py-2 rounded-full transition duration-300 ${
          changeCount >= maxChanges
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#4e2d1e] text-white hover:bg-[#3f2518]"
        }`}
        disabled={changeCount >= maxChanges}
      >
        Guardar
      </button>
      {changeCount >= maxChanges && (
        <p className="mt-4 text-center text-[#e63946]">
          Has alcanzado el límite de cambios de dirección en los últimos 30 días.
        </p>
      )}
    </form>
  );
};

export default ModificarDireccion;
