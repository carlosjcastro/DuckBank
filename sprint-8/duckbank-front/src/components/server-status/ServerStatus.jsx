import React, { useEffect, useState } from 'react';

const ServerStatus = () => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch('https://duckbank-backend.onrender.com/api/status');
        if (response.ok) {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      } catch (error) {
        setStatus('offline');
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-green-200 text-green-700 border-green-300';
      case 'offline':
        return 'bg-red-200 text-red-700 border-red-300';
      default:
        return 'bg-yellow-200 text-yellow-700 border-yellow-300';
    }
  };

  const getText = () => {
    switch (status) {
      case 'online':
        return '🟢 Servidor activo';
      case 'offline':
        return '🔴 Servidor caído';
      default:
        return '🟡 Verificando servidor...';
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center items-center py-3 z-50 border-b ${getStatusColor()} transition-all duration-300`}
    >
      <span className="text-sm md:text-base font-semibold">{getText()}</span>
    </div>
  );
};

export default ServerStatus;
