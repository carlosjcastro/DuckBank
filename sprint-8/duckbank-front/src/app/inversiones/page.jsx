import dynamic from "next/dynamic";

const Loading = (message) => () => (
    <div className="flex justify-center items-center h-screen">
      <p>{message}</p>
    </div>
  );

const Simulador = dynamic(() => import("../../components/inversiones/simulador-plazo-fijo/Simulador"), {
    loading: Loading("Cargando Simulador..."),
  });

export default function Inversiones() {
  return (
    <div className="min-h-screen mt-36 bg-gray-100 p-4">
      <header className="text-black py-6 text-center rounded-2xl">
        <h1 className="text-3xl font-bold">Inversiones Inteligentes</h1>
        <p className="mt-2 text-lg">Calculá, analizá y hacé crecer tu dinero con plazos fijos.</p>
      </header>

      {/* Información sobre Plazos Fijos */}
      <section className="mt-12 bg-white p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-800">¿Qué es un Plazo Fijo?</h2>
        <p className="text-gray-600 mt-4">
          Un plazo fijo es una inversión segura donde depositas una cantidad de dinero durante un período determinado a cambio de una tasa de interés fija. 
          Es ideal para quienes buscan proteger su capital y generar ingresos de manera estable.
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-600">
          <li>Riesgo bajo: ideal para principiantes.</li>
          <li>Tasa de interés garantizada.</li>
          <li>Variedad de plazos para adaptarse a tus necesidades.</li>
        </ul>
      </section>

      {/* Calculadora de Intereses */}
      <section className="mt-12 bg-white p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-800">Calculadora de Intereses</h2>
        <p className="text-gray-600 mt-4">
          Ingresá un monto y plazo para conocer los intereses generados y el monto total al final del período.
        </p>
        <div className="mt-6">
          <Simulador />
        </div>
      </section>

      {/* Beneficios de Invertir */}
      <section className="mt-12 bg-[#f3c677] p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-[#000000]">Beneficios de Invertir en Plazos Fijos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Seguridad Financiera</h3>
            <p className="text-gray-600 mt-2">
              Los plazos fijos son una de las inversiones más seguras, ya que ofrecen una tasa fija garantizada.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Flexibilidad</h3>
            <p className="text-gray-600 mt-2">
              Podes elegir plazos desde 30 días hasta varios años, adaptándose a tus metas financieras.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Intereses Competitivos</h3>
            <p className="text-gray-600 mt-2">
              Disfrutá de tasas de interés atractivas que te permiten hacer crecer tu dinero.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Reinversión Automática</h3>
            <p className="text-gray-600 mt-2">
              Al finalizar el plazo, podes reinvertir automáticamente para maximizar tus ganancias.
            </p>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="mt-12 bg-white p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-800">Preguntas Frecuentes</h2>
        <div className="mt-4 space-y-4">
          <details className="bg-gray-100 p-4 rounded-2xl">
            <summary className="cursor-pointer font-medium text-[#4e2d1e]">
              ¿Puedo retirar mi dinero antes del plazo acordado?
            </summary>
            <p className="mt-2 text-gray-600">
              Dependerá de la política del banco o entidad financiera. En la mayoría de los casos, se penalizan los intereses si se retira el dinero antes. En DuckBank, seguimos una política de penalización mínima.
            </p>
          </details>
          <details className="bg-gray-100 p-4 rounded-2xl">
            <summary className="cursor-pointer font-medium text-[#4e2d1e]">
              ¿Qué pasa si reinvierto mi plazo fijo?
            </summary>
            <p className="mt-2 text-gray-600">
              Al reinvertir, el capital inicial más los intereses se depositan nuevamente, generando un mayor rendimiento.
            </p>
          </details>
          <details className="bg-gray-100 p-4 rounded-2xl">
            <summary className="cursor-pointer font-medium text-[#4e2d1e]">
              ¿La tasa de interés puede cambiar?
            </summary>
            <p className="mt-2 text-gray-600">
              No. La tasa de interés permanece fija durante el período acordado, brindándote seguridad y previsibilidad.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
