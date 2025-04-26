'use client'
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Transferencia() {
  const [receiverAlias, setReceiverAlias] = useState('');
  const [receiverCbu, setReceiverCbu] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [transferDetails, setTransferDetails] = useState(null);

  const formatAmount = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value) {
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    setAmount(value);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();

    const amountValue = amount.replace(/\./g, '');

    if (!receiverAlias && !receiverCbu) {
      setError('Ingresá el Alias o un CBU de la persona a la que deseas transferir.');
      return;
    }

    if (!amountValue || isNaN(amountValue) || parseFloat(amountValue) <= 0) {
      setError('Por favor, ingresá un monto válido para la transferencia.');
      return;
    }

    const transferData = {
      receiver_alias: receiverAlias || null,
      receiver_cbu: receiverCbu || null,
      amount: amountValue.toString(),
      description: description || '',
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `https://web-production-b8a3.up.railway.app/api/transferir/`,
        transferData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage('Transferencia realizada con éxito.');
      setTransferDetails({
        amount: formatAmount(amountValue),
        receiver: receiverAlias || receiverCbu,
        description,
      });

      setReceiverAlias('');
      setReceiverCbu('');
      setAmount('');
      setDescription('');
      setError('');
    } catch (error) {
      setError(error.response?.data?.detail || 'Hubo un error al realizar la transferencia');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Realizar Transferencia</h2>

        {error && (
          <div className="mb-4 text-[#e63946] p-2">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 text-[#52b788] p-2">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleTransfer} className="space-y-4">
          <div>
            <label htmlFor="receiverAlias" className="block text-sm font-medium text-gray-700">
              Alias del receptor (Opcional)
            </label>
            <input
              type="text"
              id="receiverAlias"
              value={receiverAlias}
              onChange={(e) => setReceiverAlias(e.target.value)}
              className="mt-1 block w-full px-4 py-2 mt-1 block w-full rounded-2xl px-4 py-2 border border-gray-300 focus:ring-[#4e2d1e]"
              placeholder="Ej: USER123456"
            />
          </div>

          <div>
            <label htmlFor="receiverCbu" className="block text-sm font-medium text-gray-700">
              CBU del receptor (Opcional)
            </label>
            <input
              type="text"
              id="receiverCbu"
              value={receiverCbu}
              onChange={(e) => setReceiverCbu(e.target.value)}
              className="mt-1 block w-full px-4 py-2 mt-1 block w-full rounded-2xl px-4 py-2 border border-gray-300 focus:ring-[#4e2d1e]"
              placeholder="Ej: 1234567890123456789012"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Monto a transferir
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="mt-1 block w-full px-4 py-2 mt-1 block w-full rounded-2xl px-4 py-2 border border-gray-300 focus:ring-[#4e2d1e]"
              placeholder="Monto en ARS"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 mt-1 block w-full rounded-2xl px-4 py-2 border border-gray-300 focus:ring-[#4e2d1e]"
              placeholder="Opcional"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-[#4e2d1e] text-white py-2 rounded-full hover:bg-[#3f2518] transition duration-300"
            >
              Realizar Transferencia
            </button>
          </div>
        </form>

        {/* Mostrar detalles de la transferencia */}
        {transferDetails && (
          <div className="mt-6 text-center p-4 bg-gray-100 rounded-2xl">
            <p><strong>Transferencia realizada:</strong></p>
            <p>Monto transferido: {transferDetails.amount}</p>
            <p>Receptor: {transferDetails.receiver}</p>
            {transferDetails.description && <p>Descripción: {transferDetails.description}</p>}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="block">Revisá tus transferencias en <Link href="/mis-transferencias" className="font-bold">Mis Transferencias</Link></p>
      </div>
    </div>
  );
}
