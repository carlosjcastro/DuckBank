// Se cargan las tarjetas de forma dinámica

// Tarjetas de Débito
const debitCards = [
  {
    type: "VISA",
    image: "/src/assets/tarjetas/Visa.png",
    balance: 31466.5,
    currency: "ARS",
    limits: { purchase: 650000, withdrawal: 270000 },
  },
  {
    type: "MASTERCARD",
    image: "/src/assets/tarjetas/Mastercard-WB.png",
    balance: 31466.5,
    currency: "ARS",
    limits: { purchase: 650000, withdrawal: 270000 },
  },
];

// Tarjetas de Crédito
const creditCards = [
  {
    type: "VISA",
    image: "/src/assets/tarjetas/Visa-B-WB.png",
    balance: { ARS: 15000, USD: 7000 },
    limits: {
      purchase: { ARS: 6000000, USD: 10000 },
      withdrawal: { ARS: 900000, USD: 5000 },
    },
  },
  {
    type: "MASTERCARD",
    image: "/src/assets/tarjetas/Mastercard-B-WB.png",
    balance: { ARS: 15000, USD: 5000 },
    limits: {
      purchase: { ARS: 5000000, USD: 8000 },
      withdrawal: { ARS: 800000, USD: 4000 },
    },
  },
  {
    type: "AMERICAN EXPRESS",
    image: "/src/assets/tarjetas/AMEX-B-WB.png",
    balance: { ARS: 450000, USD: 10000 },
    limits: {
      purchase: { ARS: 8000000, USD: 15000 },
      withdrawal: { ARS: 1000000, USD: 7000 },
    },
  },
];

// Formato ARS
function formatARS(value) {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
}

// Formato USD
function formatUSD(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

// Generar Tarjeta
function createCardHTML(card) {
  const { type, image, balance, limits } = card;
  const balanceHTML =
    typeof balance === "object"
      ? `<p>Saldo: ${balance.ARS ? `${formatARS(balance.ARS)}` : ""} 
       ${balance.USD ? ` · ${formatUSD(balance.USD)}` : ""}</p>`
      : `<p>Saldo: ${formatARS(balance)}</p>`;

  const limitsHTML =
    typeof limits.purchase === "object"
      ? `<p>Límites | Compra: ${
          limits.purchase.ARS ? `${formatARS(limits.purchase.ARS)}` : ""
        } 
       ${limits.purchase.USD ? ` · ${formatUSD(limits.purchase.USD)}` : ""}</p>
       <p>Extracción: ${
         limits.withdrawal.ARS ? `${formatARS(limits.withdrawal.ARS)}` : ""
       } 
       ${
         limits.withdrawal.USD ? ` · ${formatUSD(limits.withdrawal.USD)}` : ""
       }</p>`
      : `<p>Límites | Compra: ${formatARS(
          limits.purchase
        )} · Extracción: ${formatARS(limits.withdrawal)}</p>`;

  return `
    <div class="card">
      <div class="card-image">
        <img src="${image}" alt="Tarjeta de ${type}" />
      </div>
      <div class="card-info">
        <p><i class="bx bx-credit-card"></i> ${type}</p>
        <p class="toggle-movements">Movimientos <i class="bx bx-chevron-down"></i></p>
        <div class="movements-content">
          ${balanceHTML}
          ${limitsHTML}
        </div>
      </div>
    </div>
  `;
}

// Cargar las tarjetas de Débito
const debitContainer = document.querySelector(".card-container.debit");
debitCards.forEach((card) => {
  debitContainer.innerHTML += createCardHTML(card);
});

// Cargar las tarjetas de Crédito
const creditContainer = document.querySelector(".card-container.credit");
creditCards.forEach((card) => {
  creditContainer.innerHTML += createCardHTML(card);
});

// Funcionalidad para mostrar/ocultar Movimientos
document.querySelectorAll(".toggle-movements").forEach((button) => {
  button.addEventListener("click", () => {
    const movementsContent = button.nextElementSibling;
    const icon = button.querySelector("i");
    movementsContent.classList.toggle("visible");
    icon.classList.toggle("bx-chevron-down");
    icon.classList.toggle("bx-chevron-up");
  });
});
