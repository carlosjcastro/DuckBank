"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TbMessageChatbot } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";

const chatbotData = {
  responses: [
    {
      option: "Consultar productos",
      response: "Nuestros productos incluyen cuentas de ahorro, tarjetas de crédito, y préstamos personales.",
    },
    {
      option: "Preguntar por promociones",
      response: "Actualmente tenemos una promoción del 10% de descuento en compras con tarjeta de crédito.",
    },
    {
      option: "Ver horarios de atención",
      response: "Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM.",
    },
    {
      option: "Contactar con soporte",
      response: "Puedes contactar con nuestro equipo de soporte llamando al 0800-333-3333 o vía email a soporte@duckbank.com.ar",
    },
  ],
};

export default function DuckBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [questionsData, setQuestionsData] = useState([]);
  const [optionsShown, setOptionsShown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const messagesEndRef = useRef(null);

  // Se reciben las preguntas y respuestas almacenadas en un JSON cuando el usuario ingresa alguna palabra clave
  useEffect(() => {
    if (chatHistory.length === 0 && isChatOpen && !chatEnded) {
      fetch("/data/duckbot/faq.json")
        .then(response => response.json())
        .then(data => {
          setQuestionsData(data.questions);
          setChatHistory([
            { sender: "bot", message: "¡Hola! Soy DuckBot, el asistente virtual de DuckBank. ¿En qué puedo ayudarte hoy? No compartas información sensible. Recuerda que desde el banco, no te vamos a solicitar datos personales ni contraseñas." },
          ]);
        })
        .catch(error => console.error("Error al cargar las preguntas:", error));
    }
  }, [chatHistory, isChatOpen, chatEnded]);

  // Carga las opciones predeterminadas al iniciar el chat
  useEffect(() => {
    if (chatHistory.length === 1 && !optionsShown && !chatEnded) {
      setTimeout(() => {
        setChatHistory(prevHistory => [
          ...prevHistory,
          { sender: "bot", message: "Aquí tenes algunas opciones para empezar:", options: chatbotData.responses.map(r => r.option) }
        ]);
        setOptionsShown(true);
      }, 1000);
    }
  }, [chatHistory, optionsShown, chatEnded]);

  // Esto permite que el chat haga scroll automáticamente a medida que se envían o reciben mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Si DuckBot no encuentra una pregunta o respuesta almacenada de lo que el usuario busca, genera un mensaje
  const handleOptionClick = option => {
    const response = chatbotData.responses.find(r => r.option === option)?.response || "Lo siento, no entiendo tu consulta. ¿Podrías reformularla?";
    setChatHistory(prevHistory => [
      ...prevHistory,
      { sender: "user", message: option },
      { sender: "bot", message: option === "Finalizar chat" ? "Gracias por contactar a DuckBank. ¡Hasta luego!" : response }
    ]);
    if (option === "Finalizar chat") {
      setChatEnded(true);
      setIsChatOpen(false);
      setOptionsShown(false);
    }
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    const response = questionsData.find(q => q.keywords.some(k => userMessage.toLowerCase().includes(k.toLowerCase())))?.answer || "Lo siento, no entiendo tu consulta. ¿Podrías reformularla?";
    setChatHistory(prevHistory => [
      ...prevHistory,
      { sender: "user", message: userMessage },
      { sender: "bot", message: response }
    ]);
    setUserMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Se muestra el boton flotante de DuckBot */}
      <motion.div
        className="bg-[#f3c677] text-white p-4 rounded-full cursor-pointer shadow-lg"
        onClick={() => { setIsChatOpen(!isChatOpen); if (chatEnded) { setChatHistory([]); setChatEnded(false); } }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <TbMessageChatbot className="w-6 h-6 text-black" />
      </motion.div>

      {/* Permite abrir el chat con DuckBot */}
      {isChatOpen && (
        <motion.div
          className="bg-white rounded-2xl p-4 fixed bottom-16 right-6 w-96 h-[32rem] flex flex-col max-h-[85vh]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-gray-800">DuckBot</h2>
            <div className="relative">
              <button className="text-gray-500" onClick={() => setMenuOpen(!menuOpen)}>
                <BsThreeDots className="w-6 h-6 text-[#2e2828]" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#f4f4f4] rounded-full shadow-lg">
                  <button
                    onClick={() => {
                      setChatHistory([{ sender: "bot", message: "Gracias por contactar a DuckBank. ¡Hasta luego!" }]);
                      setChatEnded(true);
                      setIsChatOpen(false);
                      setOptionsShown(false);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-full text-[#f65151] hover:bg-gray-200"
                  >
                    Finalizar chat
                  </button>
                </div>
              )}
            </div>
          </div>

            {/* Se muestran las opciones predeterminadas al usuario luego que DuckBot se presentó */}
          <div className="flex-1 overflow-y-auto mb-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-2 ${chat.sender === "bot" ? "text-white p-2 mr-6 rounded-2xl bg-[#2e2828]" : "text-black rounded-2xl p-2 ml-4 mr-2 bg-[#f3c677] text-right"}`}
              >
                <p>{chat.message}</p>
                {chat.options && (
                  <div className="mt-2 space-y-2">
                    {chat.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                        className="bg-[#f3c677] text-black p-2 rounded-2xl text-sm cursor-pointer hover:bg-[#fef4f4] w-full text-left"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

            {/* Input para enviar mensaje */}
          <div className="flex items-center">
            <input
              type="text"
              value={userMessage}
              onChange={e => setUserMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSendMessage()}
              className="flex-1 p-2 border border-gray-300 rounded-2xl text-sm"
              placeholder="Escribe tu pregunta..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#2e2828] text-white p-2 rounded-full ml-2 hover:bg-[#3f2518]"
            >
              Enviar
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
