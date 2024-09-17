// Simulación de carga de datos del usuario
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const heroTitle = document.querySelector(".hero h1");
    heroTitle.textContent = "¡Bienvenido de nuevo, Juan!";
  }, 2000);
});

// Animación simple para los elementos de características y tarjetas
const animateElements = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 300 * (index + 1));
  });
};

animateElements(".feature");
animateElements(".card");
