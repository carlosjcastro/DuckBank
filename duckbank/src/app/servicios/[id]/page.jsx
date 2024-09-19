"use client"; // Marcar el componente como Client Component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Cambiamos useRouter por useParams

const serviciosData = [
  { id: 1, name: "EPE", amount: 20000, dueDate: "30/09/2024" },
  { id: 2, name: "PERSONAL", amount: 15000, dueDate: "18/09/2024" },
  { id: 3, name: "LITORAL GAS", amount: 10000, dueDate: "15/09/2024" }
];

export default function ServiciosDetail() {
  const { id } = useParams(); // Obtenemos el id desde useParams
  const [servicio, setServicio] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (id) {
      const selectedServicio = serviciosData.find((fact) => fact.id === parseInt(id, 10)); // Cambié servicio por serviciosData
      setServicio(selectedServicio);
    }

    // Cargar cuentas desde localStorage
    const savedAccounts = localStorage.getItem('accounts');
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    }
  }, [id]);

  const handlePayment = () => {
    if (!selectedAccountId) {
      alert("Selecciona una cuenta para realizar el pago.");
      return;
    }

    const selectedAccount = accounts.find((acc) => acc.id === parseInt(selectedAccountId, 10));
    if (selectedAccount.balance < servicio.amount) {
      alert("Saldo insuficiente para realizar el pago.");
      return;
    }

    // Reducir el saldo de la cuenta seleccionada
    const updatedAccounts = accounts.map((acc) =>
      acc.id === parseInt(selectedAccountId, 10)
        ? { ...acc, balance: acc.balance - servicio.amount }
        : acc
    );

    setAccounts(updatedAccounts);
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));

    alert(`Pagaste ${servicio.name} por ${servicio.amount} ARS desde ${selectedAccount.name}`);
  };

  if (!servicio) return <p>Cargando servicio...</p>;

  return (
    <div className="container mx-auto p-8 bg-[#F5F5F5] rounded-xl shadow-2xl max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-[#143D60]">Detalles de la Factura</h1>
      <p className="mb-2"><strong>Factura:</strong> {servicio.name}</p>
      <p className="mb-2"><strong>Monto:</strong> {servicio.amount} ARS</p>
      <p className="mb-4"><strong>Fecha de Vencimiento:</strong> {servicio.dueDate}</p>

      {/* Selección de cuenta */}
      <div className="mb-6">
        <label htmlFor="accountSelect" className="block mb-2 text-[#143D60]">Selecciona una cuenta para pagar:</label>
        <select
          id="accountSelect"
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="border rounded p-2 w-full bg-white text-[#143D60] border-[#BCBDC0]"
        >
          <option value="">Selecciona una cuenta</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} - Saldo: {account.balance} ARS
            </option>
          ))}
        </select>
      </div>

      <button onClick={handlePayment} className="bg-[#9DAB70] text-white py-2 px-4 rounded hover:bg-[#7A8B50] transition duration-300">
        Pagar servicio
      </button>
    </div>
  );
}