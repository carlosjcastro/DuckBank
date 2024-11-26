import Image from "next/image";
import { RiDiscountPercentLine } from "react-icons/ri";

const promotions = [
  {
    id: 1,
    title: "50% en Uber",
    discount: "50%",
    logo: "/assets/pages/inicio/uber.webp",
    expiry: "18 septiembre 2024",
  },
  {
    id: 2,
    title: "40% en McDonald's",
    discount: "40%",
    logo: "/assets/pages/inicio/mcdonals.webp",
    expiry: "20 octubre 2024",
  },
  {
    id: 3,
    title: "30% en ChangoMás",
    discount: "30%",
    logo: "/assets/pages/inicio/changomas.webp",
    expiry: "26 noviembre 2024",
  },
  {
    id: 4,
    title: "20% en Cinemacenter",
    discount: "20%",
    logo: "/assets/pages/inicio/cinemacenter.png",
    expiry: "8 diciembre 2024",
  },
  {
    id: 5,
    title: "15% en Easy",
    discount: "15%",
    logo: "/assets/pages/inicio/easy.png",
    expiry: "15 diciembre 2024",
  },
  {
    id: 6,
    title: "35% en PedidosYa",
    discount: "35%",
    logo: "/assets/pages/inicio/pedidosya.png",
    expiry: "20 diciembre 2024",
  },
  {
    id: 7,
    title: "15% en Musimundo",
    discount: "15%",
    logo: "/assets/pages/inicio/musimundo.webp",
    expiry: "29 diciembre 2024",
  },
  {
    id: 8,
    title: "25% en Rappi",
    discount: "25%",
    logo: "/assets/pages/inicio/rappi.jpg",
    expiry: "31 diciembre 2024",
  },
];

export default function PromotionsSection() {
  return (
    <div className="rounded-2xl bg-white p-4">
      <RiDiscountPercentLine size={40} className="m-2" />
      <h2 className="text-xl font-bold mb-4">Promociones y Descuentos</h2>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="p-4 w-60 mb-4 flex-none rounded-2xl bg-indigo-100 flex flex-col items-center hover:bg-indigo-200"
            >
              <Image
                className="w-16 h-16 mb-2"
                alt={promo.title}
                src={promo.logo}
                width={50}
                height={50}
              />
              <h3 className="text-lg font-semibold">{promo.title}</h3>
              <p className="text-xl font-bold mt-2">{promo.discount}</p>
              <p className="text-sm text-[#e63949] mt-2">Expira: {promo.expiry}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
