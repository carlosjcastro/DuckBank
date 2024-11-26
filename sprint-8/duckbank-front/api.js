// src/api.js

import axios from "axios";

// Recupera el token de localStorage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

// Función para hacer una solicitud autenticada
export const fetchDataWithAuth = async () => {
  const token = getTokenFromLocalStorage();

  if (token) {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/prestamos/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error.response);

      // Si el token ha expirado (error 401), intentar renovar el token
      if (error.response.status === 401) {
        const newToken = await refreshToken();
        // Reintenta la solicitud con el nuevo token
        return await fetchDataWithAuth();
      }
    }
  } else {
    console.log("Token no encontrado");
    // Redirige a la página de login si no existe el token
  }
};

// Función para renovar el token con el refresh token
const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");

  if (refresh_token) {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/refresh", {
        refresh_token,
      });

      const { token } = response.data;
      localStorage.setItem("token", token); // Guarda el nuevo token

      console.log("Token renovado con éxito");
      return token;
    } catch (error) {
      console.error("Error al renovar el token", error);
      // Redirige al login si la renovación falla
    }
  } else {
    console.log("No se encontró refresh token");
    // Redirige a la página de login si no hay refresh token
  }
};
