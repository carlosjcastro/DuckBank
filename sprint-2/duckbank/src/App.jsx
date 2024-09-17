import  { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';
import Inicio from './pages/inicio/Inicio';
import Inversiones from './pages/inversiones/Inversiones';
import Tarjetas from './pages/tarjetas/Tarjetas';
import TerminosyCondiciones from './pages/terminos-y-condiciones/TerminosyCondiciones';
import InicioSesion from './pages/inicio-sesion/InicioSesion';
import Layout from './components/layout/Layout';
import PaginaMantenimiento from './pages/pagina-mantenimiento/PaginaMantenimiento';

function App() {
  const [autenticado, setAutenticado] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const session = localStorage.getItem('sesionActiva');
    if (session === 'true') {
      setAutenticado(true);
    } else {
      setAutenticado(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogin = () => {
    setAutenticado(true);
    localStorage.setItem('sesionActiva', 'true');
  };

  const handleLogout = () => {
    setAutenticado(false);
    localStorage.removeItem('sesionActiva');
  };

  if (autenticado === null) {
    return <div>Cargando...</div>;
  }

  return (
      <Routes>
        <Route path="/inicio-sesion" element={<InicioSesion onLogin={handleLogin} />} />
        
        <Route
          path="/"
          element={autenticado ? (
            <Layout onLogout={handleLogout}>
              <Inicio />
            </Layout>
          ) : (
            <Navigate to="/inicio-sesion" />
          )}
        />
        <Route
          path="/inversiones"
          element={autenticado ? (
            <Layout onLogout={handleLogout}>
              <Inversiones />
            </Layout>
          ) : (
            <Navigate to="/inicio-sesion" />
          )}
        />
        <Route
          path="/tarjetas"
          element={autenticado ? (
            <Layout onLogout={handleLogout} className="z-50">
              <Tarjetas />
            </Layout>
          ) : (
            <Navigate to="/inicio-sesion" />
          )}
        />
        <Route
          path="/terminos-y-condiciones"
          element={autenticado ? (
            <Layout onLogout={handleLogout}>
              <TerminosyCondiciones />
            </Layout>
          ) : (
            <Navigate to="/inicio-sesion" />
          )}
        />

        <Route
          path="/pagina-en-mantenimiento"
          element={autenticado ? (
            <Layout onLogout={handleLogout}>
              <PaginaMantenimiento />
            </Layout>
          ) : (
            <Navigate to="/inicio-sesion" />
          )}
        />
      </Routes>
  );
}

export default App;