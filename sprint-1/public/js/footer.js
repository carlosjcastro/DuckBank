console.log("estoy funcionando");
const redes = [
  {
    descripcion: "logo red social facebook",
    url: "https://www.facebook.com",
    img: "/src/assets/icons/facebook-logo.png",
  },
  {
    descripcion: "logo red social instagram",
    url: "https://www.instagram.com",
    img: "/src/assets/icons/instagram-logo.png",
  },
  {
    descripcion: "logo red social x",
    url: "https://www.x.com",
    img: "/src/assets/icons/x-logo.png",
  },
  {
    descripcion: "logo Whatsapp",
    url: "https://www.whatsapp.com",
    img: "/src/assets/icons/whatsApp-logo.png",
  },
];

let contenedorRedes = document.getElementById("contenedor-redes--lista");
function crearRed(redSocial) {
  /* console.log(contenedorRedes); */

  contenedorRedes.innerHTML += `
                    <li>
                        <a href=${redSocial.url} target="_blank" class="red-social">
                            <img src="${redSocial.img}" alt="${redSocial.descripcion}">
                        </a>
                    </li>
    `;
}

/* ${red.img} */
redes.forEach(crearRed);
