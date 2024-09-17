const TerminosyCondiciones = () => {
  return (
    <div className="p-6">
      <header className="text-center p-6 sm:p-10 bg-[#463f3a] rounded-2xl mt-10 sm:mt-20">
        <img
          className="w-24 h-16 sm:w-30 sm:h-20 mx-auto"
          src="/src/assets/pages/terminos-y-condiciones/privacy.svg"
          alt="Términos y Condiciones Ícono"
        />
        <h1 className="text-3xl sm:text-6xl text-[#ffffff] font-bold mt-4">
          Términos y Condiciones
        </h1>
        <p className="text-lg sm:text-base text-[#ffffff] mt-4">
          Explorá y gestiona tus opciones de inversión.
        </p>
      </header>
      <ol className="list-decimal space-y-6 text-gray-800 p-6 text-justify">
        <li>
          <h2 className="text-xl font-bold mb-2">Aceptación de los Términos</h2>
          <p>
            Al utilizar nuestros servicios, usted acepta estos términos y
            condiciones en su totalidad. Si no está de acuerdo con alguno de
            estos términos, no debe utilizar nuestros servicios.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-bold mb-2">Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier
            momento. Las modificaciones serán efectivas una vez publicadas en
            nuestro sitio web. Su uso continuo de nuestros servicios después de
            la modificación constituye su aceptación de los nuevos términos.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-bold mb-2">Servicios Ofrecidos</h2>
          <p>
            Duck Bank ofrece una variedad de servicios financieros, incluyendo
            cuentas bancarias, tarjetas de crédito y préstamos. Todos los
            servicios están sujetos a estos términos y a cualquier acuerdo
            adicional que pueda aplicar.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-bold mb-2">
            Responsabilidad del Usuario
          </h2>
          <p>
            Usted es responsable de mantener la confidencialidad de su
            información de acceso y de todas las actividades realizadas bajo su
            cuenta. Debe notificar inmediatamente al banco en caso de cualquier
            uso no autorizado de su cuenta.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-bold mb-2">
            Limitación de Responsabilidad
          </h2>
          <p>
            Duck Bank no será responsable de ninguna pérdida o daño que resulte
            de su uso de nuestros servicios, salvo que se deba a negligencia
            grave o mala conducta intencional por parte del banco.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-bold mb-2">Protección de Datos</h2>
          <p>
            Nos comprometemos a proteger su información personal de acuerdo con
            nuestras políticas de privacidad. No compartiremos su información
            con terceros sin su consentimiento, salvo que sea requerido por la
            ley.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-bold mb-2">Compromiso de Servicio</h2>
          <p>
            Duck Bank se compromete a ofrecer servicios financieros de alta
            calidad y a mantener una infraestructura segura para proteger sus
            transacciones y datos. Nos esforzamos por proporcionar un servicio
            al cliente eficiente y resolver cualquier inconveniente de manera
            oportuna.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-bold mb-2">Protección del Usuario</h2>
          <p>
            Nos comprometemos a implementar medidas de seguridad adecuadas para
            proteger su información personal y financiera. Además, brindamos
            asesoramiento sobre cómo proteger sus cuentas y evitar fraudes.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-bold mb-2">Uso Aceptable</h2>
          <p>
            Está prohibido el uso de nuestros servicios para actividades
            ilegales o fraudulentas. Nos reservamos el derecho de suspender o
            cerrar cuentas que se utilicen para estos fines.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-bold mb-2">Ley Aplicable</h2>
          <p>
            Estos términos se rigen por las leyes del país en el que opera Duck
            Bank. Cualquier disputa relacionada con estos términos será resuelta
            en los tribunales competentes de dicho país.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-bold mb-2">Contacto</h2>
          <p>
            Para cualquier consulta relacionada con estos términos, puede
            contactarnos a través de nuestro servicio de atención al cliente en
            <a
              href="mailto:soporte@duckbank.com.ar"
              className="text-blue-600 hover:underline"
            >
              soporte@duckbank.com.ar
            </a>{" "}
            o al <span className="font-bold">0800-333-3333</span>.
          </p>
        </li>
      </ol>
    </div>
  );
};

export default TerminosyCondiciones;
