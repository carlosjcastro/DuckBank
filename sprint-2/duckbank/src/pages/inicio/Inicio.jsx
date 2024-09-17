import { useEffect, useState } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { RiDiscountPercentLine } from "react-icons/ri";
import { LuBadgeDollarSign, LuBanknote } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import PrecioDolar from "./PrecioDolar/PrecioDolar";

const Inicio = () => {

  const accounts = [
    { id: 1, name: 'Cuenta Principal', balance: 285547, currency: 'ARS', icon: <LuBanknote size={24} className="inline mr-2" /> },
    { id: 2, name: 'Caja de Ahorros', balance: 899504, currency: 'ARS', icon: <LuBanknote size={24} className="inline mr-2" /> },
    { id: 3, name: 'Cuenta Dólares', balance: 28039, currency: 'USD', icon: <FaDollarSign size={24} className="inline mr-2" /> },
  ];

  const transactions = [
    { id: 1, merchant: 'Uber', date: '2 sept. 10:26', amount: -3500 },
    { id: 2, merchant: 'Mostaza', date: '26 agosto. 20:44', amount: -8500 },
    { id: 3, merchant: 'PedidosYa', date: '18 agosto. 21:10', amount: -5450 },
    { id: 4, merchant: 'Mostaza', date: '10 agosto. 22:08', amount: -9800 },
    { id: 5, merchant: 'Café Martínez', date: '02 agosto. 9:24', amount: -6480 },
    { id: 6, merchant: 'Starbucks', date: '01 agosto. 18:56', amount: -7585 },
  ];

  const promotions = [
    { id: 1, title: '50% en Uber', discount: '50%', logo: '/src/assets/pages/inicio/uber.webp', expiry: '18 septiembre 2024' },
    { id: 2, title: '40% en McDonald\'s', discount: '40%', logo: '/src/assets/pages/inicio/mcdonals.png', expiry: '20 octubre 2024' },
    { id: 3, title: '30% en ChangoMás', discount: '30%', logo: '/src/assets/pages/inicio/changomas.webp', expiry: '26 noviembre 2024' },
    { id: 4, title: '20% en Cinemacenter', discount: '20%', logo: '/src/assets/pages/inicio/cinemacenter.png', expiry: '8 diciembre 2024' },
    { id: 5, title: '15% en Easy', discount: '15%', logo: '/src/assets/pages/inicio/easy.png', expiry: '15 diciembre 2024' },
    { id: 6, title: '35% en PedidosYa', discount: '35%', logo: '/src/assets/pages/inicio/pedidosya.png', expiry: '20 diciembre 2024' },
    { id: 7, title: '15% en Musimundo', discount: '15%', logo: '/src/assets/pages/inicio/musimundo.webp', expiry: '29 diciembre 2024' },
    { id: 8, title: '25% en Rappi', discount: '25%', logo: '/src/assets/pages/inicio/rappi.jpg', expiry: '31 diciembre 2024' },
  ];

  const [fromCurrency, setFromCurrency] = useState("ARS");
  const [toCurrency, setToCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [showConvertedAmount, setShowConvertedAmount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showBalances, setShowBalances] = useState(true);

  const toggleBalancesVisibility = () => {
    setShowBalances(!showBalances);
  };

  const fetchConversionRate = async () => {
    try {
      const response = await axios.get(
        ` https://api.exchangerate-api.com/v4/latest/${fromCurrency} `
      );
      setConversionRate(response.data.rates[toCurrency]);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Error al obtener la tasa de cambio. Por favor, intentálo de nuevo más tarde."
      );
      console.error("Error al obtener el tipo de cambio:", error);
    }
  };

  const formatCurrency = (value, currency) => {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    });
  };

  useEffect(() => {
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
    const newValue = e.target.value.replace(/[^0-9.]/g, '');
    setInputAmount(newValue); 
    }
  

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const currencies = ["ARS", "EUR", "USD"];

  return (
    <div className="p-4 space-y-6 p-8">
      {/* Saldo de Cuentas */}
      <div className="flex justify-between items-center mt-2">
        <h2 className="text-2xl font-bold">Cuentas</h2>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={toggleBalancesVisibility}
        >
          {showBalances ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="p-4 rounded-2xl shadow-lg hover:bg-[#f3c677]"
          >
            <h3 className="text-lg font-semibold">
              {account.icon}
              {account.name}
            </h3>
            <p className="text-2xl font-bold mt-2">
              {showBalances
                ? `${formatCurrency(account.balance, account.currency)} ${account.currency}`
                : '***'}
            </p>
          </div>
        ))}
      </div>
      
      {/* Movimientos */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
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
              <p className="font-bold text-lg">{transaction.amount} ARS</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Promociones y Descuentos */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <RiDiscountPercentLine size={40} className="m-2" />
        <h2 className="text-xl font-bold mb-4">Promociones y Descuentos</h2>
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-4">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="p-4 w-60 mb-4 flex-none rounded-2xl shadow-md bg-indigo-100 flex flex-col items-center hover:bg-indigo-200"
              >
                <img
                  src={promo.logo}
                  alt={promo.title}
                  className="w-16 h-16 mb-2"
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
        <div className= "rounded-2xl shadow-lg p-4 w-full md:w-1/2">
          <LuBadgeDollarSign size={40} className="m-2" />
          <h2 className="text-xl font-bold">Conversor de monedas</h2>
          <p className="mb-4">Convertí de manera rápida</p>

          <div className="flex justify-between items-center mb-4">
            <select className= "bg-white" value={fromCurrency} onChange={handleFromCurrencyChange}>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            <select className= "bg-white"
              value={toCurrency}
              onChange={handleToCurrencyChange}>

              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center mb-4">
            <input
              type="number"
              value={inputAmount === 0 ? '' : inputAmount}
              onChange={handleAmountChange}
              className="border rounded-2xl px-3 py-2"
              placeholder = "Ingrese un monto para convertir."
            />

            <button
              onClick={handleConvert}
              className="text-white px-6 py-4 rounded-full bg-[#4e2d1e] hover:bg-[#3f2518]"
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
};

export default Inicio;