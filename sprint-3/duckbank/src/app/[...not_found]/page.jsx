import Image from "next/image";
import errorImage from "../../../public/assets/pages/error-404/error404.png";
import Link from "next/link";

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen text-[#000000] p-4">
      {/* Si una página no existe o el usuario escribe incorrectamente la ruta, le redirige a la página de 404 */}
      <Image
        src={errorImage}
        alt="Dibujo de un hombre con signos de interrogación alrededor porque no encuentra la página solicitada"
        width={300}
        height={300}
        className="mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl">Página no encontrada</p>
      <p className="text-lg mt-2">
        Lo sentimos, la página que buscas no existe.
      </p>
      <p className="text-lg mt-2"> Si creés que se trata de un error, comunicáte con nosotros o visitá nuestro <Link href="/ayuda" className="text-[#463f3a] font-bold">Centro de Ayuda</Link>.</p>
    </div>
  );
}
