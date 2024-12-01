import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuBanknote } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";

const accounts = [
  { id: 1, name: "Caja de ahorros", balance: 285547, currency: "ARS", icon: <LuBanknote size={24} className="inline mr-2" /> },
  { id: 2, name: "Cuenta corriente", balance: 899504, currency: "ARS", icon: <LuBanknote size={24} className="inline mr-2" /> },
  { id: 3, name: "Cuenta Dólares", balance: 28039, currency: "USD", icon: <FaDollarSign size={24} className="inline mr-2" /> },
];

const formatCurrency = (value, currency) => {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });
};

export default function AccountsSection({ showBalances, toggleBalancesVisibility }) {
  return (
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div key={account.id} className="p-4 rounded-2xl bg-white hover:bg-gray-200 transition duration-300">
            <h3 className="text-lg font-semibold">
              {account.icon} {account.name}
            </h3>
            <p className="text-2xl font-bold mt-2">
              {showBalances
                ? `${formatCurrency(account.balance, account.currency)} ${account.currency}`
                : "***"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
