// Contenido HTML para el header, aside y el footer
// Archivo de Prueba
const headerHTML = `
    <header>
        <a href="#"><img class="logo" src="/src/assets/icons/LogoDuckBank2.png" alt="Logo DuckBank" title="Logo DuckBank"></a>
        <h1 class="titulo">Duck Bank</h1>
        <button class="menu-btn" onclick="toggleMenu()">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
    </header>
    <aside class="sidebar">
        <nav class="nav">
            <ul class="nav-list">
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Cuentas</a></li>
                <li><a href="/public/html/tarjetas.html">Tarjetas</a></li>
                <li><a href="#">Seguros</a></li>
                <li><a href="#">Pagos y Servicios</a></li>
                <li><a href="#">Historial de Cuenta</a></li>
                <li><a href="#">Préstamos</a></li>
                <li><a href="/public/html/inversiones.html">Inversiones</a></li>
                <li><a href="#">Cuotificalo</a></li>
                <li>
                    <button class="dropdown-btn" onclick="toggleDropdown(this)">
                        Mis beneficios
                        <i class="fas fa-chevron-down arrow-icon"></i>
                    </button>
                    <ul class="dropdown-content">
                        <li><a href="#">Puntos y Promociones</a></li>
                        <li><a href="#">Referidos</a></li>
                    </ul>
                </li>
                <li>
                    <button class="dropdown-btn" onclick="toggleDropdown(this)">
                        Seguridad y Privacidad
                        <i class="fas fa-chevron-down arrow-icon"></i>
                    </button>
                    <ul class="dropdown-content">
                        <li><a href="#">Configuración</a></li>
                        <li><a href="#">TOKEN DUCK</a></li>
                        <li><a href="#">Claves</a></li>
                    </ul>
                </li>
                <li>
                    <button class="dropdown-btn" onclick="toggleDropdown(this)">
                        Contacto
                        <i class="fas fa-chevron-down arrow-icon"></i>
                    </button>
                    <ul class="dropdown-content">
                        <li><a href="#">Sucursales y Turnos</a></li>
                        <li><a href="#">Cajero más Cercano</a></li>
                        <li><a href="#">Atención al Cliente</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </aside>
`;

const footerHTML = `
    <footer class="pie-de-pagina">
        <div class="footer-contenedor">
            <a href="index.html"><h2>DuckBank</h2></a>
            <div class="footer-contenedor-lista">
                <ul class="footer-lista--contacto">
                    <li class="titulo-lista">Contacto</li>
                    <a href="mailto:soporte@duckbank.com.ar">
                        <li class="item">soporte@duckbank.com.ar</li>
                    </a>
                    <li class="item">0800-333-3333</li>
                </ul>
                <ul class="footer-lista--contacto">
                    <li class="titulo-lista">Nosotros</li>
                    <a href="#"><li class="item">Blog</li></a>
                    <a href="#"><li class="item">Únete al equipo</li></a>
                </ul>
                <ul class="footer-lista--contacto">
                    <li class="titulo-lista">Otros enlaces</li>
                    <a href="#"><li class="item">Seguridad</li></a>
                    <a href="#"><li class="item">Defensa consumidor</li></a>
                </ul>
            </div>
            <div class="contenedor-newsLetter">
                <p>Únete a nosotros!</p>
                <form action="#" id="suscripcion">
                    <input class="email" type="email" name="email" id="email" placeholder="Ingrese su Email">
                    <input class="submit" type="submit" value="Suscribirse">
                </form>
            </div>
        </div>
        <div class="contenedor-extras">
            <div class="contenedor-extras--terminos">
                <p>© Duckbank Argentina S.A. </p>
                <a href="#"><p class="terminos-condiciones">Términos y condiciones</p></a>
            </div>
            <div class="contenedor-redes">
                <ul id="contenedor-redes--lista">
                    <!-- Aquí agregarás los enlaces de redes sociales dinámicamente -->
                </ul>
            </div>
        </div>
    </footer>
`;

// Función para insertar el contenido en el HTML
function loadHeaderFooter() {
  document.getElementById("header-placeholder").innerHTML = headerHTML;
  document.getElementById("footer-placeholder").innerHTML = footerHTML;

  const script = document.createElement("script");
  script.src = "/public/js/footer.js";
  document.body.appendChild(script);
}

// Ejecutar después de que el DOM se haya cargado
document.addEventListener("DOMContentLoaded", loadHeaderFooter);
