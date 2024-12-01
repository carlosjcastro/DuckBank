import { LiaExchangeAltSolid } from "react-icons/lia";

const transactions = [
  { id: 1, merchant: "Uber", date: "2 sept. 10:26", amount: -3500 },
  { id: 2, merchant: "Mostaza", date: "26 agosto. 20:44", amount: -8500 },
  { id: 3, merchant: "PedidosYa", date: "18 agosto. 21:10", amount: -5450 },
  { id: 4, merchant: "Mostaza", date: "10 agosto. 22:08", amount: -9800 },
  { id: 5, merchant: "Café Martínez", date: "02 agosto. 9:24", amount: -6480,},
  { id: 6, merchant: "Starbucks", date: "01 agosto. 18:56", amount: -7585 },
];

export default function TransactionsSection() {
  return (
    <div className="bg-white rounded-2xl p-4">
      <LiaExchangeAltSolid size={35} className="m-2" />
      <h2 className="text-xl font-bold mb-4">Movimientos Recientes</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-200">
            <div>
              <p className="font-semibold">{transaction.merchant}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
            <p className="font-bold text-lg text-[#e63949]">{transaction.amount} ARS</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
