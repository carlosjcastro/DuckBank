"use client";
import { useState, useEffect } from "react";
import { tarjetas } from "../../../../public/data/tarjetas/tarjetas";
import { FaDollarSign, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

export default function TarjetaDetalles({ params }) {
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPagar, setTotalPagar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [avisoVisible, setAvisoVisible] = useState(false);
  const [nuevoLimite, setNuevoLimite] = useState(null);
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [tarjeta, setTarjeta] = useState(null);
  const [solicitudesAumento, setSolicitudesAumento] = useState(0);

  useEffect(() => {
    const tarjetaEncontrada = tarjetas.find((t) => t.id === params.id);
    if (tarjetaEncontrada) {
      setTarjeta(tarjetaEncontrada);
      setTotalPagar(calcularTotalMovimientos(tarjetaEncontrada));
      const id = tarjetaEncontrada.id;

      const getLocalStorageData = (key, defaultValue) => parseInt(localStorage.getItem(key), 10) || defaultValue;

      const tiempoActual = Date.now();
      const solicitudesGuardadas = getLocalStorageData(`solicitudes-${id}`, 0);
      const tiempoGuardado = getLocalStorageData(`timestamp-${id}`, 0);
      const limiteGuardado = parseFloat(localStorage.getItem(`limite-${id}`)) || tarjetaEncontrada.limiteCompra;
      const fechaVencimientoGuardada = localStorage.getItem(`fecha-vencimiento-${id}`) || tarjetaEncontrada.fechaVencimiento;

      if (tiempoActual - tiempoGuardado > 1 * 60 * 60 * 1000) {
        localStorage.setItem(`solicitudes-${id}`, "0");
        localStorage.setItem(`timestamp-${id}`, tiempoActual.toString());
        setSolicitudesAumento(0);
      } else {
        setSolicitudesAumento(solicitudesGuardadas);
      }

      setNuevoLimite(limiteGuardado);
      setFechaVencimiento(fechaVencimientoGuardada);
    }
  }, [params.id]);

  const formatearMonto = (monto) => monto == null ? "No disponible" : parseFloat(monto).toLocaleString("es-AR", { style: "currency", currency: "ARS" });

  const calcularTotalMovimientos = (tarjeta) => tarjeta?.movimientos.reduce((total, movimiento) => total + (parseFloat(movimiento.monto) || 0), 0) || 0;

  const realizarPago = async () => {
    if (!tarjeta) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/pago/${tarjeta.id}`, { method: "POST" });
      const data = await response.json();
      setMensaje(data.message);
      setTotalPagar(0);
      const tarjetaActualizada = { ...tarjeta, saldoDisponibleARS: 0 };
      localStorage.setItem(`tarjeta-${tarjeta.id}`, JSON.stringify(tarjetaActualizada));
      setTarjeta(tarjetaActualizada);
    } catch {
      setMensaje("Hubo un error procesando la solicitud para realizar el pago.");
    } finally {
      setLoading(false);
    }
  };

  const solicitarAumento = async () => {
    if (!tarjeta) return;
    if (solicitudesAumento >= 2) {
      setAvisoVisible(true);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/aumento-limite/${tarjeta.id}`, { method: "POST" });
      const data = await response.json();
      setMensaje(data.message);
      const nuevoLimite = tarjeta.limiteCompra * 1.2;
      const nuevaFechaVencimiento = new Date();
      nuevaFechaVencimiento.setMonth(nuevaFechaVencimiento.getMonth() + 1);
      const fechaNuevaVencimiento = nuevaFechaVencimiento.toLocaleDateString("es-AR");

      const tarjetaActualizada = { ...tarjeta, limiteCompra: nuevoLimite, fechaVencimiento: fechaNuevaVencimiento };
      localStorage.setItem(`tarjeta-${tarjeta.id}`, JSON.stringify(tarjetaActualizada));
      localStorage.setItem(`limite-${tarjeta.id}`, nuevoLimite.toString());
      localStorage.setItem(`fecha-vencimiento-${tarjeta.id}`, fechaNuevaVencimiento);
      localStorage.setItem(`timestamp-${tarjeta.id}`, Date.now().toString());
      
      setNuevoLimite(nuevoLimite);
      setFechaVencimiento(fechaNuevaVencimiento);
      setTarjeta(tarjetaActualizada);
      setModalVisible(true);
      setSolicitudesAumento(prev => prev + 1);
      localStorage.setItem(`solicitudes-${tarjeta.id}`, (solicitudesAumento + 1).toString());
    } catch {
      setMensaje("Hubo un error procesando la solicitud para aumentar el límite.");
    } finally {
      setLoading(false);
    }
  };

  const movimientosOrdenados = tarjeta?.movimientos
    .map(mov => ({ ...mov, fecha: new Date(mov.fecha).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }) }))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) || [];

  return (
    <div className="p-6 mt-10">
      {/* <h1 className="text-2xl font-bold">Tarjeta: {tarjeta?.name}</h1> */}
      <div className="mt-4 p-4 rounded-lg">
        {/* <img src="/assets/pages/tarjetas/DuckBank.png" alt="Tarjeta" className="w-20 h-14 object-cover mb-4" /> */}
        <p className="text-lg font-semibold">{tarjeta?.type} | {tarjeta?.name}</p>
        <h1 className="text-2xl font-bold">Resumen de la Tarjeta</h1>
        {/* <p className="text-xl font-bold">{tarjeta?.issuer}</p> */}
        <p className="mt-2 tracking-widest text-2xl">**** **** **** {tarjeta?.number.slice(-4)}</p>
        <p className="text-sm mt-1">Inicio: {tarjeta?.fechaInicio}</p>
        <p className="text-sm">Vencimiento: {fechaVencimiento || tarjeta?.fechaVencimiento}</p>
      </div>
      <div className="mt-6 p-4 rounded-2xl overflow-x-auto">
        <h2 className="text-xl font-semibold">Movimientos</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lugar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {movimientosOrdenados.length > 0 ? (
              movimientosOrdenados.map((movimiento, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-500">{movimiento.fecha}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{movimiento.hora}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{movimiento.descripcion}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatearMonto(movimiento.monto)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">1</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No hay movimientos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-10 bg-[#f4f4f4] p-6 rounded-2xl">
          <p className="font-normal">Límite de Compra: {formatearMonto(nuevoLimite || tarjeta?.limiteCompra)}</p>
          <p className="font-normal">Saldo Disponible: {formatearMonto(tarjeta?.saldoDisponibleARS)} ARS / {formatearMonto(tarjeta?.saldoDisponibleUSD)} USD</p>
          <p className="font-bold text-xl mt-4">Total a Pagar: {formatearMonto(totalPagar)}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col space-y-4">
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <button onClick={realizarPago} className="bg-[#4e2d1e] text-white px-4 py-2 rounded-full" disabled={loading}>
            {loading ? "Pagando..." : "Realizar Pago"}
          </button>
          <button onClick={solicitarAumento} className="bg-[#4e2d1e] text-white px-4 py-2 rounded-full" disabled={loading}>
            {loading ? "Procesando Aumento de Límite..." : "Solicitar Aumento de Límite"}
          </button>
        </div>
        {mensaje && (
          <div className="bg-green-100 text-green-800 p-4 text-center rounded-full flex items-center justify-center space-x-2">
            <MdOutlineVerified className="text-lg" size={25} />
            <p>{mensaje}</p>
          </div>
        )}
      </div>
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-6">
          <div className="bg-white p-6 rounded-2xl">
            <FaCheckCircle className="text-green-500 text-3xl mx-auto" />
            <h2 className="text-xl font-semibold text-center mt-4">Límite Aumentado</h2>
            <p className="text-lg text-[#52b788] mb-6 text-center">El límite de compra ha sido aumentado con éxito.</p>
            <p className="font-medium text-lg"><FaDollarSign className="inline mr-2" /> Nuevo Límite: {formatearMonto(nuevoLimite)}</p>
            <p className="font-medium text-lg"><FaCalendarAlt className="inline mr-2" /> Fecha de Vencimiento: {fechaVencimiento}</p>
            <button onClick={() => setModalVisible(false)} className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4">Cerrar</button>
          </div>
        </div>
      )}
      {avisoVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-6">
          <div className="bg-white p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-center mt-4">Límite de Aumento Excedido</h2>
            <p className="text-lg text-red-500 mb-4 text-center">Has alcanzado el límite de solicitudes de aumento. Debes esperar dos meses para solicitar uno nuevo o podés dirigirte al banco más cercano.</p>
            <button onClick={() => setAvisoVisible(false)} className="bg-[#4e2d1e] text-white px-4 py-2 rounded-full mt-4 hover:bg-[#3f2518]">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
