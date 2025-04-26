"use client";
import { useState } from "react";
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
  const { profileData, loading } = useUserProfile();

  const userName = profileData
    ? `${profileData.first_name}`
    : "Usuario";

  const [showBalances, setShowBalances] = useState(true);

  const toggleBalancesVisibility = () => setShowBalances((prev) => !prev);

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="px-4 md:px-12 mt-28 space-y-12 max-w-7xl mx-auto">
      <h1 className="font-bold text-center text-3xl">Bienvenido, {userName}</h1>

      {/* Sección Clientes y Saldo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Clientes />
        <Saldo />
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
