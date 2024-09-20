"use client";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect, useCallback, useContext, useMemo } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { RiDiscountPercentLine } from "react-icons/ri";
import { LuBadgeDollarSign, LuBanknote } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PrecioDolar from "../components/precio-dolar/PrecioDolar";
import { useUserProfile } from "../components/context/UserProfileContext";

export default function Inicio() {
  const accounts = [
    {
      id: 1,
      name: "Caja de ahorros",
      balance: 285547,
      currency: "ARS",
      icon: <LuBanknote size={24} className="inline mr-2" />,
    },
    {
      id: 2,
      name: "Cuenta corriente",
      balance: 899504,
      currency: "ARS",
      icon: <LuBanknote size={24} className="inline mr-2" />,
    },
    {
      id: 3,
      name: "Cuenta Dólares",
      balance: 28039,
      currency: "USD",
      icon: <FaDollarSign size={24} className="inline mr-2" />,
    },
  ];

  const transactions = [
    { id: 1, merchant: "Uber", date: "2 sept. 10:26", amount: -3500 },
    { id: 2, merchant: "Mostaza", date: "26 agosto. 20:44", amount: -8500 },
    { id: 3, merchant: "PedidosYa", date: "18 agosto. 21:10", amount: -5450 },
    { id: 4, merchant: "Mostaza", date: "10 agosto. 22:08", amount: -9800 },
    {
      id: 5,
      merchant: "Café Martínez",
      date: "02 agosto. 9:24",
      amount: -6480,
    },
    { id: 6, merchant: "Starbucks", date: "01 agosto. 18:56", amount: -7585 },
  ];

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
      logo: "/assets/pages/inicio/mcdonalds.png",
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

  const [fromCurrency, setFromCurrency] = useState("ARS");
  const [toCurrency, setToCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [showConvertedAmount, setShowConvertedAmount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { profileData } = useUserProfile(); 
  const userName = profileData ? profileData.Nombre : "Usuario";

  const [showBalances, setShowBalances] = useState(true);

  const toggleBalancesVisibility = useCallback(() => {
    setShowBalances((prev) => !prev);
  }, []);

  useEffect(() => {
    const fetchConversionRate = async () => {
      const storedRate = localStorage.getItem(
        `${fromCurrency}_${toCurrency}_rate`
      );
      if (storedRate) {
        setConversionRate(JSON.parse(storedRate));
      } else {
        try {
          const response = await axios.get(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
          );
          const rate = response.data.rates[toCurrency];
          localStorage.setItem(
            `${fromCurrency}-${toCurrency}_rate`,
            JSON.stringify(rate)
          );
          setConversionRate(rate);
          setErrorMessage("");
        } catch (error) {
          setErrorMessage(
            "Error al obtener la tasa de cambio. Por favor, intentálo de nuevo más tarde."
          );
        }
      }
    };
    fetchConversionRate();
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    if (!inputAmount || isNaN(inputAmount) || inputAmount <= 0) {
      setErrorMessage("Por favor, ingresá un valor para convertir.");
      setShowConvertedAmount(false);
      return;
    }

    if (conversionRate > 0) {
      setAmount(inputAmount);
      setConvertedAmount(inputAmount * conversionRate);
      setShowConvertedAmount(true);
      setErrorMessage("");
    } else {
      setConvertedAmount(0);
      setShowConvertedAmount(false);
      setErrorMessage("La conversión no se pudo realizar.");
    }
  };

  const handleAmountChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9.]/g, "");
    if (Number(newValue) >= 0) setInputAmount(newValue);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const currencies = ["ARS", "EUR", "USD"];

  const formatCurrency = useMemo(
    () => (value, currency) => {
      if (typeof value !== "number" || isNaN(value)) {
        console.error("El valor debe ser un número");
        return "";
      }
      if (typeof currency !== "string" || !currency) {
        console.error("El cambio debe ser una cadena de texto");
        return "";
      }
      return value.toLocaleString("es-AR", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
      });
    },
    []
  );

  return (
    <div className="p-4 space-y-6 p-8 mt-28">
      <h1 className="font-bold text-center text-3xl">
        Bienvenido, {userName}
      </h1>

      {/* Saldo de Cuentas */}
      <section aria-labelledby="cuentas-title">
        <div className="flex justify-between items-center mt-2">
          <h2 id="cuentas-title" className="text-2xl font-bold">
            Cuentas
          </h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={toggleBalancesVisibility}
            aria-label={showBalances ? "Ocultar balances" : "Mostrar balances"}
          >
            {showBalances ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((accounts) => (
          <div
            key={accounts.id}
            className="p-4 rounded-2xl bg-white hover:bg-gray-200 transition duration-300"
          >
            <h3 className="text-lg font-semibold">
              <span role="img" aria-label={`${accounts.name} icon `}>
                {accounts.icon}{" "}
              </span>
              {accounts.name}
            </h3>

            <p className="text-2xl font-bold mt-2">
              {showBalances
                ? `${formatCurrency(accounts.balance, accounts.currency)} ${
                    accounts.currency
                  }`
                : "***"}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((accounts) => (
          <div key={accounts.id}>{/* ... detalles de la cuenta */}</div>
        ))}
      </div>

      {/* Movimientos */}
      <div className="bg-white rounded-2xl p-4">
        <LiaExchangeAltSolid size={35} className="m-2" />
        <h2 className="text-xl font-bold mb-4">Movimientos Recientes</h2>
        <ul>
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <div>
                <p className="font-semibold">{transaction.merchant}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <p className="font-bold text-lg text-[#e63949]">{transaction.amount} ARS</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Promociones y Descuentos */}
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
                  placeholder="blur"
                  blurDataURL={promo.logo}
                />

                <h3 className="text-lg font-semibold">{promo.title}</h3>
                <p className="text-xl font-bold mt-2">{promo.discount}</p>
                <p className="text-sm text-[#e63949] mt-2">
                  Expira: {promo.expiry}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversor de moneda */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="rounded-2xl bg-white p-4 w-full md:w-1/2">
          <LuBadgeDollarSign size={40} className="m-2" />
          <h2 className="text-xl font-bold">Conversor de monedas</h2>
          <p className="mb-4">Convertí de manera rápida</p>

          <div className="flex justify-between items-center mb-4">
            <select
              className="bg-white"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            <select
              className="bg-white"
              value={toCurrency}
              onChange={handleToCurrencyChange}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <label
            htmlFor="conversion-input"
            className="block text-sm font-medium text-gray-700"
          >
            Monto a convertir:
          </label>
          <div className="flex justify-between items-center mb-4">
            <input
              id="conversion-input"
              type="number"
              value={inputAmount === 0 ? "" : inputAmount}
              onChange={handleAmountChange}
              className="border rounded-2xl px-3 py-2"
              placeholder="Ingrese un monto para convertir."
            />

            <button
              onClick={handleConvert}
              className="text-white px-6 py-4 rounded-full bg-[#4e2d1e] hover:bg-[#3f2518] transition duration-300"
            >
              Convertir
            </button>
          </div>

          {errorMessage && (
            <p className="font-bold text-[#e63946]">{errorMessage}</p>
          )}

          {conversionRate ? (
            <p>
              Tasa de cambio: 1 {fromCurrency} = {conversionRate.toFixed(4)}{" "}
              {toCurrency}
            </p>
          ) : (
            <p>Cargando tasa de cambio...</p>
          )}

          {showConvertedAmount && (
            <p className="font-bold text-[#52b788]">
              {amount} {fromCurrency} equivale a {convertedAmount.toFixed(2)}{" "}
              {toCurrency}
            </p>
          )}
        </div>

        <div className="w-full md:w-1/2">
          <PrecioDolar />
        </div>
      </div>
    </div>
  );
}
