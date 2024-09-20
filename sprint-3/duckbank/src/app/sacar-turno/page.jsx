"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import hablando from '../../../public/assets/pages/sacar-turno/hablando.png'
import Image from "next/image";

const Loading = (message) => () => (
  <div className="flex justify-center items-center h-screen">
    <p>{message}</p>
  </div>
);

const FormularioTurno = dynamic(() => import("../../components/sacar-turno/formulario/FormularioTurno"), {
  loading: Loading("Cargando Formulario de Turnos..."),
});
const SelectMotivo = dynamic(() => import("../../components/sacar-turno/seleccionar-motivo/SeleccionarMotivo"), {
  loading: Loading("Cargando Selección de Motivo..."),
});
const MotivoConsulta = dynamic(() => import("../../components/sacar-turno/motivo-consulta/MotivoConsulta"), {
  loading: Loading("Cargando Motivo de Consulta..."),
});
const SeleccionarHorario = dynamic(() => import("../../components/sacar-turno/seleccionar-horario/SeleccionarHorario"), {
  loading: Loading("Cargando Selector de Horario..."),
});
const TurnoConfirmado = dynamic(() => import("../../components/sacar-turno/turno-confirmado/TurnoConfirmado"), {
  loading: Loading("Confirmando turno..."),
});

const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export default function SacarTurno() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [appointmentData, setAppointmentData] = useState({});

  const handleNext = (data) => {
    if (step === 0) {
      setUserData(data);
    } else if (step === 1) {
      setAppointmentData((prev) => ({ ...prev, motivo: data }));
    } else if (step === 2) {
      setAppointmentData((prev) => ({ ...prev, consulta: data }));
    } else if (step === 3) {
      setAppointmentData((prev) => ({ ...prev, ...data }));
    }
    setStep(step + 1);
  };

  return (
    <div className="flex flex-col items-center">
       <Image 
        src={hablando}
        alt="Descripción de la imagen"
        className="mb-4 mt-28"
        initial="initial" 
        animate="animate" 
        width={450}
        height={450}
        variants={fadeInVariants} 
        transition={{ duration: 0.5 }} 
      />
      {step === 0 && (
        <motion.div initial="initial" animate="animate" variants={fadeInVariants} transition={{ duration: 0.5 }}>
          <FormularioTurno onNext={handleNext} />
        </motion.div>
      )}
      {step === 1 && (
        <motion.div initial="initial" animate="animate" variants={fadeInVariants} transition={{ duration: 0.5 }}>
          <SelectMotivo onNext={handleNext} />
        </motion.div>
      )}
      {step === 2 && (
        <motion.div initial="initial" animate="animate" variants={fadeInVariants} transition={{ duration: 0.5 }}>
          <MotivoConsulta onNext={handleNext} />
        </motion.div>
      )}
      {step === 3 && (
        <motion.div initial="initial" animate="animate" variants={fadeInVariants} transition={{ duration: 0.5 }}>
          <SeleccionarHorario onNext={handleNext} appointmentData={appointmentData} />
        </motion.div>
      )}
      {step === 4 && (
        <motion.div initial="initial" animate="animate" variants={fadeInVariants} transition={{ duration: 0.5 }}>
          <TurnoConfirmado userData={userData} appointmentData={appointmentData} onRestart={() => setStep(0)} />
        </motion.div>
      )}
    </div>
  );
}
