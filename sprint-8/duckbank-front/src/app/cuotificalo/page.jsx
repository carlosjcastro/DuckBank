"use client";
import { useState } from "react";

export default function Cuotificalo() {
  const [amount, setAmount] = useState("");
  const [installments, setInstallments] = useState(3);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const formatAmount = (value) => {
    const cleanValue = value.replace(/\./g, "").replace(/\D/g, "");
    return Number(cleanValue).toLocaleString("es-AR");
  };

  const calculateInstallments = () => {
    const rawAmount = parseInt(amount.replace(/\./g, ""));
    if (!rawAmount || rawAmount <= 0) return;
    const rate = 0.03;
    const monthlyRate = Math.pow(1 + rate, installments) - 1;
    const payment = ((rawAmount * rate) / monthlyRate).toFixed(2);
    setMonthlyPayment(payment);
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-36">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-[#000000]">
          ¡Cuotificalo con DuckBank! 💳
        </h1>
        <p className="text-lg mt-2">
          Financiamiento rápido y accesible con cuotas fijas y tasas
          competitivas. ¡Calculá tu cuota ahora!
        </p>
      </header>

      {/* Calculadora de Cuotas */}
      <main className="w-full max-w-md p-6 rounded-2xl">
        <label className="block mb-4">
          Monto a financiar (ARS):
          <input
            type="text"
            className="w-full p-2 border rounded-full mt-1"
            value={amount}
            onChange={(e) => setAmount(formatAmount(e.target.value))}
            placeholder="Ej: 50.000"
          />
        </label>

        <label className="block mb-4">
          Cantidad de cuotas:
          <select
            className="w-full p-2 border rounded-full mt-1"
            value={installments}
            onChange={(e) => setInstallments(parseInt(e.target.value))}
          >
            {[3, 6, 9, 12].map((num) => (
              <option key={num} value={num}>
                {num} cuotas
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={calculateInstallments}
          className="w-full bg-[#4e2d1e] text-white py-2 rounded-full hover:bg-[#3f2518] transition duration-300"
        >
          Calcular
        </button>

        {monthlyPayment && (
          <div className="mt-4 p-4 bg-green-100 rounded-2xl">
            <p>
              Monto total:{" "}
              <strong>
                ${parseFloat(amount.replace(/\./g, "")).toLocaleString("es-AR")}
              </strong>
            </p>
            <p>
              Valor de cada cuota:{" "}
              <strong>
                ${parseFloat(monthlyPayment).toLocaleString("es-AR")}
              </strong>
            </p>
          </div>
        )}
      </main>

      <section className="w-full max-w-3xl p-6 mt-8 text-left bg-white rounded-2xl">
        <h3 className="text-2xl font-semibold text-[#000000]">
          ¿Qué es Cuotificalo?
        </h3>
        <p className="mt-4">
          Cuotificalo es una solución financiera flexible para quienes desean
          adquirir productos o servicios y pagarlos en cuotas fijas mensuales. A
          través de DuckBank, podés acceder a financiamiento rápido,
          transparente y sin complicaciones, con cuotas que se adaptan a tu
          capacidad de pago.
        </p>

        <h3 className="text-2xl font-semibold text-[#000000] mt-6">
          ¿Cómo funciona?
        </h3>
        <p className="mt-4">
          Simplemente elegí el monto que querés financiar y el plazo que más te
          convenga, y nuestro sistema te mostrará cuánto vas a pagar cada mes,
          con una tasa de interés competitiva. Todo el proceso es completamente
          online, sin trámites engorrosos ni largas esperas.
        </p>

        <h3 className="text-2xl font-semibold text-[#000000] mt-6">
          Beneficios de Cuotificalo
        </h3>
        <ul className="list-disc pl-6 mt-4">
          <li>Tasas de interés fijas y accesibles.</li>
          <li>Plazos de hasta 12 meses.</li>
          <li>Simulación en tiempo real de tus cuotas.</li>
          <li>Sin trámites complicados ni documentación extensa.</li>
          <li>Todo el proceso es 100% online, rápido y seguro.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-[#000000] mt-6">
          ¿Por qué elegir Cuotificalo?
        </h3>
        <p className="mt-4">
          Cuotificalo te ofrece una forma sencilla y transparente de financiar
          tus compras o proyectos. Sin letra pequeña, sin sorpresas. Lo que ves
          es lo que pagás, con cuotas fijas, sin cambios en el monto total.
        </p>

        <h3 className="text-2xl font-semibold text-[#000000] mt-6">
          Contáctanos
        </h3>
        <p className="mt-4">
          Si tenés alguna duda o necesitás más información, nuestro equipo está
          disponible para ayudarte. ¡No dudes en ponerte en contacto con
          nosotros para más detalles sobre cómo aprovechar Cuotificalo para tus
          proyectos!
        </p>
      </section>
    </div>
  );
}
