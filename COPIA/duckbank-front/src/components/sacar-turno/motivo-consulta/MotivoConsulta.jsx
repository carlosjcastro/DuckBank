import { useState } from 'react';
import Link from 'next/link';
import { IoMdClose } from "react-icons/io";

export default function MotivoConsulta({ onNext }) {
  const [selectedMotivo, setSelectedMotivo] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoContent, setInfoContent] = useState(null);
  const [error, setError] = useState('');

  const handleButtonClick = (motivo) => {
    setSelectedMotivo(motivo);
    if (motivo === 'Extracciones y depósitos') {
      setShowOptions(true);
    } else {
      setShowOptions(false);
      setShowInfo(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowInfo(true);

    switch (option) {
      case 'Sin tarjeta de débito':
        setInfoContent(
          <p>Con esta opción, podrás realizar extracciones más rápido sin necesidad de una tarjeta de débito. Ideal para quienes prefieren un proceso sin contacto.</p>
        );
        break;
      case 'Con tarjeta de débito':
        setInfoContent(
          <p>Utilizando tu tarjeta de débito, podes acceder a cajeros automáticos para realizar extracciones. Es conveniente y accesible.</p>
        );
        break;
      case 'Por Terminales de Autoservicio Duck':
        setInfoContent(
          <p>Esta opción te permite realizar depósitos rápidamente en terminales autoservicio de DuckBank. Recomendado para mayor rapidez.</p>
        );
        break;
      case 'Por Pago Fácil':
        setInfoContent(
          <p>A través de Pago Fácil, podes hacer depósitos de manera sencilla en diferentes puntos de pago. Es una opción práctica.</p>
        );
        break;
      case 'Sucursal DuckBank':
        setInfoContent(
          <div>
            <p>Encontrá una sucursal de DuckBank para recibir asistencia personalizada o realizar transacciones en persona.</p>
            <p>
              Visitá nuestras <Link href="/sucursales" className='text-[#4e2d1e] font-bold'>Sucursales</Link>.
            </p>
          </div>
        );
        break;
      default:
        setInfoContent(null);
    }
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMotivo) {
      onNext();
    } else {
      setError('Por favor, seleccioná un motivo.');
    }
  };

  return (
    <div className="relative container mx-auto p-8 mt-10 max-w-2xl bg-white rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">Seleccioná el motivo de tu consulta</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <div className="flex flex-col gap-4 w-full">
          <button
            type="button"
            onClick={() => handleButtonClick('Consulta comercial')}
            className={`w-full py-3 px-4 border rounded-full text-center ${selectedMotivo === 'Consulta comercial' ? 'bg-[#f3c677] text-black' : 'bg-white text-gray-700 border-gray-300'} hover:bg-[#f3c677] hover:text-black transition duration-300`}
          >
            Consulta comercial
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick('Extracciones y depósitos')}
            className={`w-full py-3 px-4 border rounded-full text-center ${selectedMotivo === 'Extracciones y depósitos' ? 'bg-[#f3c677] text-black' : 'bg-white text-gray-700 border-gray-300'} hover:bg-[#f3c677] hover:text-black transition duration-300`}
          >
            Extracciones y depósitos
          </button>
        </div>

        {showOptions && (
          <div className="mt-6 w-full">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Descubrí las opciones que tenés para extraer más rápido:</h3>
                <button
                  type="button"
                  onClick={() => handleOptionClick('Sin tarjeta de débito')}
                  className="py-2 px-4 border mt-2 rounded-full bg-white text-gray-700 border-gray-300 hover:bg-[#f3c677] hover:text-black transition duration-300 w-full text-left"
                >
                  Sin tarjeta de débito (Recomendado)
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionClick('Con tarjeta de débito')}
                  className="py-2 px-4 border mt-2 rounded-full bg-white text-gray-700 border-gray-300 hover:bg-[#f3c677] hover:text-black transition duration-300 w-full text-left"
                >
                  Con tarjeta de débito
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Descubrí las opciones que tenés para depositar más rápido:</h3>
                <button
                  type="button"
                  onClick={() => handleOptionClick('Por Terminales de Autoservicio Duck')}
                  className="py-2 px-4 border mt-2 rounded-full bg-white text-gray-700 border-gray-300 hover:bg-[#f3c677] hover:text-black transition duration-300 w-full text-left"
                >
                  Por Terminales de Autoservicio Duck (Recomendado)
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionClick('Por Pago Fácil')}
                  className="py-2 px-4 border mt-2 rounded-full bg-white text-gray-700 border-gray-300 hover:bg-[#f3c677] hover:text-black transition duration-300 w-full text-left"
                >
                  Por Pago Fácil
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Si preferís visitarnos:</h3>
                <button
                  type="button"
                  onClick={() => handleOptionClick('Sucursal DuckBank')}
                  className="py-2 px-4 border mt-2 rounded-full bg-white text-gray-700 border-gray-300 hover:bg-[#f3c677] hover:text-black transition duration-300 w-full text-left"
                >
                  Encontrá una sucursal DuckBank
                </button>
              </div>
            </div>
          </div>
        )}

        {showInfo && (
          <div className="fixed top-0 right-0 w-64 h-full bg-white rounded-l-2xl shadow-lg p-4 transition-transform duration-300 transform ${showInfo ? 'translate-x-0' : 'translate-x-full'} z-50">
            <button
              type="button"
              onClick={handleCloseInfo}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <IoMdClose size={25}/>
            </button>
            <h4 className="font-semibold mb-2">{selectedOption}</h4>
            <div>{infoContent}</div>
          </div>
        )}

        {error && <span className="text-red-500 text-sm">{error}</span>}
        <button type="submit" className="w-full py-3 px-4 bg-[#4e2d1e] text-white font-semibold rounded-full hover:bg-[#3f2518] transition duration-300">
          Siguiente
        </button>
      </form>
    </div>
  );
}
