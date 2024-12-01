"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserProfile } from "../components/context/UserProfileContext";
import AccountsSection from "../components/inicio/AccountsSection";
import TransactionsSection from "../components/inicio/TransactionsSection";
import PromotionsSection from "../components/inicio/PromotionsSection";
import CurrencyConverter from "../components/inicio/CurrencyConverter";
import Clientes from "@/components/clientes/Clientes";
import Saldo from "@/components/saldo/Saldo";
import PrecioDolar from "@/components/precio-dolar/PrecioDolar";

export default function Inicio() {
  const { profileData } = useUserProfile();
  const userName = profileData ? profileData.Nombre : "Usuario";
  const [showBalances, setShowBalances] = useState(true);

  const toggleBalancesVisibility = () => setShowBalances((prev) => !prev);

  return (
    <div className="p-4 space-y-6 p-8 mt-28">
      <h1 className="font-bold text-center text-3xl">Bienvenido, {userName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Clientes />
        <Saldo />
      </div>
      <AccountsSection
        showBalances={showBalances}
        toggleBalancesVisibility={toggleBalancesVisibility}
      />
      <TransactionsSection />
      <PromotionsSection />
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
