import { useEffect, useState } from 'react';
import Link from 'next/link';
import provinciasData from '../../../../public/data/sucursales/provincias.json';
import direccionesData from '../../../../public/data/sucursales/direcciones.json';

export default function SeleccionarHorario({ onNext, dni }) {
  const [provincias, setProvincias] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState('');
  const [direccion, setDireccion] = useState('');
  const [selectedHorario, setSelectedHorario] = useState('');

  useEffect(() => {
    setProvincias(provinciasData);
  }, []);

  const horarios = ["09:00", "10:00", "11:00", "12:00", "13:00"];

  const handleConfirm = () => {
    if (selectedProvincia && direccion && selectedHorario) {
      onNext({
        dni,
        provincia: selectedProvincia,
        direccion,
        horario: selectedHorario,
      });
    }
  };

  useEffect(() => {
    if (selectedProvincia) {
      const sucursal = direccionesData[selectedProvincia];
      setDireccion(sucursal || '');
    } else {
      setDireccion('');
    }
  }, [selectedProvincia]);

  return (
    <div className="container mx-auto p-8 mt-10 max-w-2xl bg-white rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">Ahora podés resolver tu consulta de forma más ágil</h2>
      <p className="text-center mb-4">Estamos disponibles todos los días, las 24 horas:</p>
      <ul className="list-disc list-inside space-y-2">
        <li>Resolvelo por WhatsApp</li>
        <li>Hablar con una persona: 0800-333-3333</li>
        <li>Si preferís visitarnos: Encontrá una <Link href="/sucursales" className="font-bold">sucursal</Link> DuckBank</li>
      </ul>

      <div className="mt-8">
        <label className="block mb-2">Seleccioná tu provincia:</label>
        <select 
          className="border p-2 rounded-2xl w-full"
          value={selectedProvincia}
          onChange={(e) => setSelectedProvincia(e.target.value)}
        >
          <option value="">-- Seleccionar provincia --</option>
          {provincias.map((provincia) => (
            <option key={provincia.value} value={provincia.value}>
              {provincia.label}
            </option>
          ))}
        </select>
      </div>

      {selectedProvincia && (
        <div className="mt-4">
          <label className="block mb-2">Sucursal:</label>
          <p className="border p-2 rounded-2xl">{direccion}</p>
        </div>
      )}

      {selectedProvincia && (
        <div className="mt-8">
          <label className="block mb-2">Seleccioná un horario:</label>
          <select 
            className="border p-2 rounded-2xl w-full"
            value={selectedHorario}
            onChange={(e) => setSelectedHorario(e.target.value)}
          >
            <option value="">-- Seleccionar horario --</option>
            {horarios.map((horario, index) => (
              <option key={index} value={horario}>
                {horario}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedHorario && (
        <div className="mt-8">
          <button 
            className="w-full py-3 px-4 bg-[#4e2d1e] text-white font-semibold rounded-full hover:bg-[#3f2518] transition duration-300"
            onClick={handleConfirm}
          >
            Confirmar Turno
          </button>
        </div>
      )}
    </div>
  );
}
