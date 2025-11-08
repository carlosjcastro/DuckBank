"use client";
import { useEffect, useState } from "react";
import { useUserProfile } from "../components/context/UserProfileContext";
import AccountsSection from "../components/inicio/AccountsSection";
import TransactionsSection from "../components/inicio/TransactionsSection";
import PromotionsSection from "../components/inicio/PromotionsSection";
import CurrencyConverter from "../components/inicio/CurrencyConverter";
import Clientes from "@/components/clientes/Clientes";
import Saldo from "@/components/saldo/Saldo";
import PrecioDolar from "@/components/precio-dolar/PrecioDolar";
import Transferir from "../components/transferir/Tranferir";

export default function Inicio() {
  const { profileData } = useUserProfile();
  const userName = profileData ? profileData.first_name : "Usuario";

  const [showBalances, setShowBalances] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const toggleBalancesVisibility = () => setShowBalances((prev) => !prev);

  useEffect(() => {
    const messages = [
      `Bienvenido!`,
      `Qué gusto verte de nuevo!`,
      `Bienvenido a nuestro cliente favorito 😎`,
      `Hola, listo para un gran día bancario? 💰`,
      `Nos alegra tenerte aquí!`,
      `Bienvenido al lugar donde tu dinero trabaja por ti! 💼`,
      `¡Hey! Esperamos que tengas una jornada increíble 🚀`,
      `Bienvenido de vuelta. Tu cuenta te extrañaba 💳`,
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setWelcomeMessage(randomMessage);
  }, [userName]);

  return (
    <div className="px-4 md:px-12 mt-28 space-y-12 max-w-7xl mx-auto">
      <h1 className="font-bold text-center text-3xl">{welcomeMessage}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Clientes />
        <div className="flex items-center justify-center">
          <Saldo />
        </div>
      </div>

      {/* Sección Transferir */}
      <Transferir />

      {/* Sección de Cuentas y Transacciones */}
      <AccountsSection
        showBalances={showBalances}
        toggleBalancesVisibility={toggleBalancesVisibility}
      />
      <TransactionsSection />
      <PromotionsSection />

      {/* Sección Dólar y Conversor */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="rounded-2xl bg-white w-full md:w-1/2">
          <CurrencyConverter />
        </div>
        <div className="w-full md:w-1/2 h-full">
          <PrecioDolar />
        </div>
      </div>
    </div>
  );
}
