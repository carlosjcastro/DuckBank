import Link from 'next/link';

export default function Servicios(){
    const servicios = [
        {id: 1, name: "EPE", amount: 20000, dueDate: "30/09/2024"},
        {id: 2, name: "PERSONAL", amount: 15000, dueDate: "18/09/2024"},
        {id: 3, name: "LITORAL GAS", amount: 10000, dueDate: "15/09/2024"},
        {id: 4, name: "ITBA", amount: 15000, dueDate: "20/09/2024"},
    ];
    return (
        <div className="container mx-auto p-8 bg-[#F5F5F5] rounded-2xl max-w-7xl mt-28">
          <h1 className="text-3xl font-bold mb-6 text-[#000000]">Pagos de servicios</h1>
          <ul>
            {servicios.map((servicios) => (
              <li key={servicios.id} className="mb-4 p-4 bg-white rounded-2xl hover:bg-[#f3c677] transition duration-300">
                <Link href={`/servicios/${servicios.id}`} className='text-[#000000]'>
                    {servicios.name} - Vence: {servicios.dueDate} - Monto: {servicios.amount} ARS
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }