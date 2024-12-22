import pandas as pd

class User:
    def __init__(self, name, category, products, cards):
        self.name = name
        self.category = category
        self.products = products.split(";")
        self.cards = cards
        
        # Se colocan saldos predeterminados
        self.saldo_pesos = 10000 if 'Savings in Pesos' in self.products else 0
        self.saldo_dolares = 500 if 'Savings in Dollars' in self.products else 0
        self.cheques_disponibles = 5 if 'Checking Account' in self.products else 0
        self.transacciones = []

    # Se realiza la transacción según el tipo seleccionado y se devuelve un mensaje
    def realizar_transaccion(self, tipo, monto=0):
        if tipo == "RETIRO_EFECTIVO_CAJERO_AUTOMATICO":
            return self.retirar_efectivo(monto)
        elif tipo == "ALTA_TARJETA_CREDITO":
            return self.alta_tarjeta_credito()
        elif tipo == "ALTA_CHEQUERA":
            return self.alta_chequera()
        elif tipo == "COMPRAR_DOLAR":
            return self.comprar_dolar(monto)
        elif tipo == "TRANSFERENCIA_ENVIADA":
            return self.transferir_dinero(monto)
        elif tipo == "TRANSFERENCIA_RECIBIDA":
            return self.recibir_transferencia()
        return False, "Transacción no reconocida."

    # Se muestran los motivos de rechazo claros para la extracción de efectivo
    def retirar_efectivo(self, monto):
        if monto <= 0:
            return False, "El monto debe ser mayor a cero para realizar un retiro."
        if self.saldo_pesos >= monto:
            self.saldo_pesos -= monto
            return True, "Retiro de efectivo exitoso."
        return False, f"Saldo insuficiente. Disponible: ${self.saldo_pesos}, requerido: ${monto}."

    # Es una regla donde solo ciertas categorías pueden recibir tarjetas de crédito
    def alta_tarjeta_credito(self):
        if self.category in ["Gold", "Platinum"]:
            return True, "Tarjeta de crédito aprobada."
        return False, "El cliente no es de categoría Gold o Platinum. Las tarjetas de crédito solo están disponibles para estos niveles."

    # Se muestra el mensaje con el motivo para el rechazo de chequeras
    def alta_chequera(self):
        if self.cheques_disponibles > 0:
            self.cheques_disponibles -= 1
            return True, "Chequera asignada con éxito."
        return False, "No tiene cheques disponibles o su cuenta no permite chequeras."

    # Se muestra el mensaje de rechazo si no tiene cuenta en dólares
    def comprar_dolar(self, monto):
        if monto <= 0:
            return False, "El monto debe ser mayor a cero para la compra de dólares."
        if 'Savings in Dollars' in self.products:
            return True, "Compra de dólares realizada con éxito."
        return False, "El cliente no tiene una cuenta de ahorros en dólares."

    # Se muestra el motivo para rechazar una transferencia enviada
    def transferir_dinero(self, monto):
        if monto <= 0:
            return False, "El monto debe ser mayor a cero para realizar una transferencia."
        if self.saldo_pesos >= monto:
            self.saldo_pesos -= monto
            return True, "Transferencia enviada con éxito."
        return False, f"Saldo insuficiente para la transferencia. Disponible: ${self.saldo_pesos}, requerido: ${monto}."

    # La transferencia recibida siempre es aceptada
    def recibir_transferencia(self):
        return True, "Transferencia recibida exitosamente."

    # Se muestran detalles del cliente
    def detalles_cliente(self):
        return f"Nombre: {self.name}, Categoría: {self.category}, Saldo en Pesos: {self.saldo_pesos}, Saldo en Dólares: {self.saldo_dolares}, Cheques disponibles: {self.cheques_disponibles}"

# Se cargan los clientes desde el archivo clients.csv
def cargar_clientes():
    df = pd.read_csv('clients.csv')
    clientes = []
    for _, row in df.iterrows():
        cliente = User(row['name'], row['category'], row['products'], row['cards'])
        clientes.append(cliente)
    return clientes

# Mostrar el menú de transacciones
def mostrar_menu():
    print("\n--- Menú de Transacciones ---")
    print("1. Retirar efectivo")
    print("2. Alta de tarjeta de crédito")
    print("3. Alta de chequera")
    print("4. Comprar dólares")
    print("5. Enviar transferencia")
    print("6. Recibir transferencia")
    print("7. Mostrar detalles de cliente")
    print("8. Salir")

# Función para seleccionar un cliente de la lista de clientes del CSV
def seleccionar_cliente(clientes):
    print("\n--- Seleccionar Cliente ---")
    for i, cliente in enumerate(clientes):
        print(f"{i + 1}. {cliente.name}")
    seleccion = int(input("Seleccione el número del cliente: ")) - 1
    return clientes[seleccion]

# Se maneja el flujo de transacciones y el programa principal
def main():
    clientes = cargar_clientes()
    transacciones_aceptadas = []
    transacciones_rechazadas = []

    while True:
        cliente = seleccionar_cliente(clientes)
        mostrar_menu()
        opcion = int(input("Seleccione una opción: "))

        if opcion == 1:
            monto = float(input("Ingrese el monto a retirar: "))
            resultado, mensaje = cliente.realizar_transaccion("RETIRO_EFECTIVO_CAJERO_AUTOMATICO", monto)
        elif opcion == 2:
            resultado, mensaje = cliente.realizar_transaccion("ALTA_TARJETA_CREDITO")
        elif opcion == 3:
            resultado, mensaje = cliente.realizar_transaccion("ALTA_CHEQUERA")
        elif opcion == 4:
            monto = float(input("Ingrese el monto para comprar dólares: "))
            resultado, mensaje = cliente.realizar_transaccion("COMPRAR_DOLAR", monto)
        elif opcion == 5:
            monto = float(input("Ingrese el monto a transferir: "))
            resultado, mensaje = cliente.realizar_transaccion("TRANSFERENCIA_ENVIADA", monto)
        elif opcion == 6:
            resultado, mensaje = cliente.realizar_transaccion("TRANSFERENCIA_RECIBIDA")
        elif opcion == 7:
            print(cliente.detalles_cliente())
            continue
        elif opcion == 8:
            break
        else:
            print("Opción no válida.")
            continue

        if resultado:
            transacciones_aceptadas.append((cliente.name, opcion, mensaje))
            print(f"Transacción aceptada: {mensaje}")
        else:
            transacciones_rechazadas.append((cliente.name, opcion, mensaje))
            print(f"Transacción rechazada: {mensaje}")

    # Se muestra un resumen al final del programa con todo lo realizado
    print("\n--- Resumen de Transacciones ---")
    print("Transacciones Aceptadas:")
    for transaccion in transacciones_aceptadas:
        print(f"Cliente: {transaccion[0]}, Opción: {transaccion[1]}, Mensaje: {transaccion[2]}")
    
    print("\nTransacciones Rechazadas:")
    for transaccion in transacciones_rechazadas:
        print(f"Cliente: {transaccion[0]}, Opción: {transaccion[1]}, Motivo de Rechazo: {transaccion[2]}")

if __name__ == "__main__":
    main()
