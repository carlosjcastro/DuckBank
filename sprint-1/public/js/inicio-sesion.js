let mail = "";
let contra = "";
const usuario = "itbank@gmail.com";
const pass = "itbank";

function checkeosesion() {
  mail = document.getElementById("email").value;
  contra = document.getElementById("pass").value;

  // Muestra mensajes de error en pantalla si el usuario no ingreso el Email o la Contraseña o los dos.
  document.getElementById("email-error").textContent = "";
  document.getElementById("pass-error").textContent = "";

  let valid = true;

  if (!mail) {
    document.getElementById("email-error").textContent = "Ingrese el email";
    valid = false;
  }

  if (!contra) {
    document.getElementById("pass-error").textContent = "Ingrese la contraseña";
    valid = false;
  }

  if (valid) {
    if (mail === usuario && contra === pass) {
      alert("¡Inicio de sesión exitoso!");
      window.location.href = "/public/index.html";
    } else {
      alert("No se pudo iniciar sesión.");
    }
  }

  console.log(mail);
  console.log(contra);
}
