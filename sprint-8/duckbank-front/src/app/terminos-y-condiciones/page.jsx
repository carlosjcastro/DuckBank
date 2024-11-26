import Image from "next/image";
import privacy from "../../../public/assets/pages/terminos-y-condiciones/privacy.svg";

const secciones = [
  {
    titulo: "Aceptación de los Términos",
    contenido: `Al utilizar nuestros servicios, usted acepta estos términos y
                condiciones en su totalidad. Si no está de acuerdo con alguno de estos
                términos, no debe utilizar nuestros servicios.`,
  },
  {
    titulo: "Modificaciones",
    contenido: `Nos reservamos el derecho de modificar estos términos en cualquier
                momento. Las modificaciones serán efectivas una vez publicadas en
                nuestro sitio web. Su uso continuo de nuestros servicios después de la
                modificación constituye su aceptación de los nuevos términos.`,
  },
  {
    titulo: "Servicios Ofrecidos",
    contenido: `Duck Bank ofrece una variedad de servicios financieros, incluyendo
                cuentas bancarias, tarjetas de crédito y préstamos. Todos los
                servicios están sujetos a estos términos y a cualquier acuerdo
                adicional que pueda aplicar.`,
  },
  {
    titulo: "Responsabilidad del Usuario",
    contenido: `Usted es responsable de mantener la confidencialidad de su información
                de acceso y de todas las actividades realizadas bajo su cuenta. Debe
                notificar inmediatamente al banco en caso de cualquier uso no
                autorizado de su cuenta.`,
  },
  {
    titulo: "Limitación de Responsabilidad",
    contenido: `Duck Bank no será responsable de ninguna pérdida o daño que resulte de
                su uso de nuestros servicios, salvo que se deba a negligencia grave o
                mala conducta intencional por parte del banco.`,
  },
  {
    titulo: "Protección de Datos",
    contenido: `Nos comprometemos a proteger su información personal de acuerdo con
                nuestras políticas de privacidad. No compartiremos su información con
                terceros sin su consentimiento, salvo que sea requerido por la ley.`,
  },
  {
    titulo: "Compromiso de Servicio",
    contenido: `Duck Bank se compromete a ofrecer servicios financieros de alta
                calidad y a mantener una infraestructura segura para proteger sus
                transacciones y datos. Nos esforzamos por proporcionar un servicio al
                cliente eficiente y resolver cualquier inconveniente de manera
                oportuna.`,
  },
  {
    titulo: "Protección del Usuario",
    contenido: `Nos comprometemos a implementar medidas de seguridad adecuadas para
                proteger su información personal y financiera. Además, brindamos
                asesoramiento sobre cómo proteger sus cuentas y evitar fraudes.`,
  },
  {
    titulo: "Uso Aceptable",
    contenido: `Está prohibido el uso de nuestros servicios para actividades ilegales
                o fraudulentas. Nos reservamos el derecho de suspender o cerrar
                cuentas que se utilicen para estos fines.`,
  },
  {
    titulo: "Ley Aplicable",
    contenido: `Estos términos se rigen por las leyes de la República Argentina.
                Cualquier disputa relacionada con estos términos será resuelta en los
                tribunales competentes de la Ciudad Autónoma de Buenos Aires, salvo
                que se disponga otra cosa en la normativa aplicable.`,
  },
  {
    titulo: "Contacto",
    contenido: `Para cualquier consulta relacionada con estos términos, puede
                contactarnos a través de nuestro servicio de atención al cliente en
                <a href="mailto:soporte@duckbank.com.ar" className="text-blue-600 hover:underline">
                  soporte@duckbank.com.ar
                </a> o al <span className="font-bold">0800-333-3333</span>.`,
  },
];

export default function TerminosYCondiciones() {
  return (
    <div className="p-6 mt-4">
      <header className="text-center p-6 sm:p-10 rounded-2xl mt-2 sm:mt-20">
        {/* <Image
          className="w-24 h-16 sm:w-30 sm:h-20 mx-auto"
          src={privacy}
          alt="Términos y Condiciones Ícono"
          width={120}
          height={80}
        /> */}
        <h1 className="text-3xl sm:text-4xl text-[#000000] font-bold mt-2">
          Términos y Condiciones
        </h1>
      </header>

      {secciones.map((seccion, index) => (
        <section key={index} className="py-6">
          <h2 className="text-2xl font-bold mb-4">
            {index + 1}. {seccion.titulo}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: seccion.contenido }} />
        </section>
      ))}
    </div>
  );
}
