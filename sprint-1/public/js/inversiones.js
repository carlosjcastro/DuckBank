// Apertura de Menú en la card de Plazo Fijo
function toggleMenu(event) {
  const menu = document.getElementById("plazoFijoMenu");
  menu.classList.toggle("menu-show");
  event.stopPropagation();
}

document.addEventListener("click", function (event) {
  const menu = document.getElementById("plazoFijoMenu");
  if (
    !menu.contains(event.target) &&
    !event.target.classList.contains("menu-icon-inversion")
  ) {
    menu.classList.remove("menu-show");
  }
});

// Modal y Simulador
const modal = document.getElementById("simulatorModal");
const btn = document.querySelector("#plazoFijoMenu span:first-child");
const span = document.querySelector(".close");

btn.onclick = function () {
  modal.style.display = "block";
  document.body.classList.add("modal-open");
};

span.onclick = function () {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
};

document.getElementById("simulate").addEventListener("click", function () {
  const amount = parseFloat(document.getElementById("amount").value);
  const term = parseInt(document.getElementById("term").value);
  const currency = document.getElementById("currency").value;

  if (isNaN(amount) || amount < 100) {
    alert("El monto mínimo a invertir es de $100.");
    return;
  }

  const TNA = 0.35;
  const TEA = 0.412;

  const earnedInterest = amount * TNA * (term / 365);
  const totalAmount = amount + earnedInterest;

  const today = new Date();
  today.setDate(today.getDate() + term);
  const endDate = today.toISOString().split("T")[0];

  const formatCurrency = (value, currency) => {
    let currencyCode = "USD";

    if (currency === "pesos") {
      currencyCode = "ARS";
    } else if (currency === "dolares") {
      currencyCode = "USD";
    }

    const options = {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat("es-AR", options).format(value);
  };

  document.getElementById("totalAmount").innerText = formatCurrency(
    totalAmount,
    currency
  );
  document.getElementById("earnedInterest").innerText = formatCurrency(
    earnedInterest,
    currency
  );
  document.getElementById("endDate").innerText = endDate;

  document.getElementById("result").style.display = "block";
});
