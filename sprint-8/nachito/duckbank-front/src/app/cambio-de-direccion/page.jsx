'use client';
import React from "react";
import ModificarDireccion from "../../components/modificar-direccion/ModificarDireccion";
import Link from "next/link";

const CambiarDireccion = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16">
      <div className="p-10 rounded-2xl mt-10 bg-white w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-4 text-[#000000]">
          Modificar Dirección
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Mantener actualizada tu dirección en nuestro sistema es esencial para garantizar que recibas
          notificaciones importantes y documentos relacionados con tu cuenta bancaria. Si te has mudado
          recientemente, actualizá tu dirección en pocos pasos.
        </p>
        <ModificarDireccion />
        <div className="mt-6 text-sm text-gray-500">
          <p className="mb-2">
            Por favor, ten en cuenta que solo puedes realizar <strong>tres cambios de dirección</strong> en un
            período de 30 días. Esto nos ayuda a proteger la seguridad de tu cuenta.
          </p>
          <p className="mb-2">
            Si necesitas ayuda adicional, contáctanos llamando al <strong>0800-333-3333</strong> o visitando
            cualquiera de nuestras <strong><Link href="/sucursales">sucursales públicas</Link></strong>. Estamos aquí para ayudarte.
          </p>
          <p>
            Recuerda: Es importante que la nueva dirección sea válida y esté registrada a tu nombre para evitar
            inconvenientes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CambiarDireccion;
