import React, { useState, useEffect } from "react";
import { LuBadgeDollarSign } from "react-icons/lu";
import axios from "axios";

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("ARS");
  const [toCurrency, setToCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => {
        setConversionRate(response.data.rates[toCurrency]);
        setErrorMessage("");
      })
      .catch(() => setErrorMessage("Error al obtener la tasa de cambio."));
  }, [fromCurrency, toCurrency]);

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setInputAmount(e.target.value);
  };

  const handleConvert = () => {
    if (inputAmount && conversionRate) {
      setConvertedAmount((inputAmount * conversionRate).toFixed(2));
    } else {
      setErrorMessage("Ingrese un monto válido.");
    }
  };

  return (
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
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

          <select
            className="bg-white"
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
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

        {convertedAmount && (
          <p className="font-bold text-[#52b788]">
            {inputAmount} {fromCurrency} equivale a {convertedAmount}{" "}
            {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
}
