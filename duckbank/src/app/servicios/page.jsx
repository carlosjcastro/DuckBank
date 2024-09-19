import Link from 'next/link';

export default function Servicios(){
    const servicios = [
        {id: 1, name: "EPE", amount: 20000, dueDate: "30/09/2024"},
        {id: 2, name: "PERSONAL", amount: 15000, dueDate: "18/09/2024"},
        {id: 3, name: "LITORAL GAS", amount: 10000, dueDate: "15/09/2024"}
    ];
    return (
        <div className="container mx-auto p-8 bg-[#F5F5F5] rounded-xl shadow-2xl max-w-7xl">
          <h1 className="text-3xl font-bold mb-6 text-[#143D60]">Pagos de servicios</h1>
          <ul>
            {servicios.map((servicios) => (
              <li key={servicios.id} className="mb-4 p-4 bg-white rounded-lg shadow-md hover:bg-[#9DAB70] transition duration-300">
                <Link href={`/servicios/${servicios.id}`} className="text-[#143D60] hover:underline">
                    {servicios.name} - Vence: {servicios.dueDate} - Monto: {servicios.amount} ARS
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }
