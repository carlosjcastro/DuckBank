// Obtener las modales
const prestamosModal = document.getElementById("prestamosModal");
const convertidorModal = document.getElementById("convertidorModal");

const prestamosBtn = document.querySelector(".calcula-prestamos");
const convertidorBtn = document.querySelector(".convertidor-moneda");

// Obtener los elementos de cierre
const closeBtns = document.querySelectorAll(".close");

// Función para abrir la modal
function openModal(modal) {
    modal.style.display = "flex";
}

// Función para cerrar la modal
function closeModal(modal) {
    modal.style.display = "none";
}

prestamosBtn.addEventListener("click", () => openModal(prestamosModal));
convertidorBtn.addEventListener("click", () => openModal(convertidorModal));

closeBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        closeModal(btn.parentElement.parentElement);
    });
});

// Funcionalidad para el calculador de préstamos
document.getElementById("calculateLoan").addEventListener("click", function() {
    const amount = parseFloat(document.getElementById("loanAmount").value);
    const rate = parseFloat(document.getElementById("loanRate").value) / 100;
    const term = parseInt(document.getElementById("loanTerm").value);

    if (isNaN(amount) || isNaN(rate) || isNaN(term)) {
        document.getElementById("loanResult").textContent = "Por favor, ingrese valores válidos.";
        loanResult.style.color = "#e63946";
        return;
    }

    const monthlyRate = rate / 12;
    const numberOfPayments = term * 12;
    const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthlyPayment * numberOfPayments;

    document.getElementById("loanResult").textContent = `Cuota mensual: $${monthlyPayment.toLocaleString('es-AR', {minimumFractionDigits: 2})} | Pago total: $${totalPayment.toLocaleString('es-AR', {minimumFractionDigits: 2})}`;
});

// Funcionalidad para el convertidor de monedas
document.getElementById("convertCurrency").addEventListener("click", function() {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(amount)) {
        document.getElementById("conversionResult").textContent = "Por favor, ingrese un monto válido.";
        conversionResult.style.color = "#e63946";
        return;
    }

    const exchangeRates = {
        "USD": 1,
        "EUR": 0.85,
        "GBP": 0.75,
        "JPY": 110,
        "ARS": 1350  // 1 USD = 1350 ARS
    };

    let convertedAmount = amount;

    if (fromCurrency === "ARS" && toCurrency === "USD") {
        convertedAmount = amount / exchangeRates["ARS"];
    } else if (fromCurrency === "USD" && toCurrency === "ARS") {
        convertedAmount = amount * exchangeRates["ARS"];
    } else {
        convertedAmount = amount * (exchangeRates[toCurrency] / exchangeRates[fromCurrency]);
    }

    document.getElementById("conversionResult").textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
});

// Rellenar las opciones de moneda
const currencyOptions = ["USD", "EUR", "GBP", "JPY", "ARS"];
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");

currencyOptions.forEach(currency => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    option2.value = currency;
    option2.textContent = currency;
    fromCurrencySelect.appendChild(option1);
    toCurrencySelect.appendChild(option2);
});

fromCurrencySelect.value = "USD";
toCurrencySelect.value = "ARS";
