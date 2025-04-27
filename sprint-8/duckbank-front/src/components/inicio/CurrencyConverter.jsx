"use client";

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

  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);
  const handleToCurrencyChange = (e) => setToCurrency(e.target.value);
  const handleAmountChange = (e) => setInputAmount(e.target.value);

  const handleConvert = () => {
    if (inputAmount && conversionRate) {
      setConvertedAmount((inputAmount * conversionRate).toFixed(2));
    } else {
      setErrorMessage("Ingrese un monto válido.");
    }
  };

  return (
    <div className="h-full min-h-[400px] w-full rounded-2xl bg-white p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <LuBadgeDollarSign size={32} className="text-[#4e2d1e]" />
          <h2 className="text-2xl font-bold">Conversor de monedas</h2>
        </div>
        <p className="text-gray-600 mb-6">Convertí de manera rápida</p>

        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <select
            className="bg-white border rounded-xl p-2 w-full mb-4 md:mb-0 md:w-1/2"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

          <select
            className="bg-white border rounded-xl p-2 w-full md:w-1/2"
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
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Monto a convertir:
        </label>

        <div className="flex flex-col md:flex-row md:space-x-4 items-center mb-6">
          <input
            id="conversion-input"
            type="number"
            value={inputAmount === 0 ? "" : inputAmount}
            onChange={handleAmountChange}
            className="border rounded-2xl px-4 py-2 w-full mb-4 md:mb-0 md:w-2/3"
            placeholder="Ingrese un monto."
          />
          <button
            onClick={handleConvert}
            className="text-white w-full md:w-1/3 px-6 py-3 rounded-full bg-[#4e2d1e] hover:bg-[#3f2518] transition duration-300"
          >
            Convertir
          </button>
        </div>

        {errorMessage && (
          <p className="text-center font-bold text-[#e63946] mb-4">
            {errorMessage}
          </p>
        )}

        {conversionRate && (
          <p className="text-center text-gray-700 mb-2">
            Tasa de cambio: 1 {fromCurrency} = {conversionRate.toFixed(4)}{" "}
            {toCurrency}
          </p>
        )}

        {convertedAmount && (
          <p className="text-center font-bold text-[#52b788]">
            {inputAmount} {fromCurrency} equivale a {convertedAmount}{" "}
            {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
}
