import React from "react";
import { FaLock, FaShieldAlt, FaEnvelope, FaWifi, FaRegCheckCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

export default function Seguridad() {
  const seguridadInfo = [
    {
      title: "Protegé tu información personal",
      icon: <FaLock className="text-2xl text-[#4e2d1e]" />,
      content: [
        "Nunca compartas tus claves bancarias o cualquier dato sensible a través de correos electrónicos, mensajes de texto o aplicaciones de mensajería.",
        "Los ciberdelincuentes utilizan estos medios para suplantar a entidades bancarias y robar tus datos.",
        "Usa contraseñas fuertes y únicas para todas tus cuentas. Evita usar las mismas contraseñas en múltiples plataformas."
      ]
    },
    {
      title: "Activá la autenticación en dos pasos (2FA)",
      icon: <FaShieldAlt className="text-2xl text-[#4e2d1e]" />,
      content: [
        "Activa la autenticación en dos pasos en tus cuentas bancarias y aplicaciones financieras. Esto agrega una capa adicional de seguridad.",
        "La 2FA requiere un segundo método de verificación, como un código enviado a tu teléfono, para completar el inicio de sesión."
      ]
    },
    {
      title: "Verificá siempre los correos electrónicos y mensajes",
      icon: <FaEnvelope className="text-2xl text-[#4e2d1e]" />,
      content: [
        "No hagas click en enlaces sospechosos ni descargues archivos adjuntos de correos electrónicos desconocidos.",
        "Aseguráte de que las URL de los correos electrónicos sean legítimas y estén correctamente escritas.",
        "Si recibis un mensaje solicitando tus datos personales, contactános directamente para verificar su autenticidad."
      ]
    },
    {
      title: "Mantén tu software actualizado",
      icon: <IoMdNotifications className="text-2xl text-[#4e2d1e]" />,
      content: [
        "Mantén tu sistema operativo, aplicaciones y antivirus actualizados para protegerte de vulnerabilidades de seguridad.",
        "Las actualizaciones de software a menudo incluyen parches de seguridad importantes que pueden protegerte contra ataques."
      ]
    },
    {
      title: "Controlá tus cuentas regularmente",
      icon: <FaRegCheckCircle className="text-2xl text-[#4e2d1e]" />,
      content: [
        "Revisá frecuentemente tus extractos bancarios y las transacciones para detectar cualquier actividad sospechosa.",
        "Si encontrás un cargo no autorizado, repórtalo inmediatamente a DuckBank."
      ]
    },
    {
      title: "Evita el uso de redes Wi-Fi públicas",
      icon: <FaWifi className="text-2xl text-[#4e2d1e]" />,
      content: [
        "Evitá realizar transacciones bancarias o ingresar datos sensibles cuando estés conectado a redes Wi-Fi públicas o inseguras.",
        "Si es necesario, utilizá una VPN (Red Privada Virtual) para mayor seguridad."
      ]
    },
    {
      title: "Cuidado con los enlaces sospechosos",
      icon: <FaLock className="text-2xl text-[#4e2d1e]" />,
      content: [
        "Nunca hagás click en enlaces sospechosos enviados por desconocidos o que provengan de sitios web no verificados.",
        "Es importante que siempre verifiques la autenticidad de los sitios web antes de ingresar cualquier información sensible."
      ]
    },
    {
      title: "Usá conexiones seguras",
      icon: <FaWifi className="text-2xl text-[#4e2d1e]" />,
      content: [
        "Asegúrate de que las conexiones en línea estén cifradas, especialmente cuando realices pagos o ingreses datos sensibles.",
        "Buscá el candado verde en la barra de direcciones antes de ingresar tus datos personales en un sitio web."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-36">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#000000]">¡DuckBank te protege!</h1>
        <p className="text-lg mb-6 text-gray-600 text-center">
          La seguridad de tu información personal y financiera es crucial. DuckBank te brinda recomendaciones para proteger tus cuentas y prevenir fraudes.
        </p>

        {seguridadInfo.map((item, index) => (
          <section key={index} className="mb-8 md:flex md:items-center md:space-x-6">
            <div className="mb-4 md:mb-0">
              <div className="text-[#4e2d1e]">{item.icon}</div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-[#4e2d1e] mb-2">{item.title}</h2>
              <ul className="list-inside list-disc text-lg text-gray-700">
                {item.content.map((paragraph, idx) => (
                  <li key={idx} className="mb-2">{paragraph}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
