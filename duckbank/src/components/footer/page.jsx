'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const redes = [
    {
      descripcion: 'logo red social facebook',
      url: 'https://www.facebook.com',
      img: '/assets/icons/facebook-logo.png',
    },
    {
      descripcion: 'logo red social instagram',
      url: 'https://www.instagram.com',
      img: '/assets/icons/instagram-logo.png',
    },
    {
      descripcion: 'logo red social x',
      url: 'https://www.x.com',
      img: '/assets/icons/x-logo.png',
    },
    {
      descripcion: 'logo Whatsapp',
      url: 'https://www.whatsapp.com',
      img: '/assets/icons/whatsApp-logo.png',
    },
  ];

  return (
    <footer className="bg-[#143D60] w-full mt-24 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:border-b lg:border-gray-400 pb-6">
          <Link href="/">
            <span className="text-[#f3f4f4] font-bold text-2xl lg:mb-0">
              DuckBank
            </span>
          </Link>
          <div className="flex flex-col md:flex-row md:justify-center lg:gap-10 lg:text-sm">
            <ul className="text-center md:text-left lg:w-1/4 mb-6 lg:mb-0">
              <li className="text-[#f3c677] font-semibold mb-2">Contacto</li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] mb-1 transition transition-300">
                <Link href="/contacto">Escribínos</Link>
              </li>
              <li className="text-[#d1d1d1]">0800-333-3333</li>
            </ul>
            <ul className="text-center md:text-left lg:w-1/4 mb-6 lg:mb-0">
              <li className="text-[#f3c677] font-semibold mb-2">Nosotros</li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] mb-1 transition transition-300">
                <Link href="/blog">Blog</Link>
              </li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] transition transition-300">
                <Link href="/trabaja-con-nosotros">Trabajá con nosotros</Link>
              </li>
            </ul>
            <ul className="text-center md:text-left lg:w-1/4 mb-6 lg:mb-0">
              <li className="text-[#f3c677] font-semibold mb-2">Otros enlaces</li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] mb-1 transition transition-300">
                <Link href="/seguridad">Seguridad</Link>
              </li>
              <li className="text-[#d1d1d1] hover:text-[#f3f4f4] transition transition-300">
                <Link href="/defensa-consumidor">Defensa consumidor</Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-72 lg:items-start">
            <p className="text-[#f3c677] font-bold text-xl mb-2 text-center lg:text-left lg:font-normal lg:text-lg">
              Únete al NewsLetter!
            </p>
            <form className="flex flex-col lg:flex-row items-center" action="#" id="suscripcion">
              <input
                className="bg-[#463f3a] rounded-full text-white placeholder-[#a3a3a3] p-2 w-48 lg:w-36 lg:mr-2 mb-2 lg:mb-0 lg:text-sm"
                type="email"
                name="email"
                id="email"
                placeholder="Ingresá tu Email"
              />
              <input
                className="bg-[#f3c677] text-black rounded-full px-4 py-2 cursor-pointer lg:ml-2 lg:mr-0"
                type="submit"
                value="Suscribirse"
              />
            </form>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center mt-8 text-sm text-[#d1d1d1]">
          <p className="mb-2 lg:mb-0">
            © Duckbank Argentina S.A.
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 lg:w-1/3">
            <Link href="/terminos-y-condiciones">
              <span className="hover:text-[#fef4f4] border-t border-[#d1d1d1] pt-1 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-4 transition transition-300">
                Términos y condiciones
              </span>
            </Link>
            <ul className="flex items-center gap-3 mt-2 lg:mt-0">
              {redes.map((red, index) => (
                <li key={index}>
                  <a href={red.url} target="_blank" rel="noopener noreferrer">
                    <Image
                      className="h-7 lg:h-6"
                      src={red.img}
                      alt={red.descripcion}
                      width={25}
                      height={25}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
