"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  FaDollarSign,
  FaEye,
  FaEyeSlash,
  FaChevronUp,
  FaChevronDown,
  FaEllipsisH,
} from "react-icons/fa";
import { LuBanknote } from "react-icons/lu";
import Transferencias from "./transferencias/page";
import Servicios from "../servicios/page";
import Link from "next/link";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Menu,
  MenuItem,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ICONS = {
  LuBanknote: <LuBanknote size={24} className="inline mr-2" />,
  FaDollarSign: <FaDollarSign size={24} className="inline mr-2" />,
};

const getIconComponent = (iconKey) =>
  ICONS[iconKey] || <FaDollarSign size={24} className="inline mr-2" />;

// export const metadata = {
//   title: 'DUCKBANK - Homebanking Seguro y Rápido',
//   description: 'Bienvenido a DUCKBANK, tu solución de homebanking confiable para gestionar tus finanzas de manera rápida y segura. Realiza transferencias, revisa tus cuentas y más.'
// };

export default function Cuentas() {
  const [accounts, setAccounts] = useState([]);
  const [externalAccounts, setExternalAccounts] = useState([]);
  const [showBalances, setShowBalances] = useState(true);
  const [showExternalAccounts, setShowExternalAccounts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [dialogType, setDialogType] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAccounts = localStorage.getItem("accounts");
      const defaultAccounts = [
        {
          id: 1,
          name: "Cuenta Principal",
          balance: 285547,
          currency: "ARS",
          icon: "LuBanknote",
        },
        {
          id: 2,
          name: "Caja de Ahorros",
          balance: 899504,
          currency: "ARS",
          icon: "LuBanknote",
        },
        {
          id: 3,
          name: "Cuenta Dólares",
          balance: 28039,
          currency: "USD",
          icon: "FaDollarSign",
        },
      ];

      if (!savedAccounts || savedAccounts === "[]") {
        setAccounts(defaultAccounts);
        localStorage.setItem("accounts", JSON.stringify(defaultAccounts));
      } else {
        setAccounts(JSON.parse(savedAccounts));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedExternalAccounts = localStorage.getItem("externalAccounts");
      if (savedExternalAccounts) {
        const parsedExternalAccounts = JSON.parse(savedExternalAccounts);
        setExternalAccounts(parsedExternalAccounts);
        setFilteredAccounts(parsedExternalAccounts);
      }
    }
  }, []);

  useEffect(() => {
    if (accounts.length > 0) {
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  }, [accounts]);

  useEffect(() => {
    if (externalAccounts.length > 0) {
      localStorage.setItem(
        "externalAccounts",
        JSON.stringify(externalAccounts)
      );
    }
  }, [externalAccounts]);

  const handleTransfer = (origenId, destinoId, monto) => {
    const origen = accounts.find((acc) => acc.id === origenId);
    let destino = accounts.find((acc) => acc.id === destinoId);

    if (!destino) {
      destino = externalAccounts.find((acc) => acc.id === destinoId);
    }

    if (!origen) {
      setSnackbarMessage("La cuenta de origen no existe");
      setSnackbarOpen(true);
      return;
    }

    if (!destino) {
      setDialogType("addExternal");
      setNewAccountName("");
      setOpenDialog(true);
      return;
    }

    if (origen.balance < monto) {
      setSnackbarMessage("Fondos insuficientes en la cuenta de origen");
      setSnackbarOpen(true);
      return;
    }

    const updatedOrigen = { ...origen, balance: origen.balance - monto };
    const updatedDestino = { ...destino, balance: destino.balance + monto };

    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) => (acc.id === origenId ? updatedOrigen : acc))
    );

    if (accounts.find((acc) => acc.id === destinoId)) {
      setAccounts((prevAccounts) =>
        prevAccounts.map((acc) => (acc.id === destinoId ? updatedDestino : acc))
      );
    } else {
      setExternalAccounts((prevExternalAccounts) =>
        prevExternalAccounts.map((acc) =>
          acc.id === destinoId ? updatedDestino : acc
        )
      );
    }

    // Guarda los cambios en localStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("externalAccounts", JSON.stringify(externalAccounts));

    setSnackbarMessage("Transferencia realizada con éxito");
    setSnackbarOpen(true);
  };

  const handleModifyAccountName = (accountId) => {
    setDialogType("modify");
    setNewAccountName(accounts.find((acc) => acc.id === accountId)?.name || "");
    setOpenDialog(true);
  };

  const handleDeleteAccount = (accountId) => {
    setExternalAccounts((prevAccounts) =>
      prevAccounts.filter((account) => account.id !== accountId)
    );
    setSnackbarMessage("Cuenta externa eliminada con éxito");
    setSnackbarOpen(true);
  };

  const formatCurrency = useMemo(
    () => (value, currency) => {
      return value.toLocaleString("es-AR", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
      });
    },
    []
  );

  const toggleBalancesVisibility = useCallback(() => {
    setShowBalances((prev) => !prev);
  }, []);

  const toggleExternalAccountsVisibility = useCallback(() => {
    setShowExternalAccounts((prev) => !prev);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredAccounts(
      externalAccounts.filter((account) =>
        account.name.toLowerCase().includes(term)
      )
    );
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewAccountName("");
  };

  const handleDialogSave = () => {
    if (dialogType === "modify") {
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.name === newAccountName
            ? { ...account, name: newAccountName }
            : account
        )
      );

      setSnackbarMessage("Nombre de cuenta modificado con éxito");
    } else if (dialogType === "addExternal") {
      const newExternalAccount = {
        id: Date.now(), // Genera un ID único
        name: newAccountName,
      };
      setExternalAccounts((prevExternalAccounts) => [
        ...prevExternalAccounts,
        newExternalAccount,
      ]);
      setSnackbarMessage("Cuenta externa agregada con éxito");
    }
    setOpenDialog(false);
    setSnackbarOpen(true);
  };

  const handlePayment = ({ accountId, amount, service }) => {
    console.log(
      `Pago realizado: Cuenta ID ${accountId}, Monto ${amount}, Servicio ${service}`
    );
  };

  const handleMenuClick = (event, account) => {
    setAnchorEl(event.currentTarget);
    setSelectedAccount(account);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAccount(null);
  };

  const handleMenuOptionClick = (option) => {
    handleMenuClose();
    if (option === "modify") {
      setDialogType("modify");
      setNewAccountName(selectedAccount.name);
      setOpenDialog(true);
    } else if (option === "delete") {
      setSelectedAccount(selectedAccount);
      setConfirmDeleteOpen(true);
    }
  };

  const handleConfirmDeleteClose = (confirm) => {
    if (confirm && selectedAccount) {
      const updatedExternalAccounts = externalAccounts.filter(
        (account) => account.id !== selectedAccount.id
      );
      setExternalAccounts(updatedExternalAccounts);
      localStorage.setItem(
        "externalAccounts",
        JSON.stringify(updatedExternalAccounts)
      );

      setSnackbarMessage("Cuenta eliminada con éxito");
      setSnackbarOpen(true);
    }

    setConfirmDeleteOpen(false);
    setSelectedAccount(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="container mx-auto p-4 bg-[#F5F5F5] mt-28">
      {/* Sección de Cuentas Bancarias */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Cuentas Bancarias</h1>
        <h2 className="text-xl font-semibold text-[#000000]">Mis Cuentas</h2>
        <Button
          onClick={toggleBalancesVisibility}
          className="text-[#4e2d1e]"
        >
          {showBalances ? <FaEyeSlash size={24} className="text-[#4e2d1e]"/> : <FaEye size={24} className="text-[#4e2d1e]"/>}
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-4 flex-wrap justify-center">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex flex-col items-center p-6 rounded-2xl bg-white transition duration-300 hover:bg-gray-200"
            >
              <div className="flex items-center mb-4">
                {getIconComponent(account.icon)}
                <div className="ml-4">
                  <span className="text-lg font-medium text-[#000000]">
                    {account.name}
                  </span>
                  {showBalances && (
                    <div className="mt-1 text-xl font-semibold text-[#000000]">
                      {formatCurrency(account.balance, account.currency)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Título y Sección de Cuentas Externas */}
      <div className="p-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-[#143D60]">
            Cuentas Externas
          </h2>
          <button
            onClick={toggleExternalAccountsVisibility}
            className="ml-2 text-[#143D60]"
          >
            <svg
              className={`w-6 h-6 ${showExternalAccounts ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>

        {showExternalAccounts && (
          <div className="mt-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar cuenta"
              className="border border-[#BCBDC0] rounded-full p-2 w-full mb-4 bg-white text-[#143D60]"
            />
            {filteredAccounts.map((account) => (
              <div
                key={account.id}
                className="relative p-4 border border-[#BCBDC0] rounded-lg bg-white mb-2"
              >
                {getIconComponent(account.icon)}
                <div className="flex justify-between mt-2">
                  <span className="text-lg font-medium text-[#143D60]">
                    {account.name}
                  </span>
                </div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleMenuClick(event, account)}
                  className="absolute top-2 right-2"
                >
                  <FaEllipsisH />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuOptionClick("modify")}>
          Modificar nombre
        </MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("delete")}>
          Eliminar cuenta
        </MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {dialogType === "addExternal"
            ? "Agregar cuenta"
            : dialogType === "modify"
            ? "Modificar nombre de la cuenta"
            : "Eliminar cuenta"}
        </DialogTitle>
        <DialogContent>
          {(dialogType === "modify" || dialogType === "addExternal") && (
            <TextField
              autoFocus
              margin="dense"
              label="Nombre de la Cuenta"
              type="text"
              fullWidth
              variant="standard"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDialogSave} color="primary">
            {dialogType === "addExternal" ? "Agregar" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => handleConfirmDeleteClose(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <p>
            ¿Estás seguro de que deseas eliminar la cuenta{" "}
            {selectedAccount?.name}?
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleConfirmDeleteClose(false)}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => handleConfirmDeleteClose(true)}
            color="secondary"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mostrar mensajes de confirmación */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Transferencias handleTransfer={handleTransfer} />
    </div>
  );
}
