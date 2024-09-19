'use client'
import Image from 'next/image';
import Inversion from '../../public/assets/pages/inversiones/graph.svg';
import ModalInversiones from '@/app/inversiones/modalinversiones/modalinversiones';
import {useState, useEffect} from 'react';
import { INVERSION, LOGO } from '/public/assets/global.jsx';

  export default function Inversiones(){
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedInvestment, setSelectedInvestment] = useState("");
    const [investmentType, setInvestmentType] = useState("");
    const [investmentAmount, setInvestmentAmount] = useState("");
    const [investmentTermParsed, setInvestmentTermParsed] = useState("");
    const [investments, setInvestments] = useState([]);
    const [investmentToDelete, setInvestmentToDelete] = useState(null);
    const [investmentTerm, setInvestmentTerm] = useState("");

    useEffect(() => {
        const savedInvestments =
            JSON.parse(localStorage.getItem("investments")) || [];
        setInvestments(savedInvestments);
      }, []);
    
      const resetModal = () => {
        setStep(1);
        setSelectedInvestment("");
        setInvestmentType("");
        setInvestmentAmount("");
        setInvestmentTermParsed("");
      };
    
      const saveInvestment = () => {
        const today = new Date();
        const endDate = new Date();
        const parsedTerm = parseInt(investmentTerm);

        if (isNaN(parsedTerm)){
          console.error("Invalido");
          return;
        }

        endDate.setDate(today.getDay() + parsedTerm);

        if (isNaN(today) || isNaN(endDate)) {
          console.error("Fecha inválida");
          return;
        }

        const amount = parseFloat(investmentAmount);
        if(isNaN(amount)){
          console.error("Monto inválido");
          return;
        }
      
    
        const newInvestment = {
          type: selectedInvestment,
          subType: investmentType,
          amount: amount.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 0,
          }),
          term: investmentTermParsed,
          startDate: today.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        };
    
        const updatedInvestments = [...investments, newInvestment];
        setInvestments(updatedInvestments);
        localStorage.setItem("investments", JSON.stringify(updatedInvestments));
        setModalOpen(false);
        resetModal();
      };
    
      const getInvestmentStatus = (endDate) => {
        const today = new Date();
        return new Date(endDate) > today ? "Activa" : "Finalizada";
      };
    
      const deleteInvestment = () => {
        const updatedInvestments = investments.filter(
          (_, index) => index !== investmentToDelete
        );
        setInvestments(updatedInvestments);
        localStorage.setItem("investments", JSON.stringify(updatedInvestments));
        setConfirmModalOpen(false);
        setInvestmentToDelete(null);
      };
    
      const canCreateInvestment = investments.length < 5;

    return (
        <>        
            <div className="p-6">
              {/* Hero/Header */}
              <header className="text-center p-2 sm:p-4 bg-[#463f3a] rounded-2xl mt-14 sm:mt-8">
                <Image
                  className="sm:w-30 sm:h-20 flex justify-center mx-auto"
                  src={INVERSION}
                  width={60}
                  height={60}
                  alt="Ícono de inversiones"
                  loading = 'lazy'
                />
                <h1 className="text-2xl sm:text-3xl text-[#ffffff] font-bold mt-2 ">
                  Inversiones
                </h1>
                <p className="text-lg sm:text-base text-[#ffffff] mt-4">
                  Explora y gestiona tus opciones de inversión.
                </p>
              </header>

              {/* Sección de Informacion */}
              <section className=" p-6 rounded-2xl mt-8 mb-8 shadow-md">
                <Image
                  className="sm:w-30 sm:h-20 "
                  src={INVERSION}
                  alt="Ícono de inversiones"
                  width={50}
                  height={50}
                  loading = 'lazy'
                />
                  <p className="text-gray-700 text-justify mt-4">
                  Las inversiones te brindan una excelente oportunidad para generar
                  ingresos adicionales al colocar tu dinero en una variedad de
                  instrumentos financieros. Desde acciones y bonos hasta fondos mutuos y
                  bienes raíces, cada opción ofrece diferentes niveles de riesgo y
                  retorno. Es fundamental que evalúes cuidadosamente tus alternativas
                  para seleccionar la que mejor se alinee con tus objetivos financieros
                  y perfil de riesgo. Al invertir, puedes trabajar para aumentar tu
                  patrimonio, diversificar tus fuentes de ingreso y asegurar tu futuro
                  financiero. Tómate el tiempo para investigar, educarte y, si es
                  necesario, buscar el asesoramiento de expertos para tomar decisiones
                  informadas que te ayuden a alcanzar tus metas económicas.
                  </p>
                </section>

                {/* Sección de Inversiones Actuales */}
                <div className="bg-white p-4 rounded-2xl shadow-md">
                  <h2 className="text-2xl font-bold">Tus inversiones</h2>
                  {investments.length === 0 ? (
                    <p aria-live="polite">
                      No tienes inversiones en este momento. Creá una ahora para obtener
                      todos los beneficios de Duck Bank.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {investments.map((inv, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-2xl bg-gray-50 shadow-sm relative hover:bg-[#f4f4f4]"
                        >
                          <button
                            onClick={() => {
                              setInvestmentToDelete(index);
                              setConfirmModalOpen(true);
                            }}
                            className="absolute top-2 right-2 text-red-500 text-2xl hover:text-[#d13440]"
                          >
                            &times;
                          </button>
                          <h3 className="text-lg font-semibold">{inv.type}</h3>
                          <p>{inv.subType}</p>
                          <p>Monto: {inv.amount}</p>
                          <p>Plazo: {inv.term} días</p>
                          <p>Estado: {getInvestmentStatus(inv.endDate)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {canCreateInvestment ? (
                    <button
                      onClick={() => setModalOpen(true)}
                      className="text-white px-4 py-2 mt-4 rounded-full bg-[#4e2d1e] hover:bg-[#3f2518]"
                      aria-label="Crear una nueva inversión"
                    >
                      Crear nueva inversión
                    </button>
                  ) : (
                    <p className="mt-4 text-[#e63946]">
                      Ya alcanzaste el máximo de inversiones creadas. Cancelá una
                      inversión actual o espera hasta que finalice.
                    </p>
                  )}
                </div>
        
                {/* Modal para Inversiones */}
                {modalOpen && (
                  <ModalInversiones
                  onClose={() => {
                    setModalOpen(false);
                    resetModal();
                    }}
                  >
                  {step === 1 && (
                    <>
                      <h3 className="text-xl font-semibold mb-4">Elegí tu inversión</h3>
                      <div className="space-y-4">
                        <button
                          onClick={() => {
                            setSelectedInvestment("Plazo Fijo");
                            setStep(2);
                          }}
                          className="bg-gray-200 p-4 w-full text-left rounded-2xl hover:bg-gray-300"
                        >
                          Plazo Fijo <br />
                          <span className="text-sm">
                            El dinero queda quieto un tiempo, genera rendimientos y al
                            final cobrará lo invertido más los intereses.
                          </span>
                        </button>
                        <button
                          onClick={() => setSelectedInvestment("Fondo Fima")}
                          className="bg-gray-200 p-4 w-full text-left rounded-2xl hover:bg-gray-300"
                        >
                          Fondo Fima <br />
                          <span className="text-sm">
                            Son paquetes de inversión administrados por expertos.
                          </span>
                        </button>
                        <button
                          onClick={() => setSelectedInvestment("Dólar MEP")}
                          className="bg-gray-200 p-4 w-full text-left rounded-2xl hover:bg-gray-300"
                        >
                          Dólar MEP <br />
                          <span className="text-sm">
                            Con tu dinero, el banco compra y vende bonos para luego
                            entregarte el dinero en pesos o dólares.
                          </span>
                        </button>
                        <button 
                          onClick={() => setSelectedInvestment("Títulos")}
                          className="bg-gray-200 p-4 w-full text-left text-bold rounded-2xl hover:bg-gray-300"
                        >
                    Títulos <br />
                    <span className="text-sm">
                      Son instrumentos con los que podés obtener ganancias con sus
                      intereses o por el aumento del valor de la empresa.
                    </span>
                  </button>
                </div>
              </>
            )}

            {step === 2 && selectedInvestment === "Plazo Fijo" && (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  ¿Qué tipo de Plazo Fijo querés constituir?
                </h3>
                <div className="space-y-4">
                  <button
                    aria-label="Plazo fijo tradicional en pesos"
                    onClick={() => {
                      setInvestmentType("Tradicional en Pesos");
                      setStep(3);
                    }}
                    className="bg-gray-200 p-4 w-full text-left rounded-2xl hover:bg-gray-300"
                  >
                    Tradicional en Pesos
                  </button>
                  <button
                    aria-label="Plazo fijo tradicional en dólares"
                    onClick={() => {
                      setInvestmentType("Tradicional en Dólares");
                      setStep(3);
                    }}
                    className="bg-gray-200 p-4 w-full text-left rounded-2xl hover:bg-gray-300"
                  >
                    Tradicional en Dólares
                  </button>
                  <button
                    aria-label="Plazo fijo precancelable UVA en pesos"
                    onClick={() => {
                      setInvestmentType("Precancelable UVA en Pesos");
                      setStep(3);
                    }}
                    className="bg-gray-200 p-4 w-full text-left rounded-2xl hover:bg-gray-300"
                  >
                    Precancelable UVA en Pesos
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Ingresá el monto a invertir
                </h3>
                <input
                  type="number"
                  placeholder="Mínimo $100"
                  className="p-2 border rounded w-full mb-4"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                />
                <button
                  aria-label= "Elegir plazos"
                  onClick={() => setStep(4)}
                  className="text-white px-4 py-2 rounded-full bg-[#4e2d1e] hover:bg-[#3f2518]"
                  disabled={investmentAmount < 100 }
                >
                  Elegir plazo
                </button>
              </>
            )}

            {step === 4 && (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Seleccione el plazo
                </h3>
                <div className="space-y-4">
                  {investmentType === "Tradicional en Pesos" ||
                  investmentType === "Tradicional en Dólares" ? (
                    <>
                      <button
                        aria-label="Plazo a 30 días"
                        onClick={() => {
                          setInvestmentTermParsed(30);
                          setInvestmentTerm("30 días");
                          saveInvestment();
                        }}
                        className="bg-gray-200 p-4 w-full text-left rounded-2xl hover:bg-gray-300"
                      >
                        30 días
                      </button>
                      <button
                        aria-label="Plazo a 60 días"
                        onClick={() => {
                          setInvestmentTermParsed(60);
                          setInvestmentTerm("60 días")
                          saveInvestment();
                        }}
                        className="bg-gray-200 p-4 w-full text-left rounded-2xl hover:bg-gray-300"
                      >
                        60 días
                      </button>
                      <button
                        aria-label="Plazo a 90 días"                      
                        onClick={() => {
                          setInvestmentTermParsed(90);
                          setInvestmentTerm("90 días")
                          saveInvestment();
                        }}
                        className="bg-gray-200 p-4 w-full text-left rounded-2xl hover:bg-gray-300"
                      >
                        90 días
                      </button>
                    
                      <button
                        onClick={() => {
                          setInvestmentTermParsed(180);
                          setInvestmentTerm("180 días")
                          saveInvestment();
                        }}
                        className="bg-gray-200 p-4 w-full text-left rounded-2xl hover:bg-gray-300"
                      >
                        180 días
                      </button>
                      <button
                        onClick={() => {
                          setInvestmentTermParsed(365);
                          setInvestmentTerm("365 días")
                          saveInvestment();
                        }}
                        className="bg-gray-200 p-4 w-full text-left rounded-2xl hover:bg-gray-300"
                      >
                        365 días
                      </button>
                    </>
                  ) : null}
                  </div>
                  </>
                )}
                </ModalInversiones>
                )}
                    

        {/* Confirmación de Eliminar Inversión Modal */}
        {confirmModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                ¿Estás seguro de cancelar esta inversión?
              </h3>
              <div className="flex justify-end space-x-4">
                <button
                aria-label="Opción Sí"
                  onClick={() => deleteInvestment()}
                  className="text-white px-4 py-2 rounded-full bg-[#e63946] hover:bg-[#d13440]"
                >
                  Sí
                </button>
                <button
                  onClick={() => setConfirmModalOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </>
      
      );
  };
