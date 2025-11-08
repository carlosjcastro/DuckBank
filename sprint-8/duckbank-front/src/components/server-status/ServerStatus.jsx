import React, { useEffect, useState } from "react";

const ServerStatus = () => {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch(
          "https://duckbank-backend.onrender.com/api/status/",
          {
            redirect: "follow",
          }
        );
        const text = await response.text();

        try {
          const data = JSON.parse(text);
          if (data.status === "online") {
            setStatus("online");
          } else {
            setStatus("offline");
          }
        } catch (err) {
          setStatus("offline");
        }
      } catch (error) {
        setStatus("offline");
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusStyle = () => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200";
      case "offline":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getText = () => {
    switch (status) {
      case "online":
        return "🟢 ¡DuckBank está activo!";
      case "offline":
        return "🔴 DuckBank no está activo.";
      default:
        return "🟡 Verificando servidor de DuckBank...";
    }
  };

  return (
    <div className="absolute top-6 left-0 w-full flex justify-center z-50">
      <div
        className={`px-5 py-2 rounded-2xl shadow-md border text-sm md:text-base font-semibold transition-all duration-300 ${getStatusStyle()}`}
      >
        {getText()}
      </div>
    </div>
  );
};

export default ServerStatus;
