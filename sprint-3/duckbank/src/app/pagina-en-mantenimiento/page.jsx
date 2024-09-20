import Image from "next/image";
import arreglando from '../../../public/assets/pages/pagina-en-mantenimiento/arreglando.png'

const PaginaMantenimiento = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen text-[#000000] p-4">
      <Image
        src={arreglando}
        alt="Dibujo de un hombre con signos de interrogación alrededor porque no encuentra la página solicitada"
        width={300}
        height={300}
        className="mb-6"
      />
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Página en Mantenimiento</h1>
        <p className="text-lg">Intenta más tarde.</p>
        <p className="text-lg">
          Si tenés dudas, contactáte: soporte@duckbank.com.ar ó 0800-333-3333
        </p>
      </div>
    </div>
  );
};

export default PaginaMantenimiento;
