document
  .querySelectorAll(".cuenta-pesos, .cuenta-corriente")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const movimientosId = button.classList.contains("cuenta-pesos")
        ? "movimientos-pesos"
        : "movimientos-corriente";
      const movimientosDiv = document.getElementById(movimientosId);

      movimientosDiv.classList.toggle("show");

      if (movimientosDiv.style.display === "block") {
        movimientosDiv.style.display = "none";
      } else {
        movimientosDiv.style.display = "block";
      }

      const tbody = movimientosDiv.querySelector("tbody");
      tbody.innerHTML = "";

      const datos = [
        {
          Fecha: "22/08/2024",
          Descripción: "Depósito",
          Monto: "$10.000",
        },
        {
          Fecha: "23/08/2024",
          Descripción: "Extracción",
          Monto: "$9.500",
        },
        {
          Fecha: "23/08/2024",
          Descripción: "Transferencia",
          Monto: "$500",
        },
      ];

      datos.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${item.Fecha}</td>
                <td>${item.Descripción}</td>
                <td>${item.Monto}</td>
                `;

        tbody.appendChild(row);
      });
    });
  });
