import { NextResponse } from 'next/server';

// Esta función manejará las solicitudes POST a /api/pago/[id]
export async function POST(req, { params }) {
  const { id } = params; // Obtén el ID de los parámetros

  // Simulando el procesamiento de un aumento de límite
  const result = `Aumento de límite solicitado con éxito para la tarjeta ${id}`;

  return NextResponse.json({ message: result }); // Devuelve la respuesta en formato JSON
}
