// Probando carga dinámica
function loadContent(page) {
  const mainContent = document.getElementById("main-content");
  fetch(page)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar la página: " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      mainContent.innerHTML = data;
    })
    .catch((error) => {
      mainContent.innerHTML = `<p>Error al cargar el contenido: ${error.message}</p>`;
    });
}

// Menú
function toggleMenu() {
  const menuBtn = document.querySelector(".menu-btn");
  const sidebar = document.querySelector(".sidebar");
  menuBtn.classList.toggle("open");
  sidebar.classList.toggle("show");

  document.body.classList.toggle(
    "menu-open",
    sidebar.classList.contains("show")
  );
}

function toggleDropdown(button) {
  const dropdownContent = button.nextElementSibling;
  dropdownContent.classList.toggle("show");
  const arrowIcon = button.querySelector(".arrow-icon");
  arrowIcon.style.transform = dropdownContent.classList.contains("show")
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

// Cerrar el menú si se hace clic fuera del menú
document.addEventListener("click", function (event) {
  const sidebar = document.querySelector(".sidebar");
  const menuBtn = document.querySelector(".menu-btn");

  if (
    sidebar.classList.contains("show") &&
    !sidebar.contains(event.target) &&
    !menuBtn.contains(event.target)
  ) {
    toggleMenu();
  }
});

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.page) {
    loadContent(event.state.page);
  }
});

function loadHeaderFooter() {
  document.getElementById("header-placeholder").innerHTML = headerHTML;
  document.getElementById("footer-placeholder").innerHTML = footerHTML;

  const script = document.createElement("script");
  script.src = "/public/js/footer.js";
  script.onload = () => console.log("footer.js cargado exitosamente");
  script.onerror = () => console.error("Error al cargar footer.js");
  document.body.appendChild(script);
}
