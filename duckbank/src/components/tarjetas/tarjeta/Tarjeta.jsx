import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { BsThreeDots } from 'react-icons/bs';

export default function Tarjeta({ tarjeta, onDelete, onMenuToggle, menuOpen, onClick }) {
  return (
    <div key={tarjeta.id} className="relative rounded-2xl shadow-lg p-4" style={{ backgroundColor: tarjeta.color }}>
      <Image src="/assets/pages/tarjetas/DuckBank.png" alt="Logo de DuckBank" width={60} height={60} className="object-cover mb-4 shadow-inset-image" loading="lazy" />
      <div className="text-white">
        <p className="text-lg font-semibold">{tarjeta.type}</p>
        <p className="text-xl font-bold">{tarjeta.issuer}</p>
        <p className="mt-2 text-lg font-bold">{tarjeta.number}</p>
        <p className="text-sm mt-1">Inicio: {tarjeta.fechaInicio}</p>
        <p className="text-sm">Vencimiento: {tarjeta.fechaVencimiento}</p>
        <p className="absolute bottom-4 right-4 text-sm">{tarjeta.name}</p>
        <Link href={`/tarjetas/${tarjeta.id}`} className="block mt-4 text-white hover:underline">
          <div className="flex items-center">
            <IoIosInformationCircleOutline className="text-xl mr-2" />
            Ver detalles
          </div>
        </Link>
      </div>
      <button onClick={() => onMenuToggle(menuOpen === tarjeta.id ? null : tarjeta.id)} className="absolute top-4 right-4 text-white">
        <span className="text-xl"><BsThreeDots /></span>
      </button>
      {menuOpen === tarjeta.id && (
        <div className="absolute top-10 right-4 bg-white text-black border border-gray-300 rounded-2xl shadow-lg">
          <p onClick={() => onDelete(tarjeta.id)} className="p-2 cursor-pointer rounded-2xl hover:bg-gray-200">
            Dar de baja la tarjeta {tarjeta.number}
          </p>
        </div>
      )}
    </div>
  );
}
