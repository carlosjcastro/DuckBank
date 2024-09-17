import { Link } from "react-router-dom";

const Footer = () => {
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

  return (
    <footer className="bg-[#463f3a] w-full mt-24">
      <div className="flex flex-col items-center lg:flex-row lg:border-b lg:border-gray-400">
        <a href="index.html" className="text-[#f3c677] font-bold text-2xl">
          <h2 className="lg:mb-10 lg:ml-3 ">DuckBank</h2>
        </a>
        <div className="flex flex-col justify-center items-center gap-4 my-5 md:flex-row md:justify-center md:w-full md:gap-24 lg:gap-10 lg:text-sm">
          <ul className="text-center md:text-start">
            <li className="text-center  text-[#f3c677] md:text-start">
              Contacto
            </li>
            <a href="mailto:soporte@duckbank.com.ar">
              <li className="text-center text-[grey] hover:text-[#bca987] ">
                soporte@duckbank.com.ar
              </li>
            </a>
            <li className="text-[grey]">0800-333-3333</li>
          </ul>
          <ul className="text-center md:text-start ">
            <li className="text-center text-[#f3c677] md:text-start">
              Nosotros
            </li>
            <a href="">
              <li className="text-[grey] hover:text-[#bca987]">Blog</li>
            </a>
            <a href="">
              <li className="text-[grey] hover:text-[#bca987]">
                Únete al equipo
              </li>
            </a>
          </ul>
          <ul className="text-center md:text-start">
            <li className="text-center text-[#f3c677]  md:text-start">
              Otros enlaces
            </li>
            <a href="">
              <li className="text-[grey] hover:text-[#bca987]">Seguridad</li>
            </a>
            <a href="">
              <li className="text-[grey] hover:text-[#bca987]">
                Defensa consumidor
              </li>
            </a>
          </ul>
        </div>
        <div className="lg:flex lg:flex-col w-72 lg:items-start">
          <p className="text-[#f3c677] font-bold text-xl mb-2 text-center tracking-wide lg:font-normal lg:text-[19px] lg:tracking-normal">
            Únete al NewsLetter!
          </p>
          <form className="lg: flex lg:items-start" action="#" id="suscripcion">
            <input
              className="border-b-[#b5b5b5] border-x-0 border-t-0 w-48 p-0 mt-2 bg-[#463f3a] lg:text-sm lg:border-none lg:w-36"
              type="email"
              name="email"
              id="email"
              placeholder="Ingrese su Email"
            />
            <input
              className="ml-4 p-2 rounded-full p-1 text-sm cursor-pointer bg-[#f3c677] text-[#463f3a] lg:ml-0 lg:mr-2 lg:mt-1"
              type="submit"
              value="Suscribirse"
            />
          </form>
        </div>
      </div>
      <div className="flex justify-between mt-8 text-sm my-auto text-[gray] lg:mx-3 lg:pb-2">
        <div className=" flex flex-col ml-2 lg:flex-row">
          <p>© Duckbank Argentina S.A.</p>
          <Link to="/terminos-y-condiciones">
            <p className="hover:text-[#bca987] lg:border-l lg:border-gray-400 lg:pl-1 lg:ml-1">
              Términos y condiciones
            </p>
          </Link>
        </div>
        <div className=" my-auto mr-1">
          <ul
            className="flex items-center justify-center gap-1 lg:mx-3"
            id="contenedor-redes--lista"
          >
            {redes.map((red, index) => (
              <li className="self-center" key={index}>
                <a href={red.url} target="blank" className="">
                  <img
                    className="h-7 lg:h-6 "
                    src={red.img}
                    alt={red.descripcion}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
