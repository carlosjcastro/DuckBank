import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const tarjetaId = params.id;

  // Se Simula el procesamiento de un aumento de límite
  const result = `Aumento de límite solicitado con éxito para la tarjeta ${tarjetaId}`;

  return NextResponse.json({ message: result });
}
