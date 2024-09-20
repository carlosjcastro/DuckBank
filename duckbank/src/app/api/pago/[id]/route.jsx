import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const tarjetaId = params.id;

  // Se simula el pago
  const result = `Pago realizado con éxito para la tarjeta ${tarjetaId}`;

  return NextResponse.json({ message: result });
}
