from flask import Flask, render_template, request, redirect, url_for
import pandas as pd

app = Flask(__name__)

class User:
    client_type = ['Classic', 'Gold', 'Black']
    account_type = ['Caja de ahorro en pesos', 'Caja de ahorro en Dólares', 'Cuenta corriente en pesos']
    card_types = {
        'Classic' : ['Classic'],
        'Gold': ['Classic', 'Gold'],
        'Black': ['Classic', 'Gold', 'Black']
    }   

    def __init__(self, client_number, name, surname, category, product, cards):
        if category not in self.client_type:
            raise ValueError(f'Tipo de cliente no válido. Debe ser uno de los siguientes: {self.client_type}')

        self.client_number = client_number
        self.name = name
        self.surname = surname
        self.category = category
        self.product_bank = product.split(';')
        self.cards = cards.split(';')
        self.transactions = []

        self.saldo_pesos = 0  # Se asigna un valor inicial o carga desde el archivo
        self.saldo_dolares = 0  # Se asigna un valor inicial o carga desde el archivo
        self.cheques_disponibles = 0  # Se asigna un valor inicial o carga desde el archivo

    def add_product(self, product):
        if product not in self.account_type:
            raise ValueError(f'Tipo de cuenta no válida. Debe ser alguna de las siguientes: {self.account_type}')
        self.product_bank.append(product)
    
    def add_card(self, card):
        if card not in self.card_types[self.category]:
            raise ValueError(f'Tipo de tarjeta no válida. Debe ser alguna de las siguientes: {self.card_types[self.category]}')
        self.cards.append(card)
    
    def client_details(self):
        return {
            "Numero de cliente": self.client_number, "Nombre": self.name, "Apellido": self.surname,"Categoría": self.category,"Productos": self.product_bank, "Tarjetas": self.cards, "transacciones": self.transactions, "Saldo en Pesos": self.saldo_pesos, "Saldo en Dólares": self.saldo_dolares, "Cheques disponibles":self.cheques_disponibles}

def load_clients(file_path):
    df = pd.read_csv(file_path)

    users = []

    for _, row in df.iterrows():
        user = User(row['client_number'], row['name'], row['surname'], row['category'], row['products'], row['cards'])

        products = row['products'].split(';')
        cards = row['cards'].split(';')

        for product in products:
            user.add_product(product.strip())
        for card in cards:
            user.add_card(card.strip())

        users.append(user)
    
    return users

users = load_clients('C:/Users/Celina/Desktop/Duckbank-BackEnd/Duckbank-BackEnd/sprint-5/clients.csv')

@app.route('/')
def home():
    user_details = [user.client_details() for user in users]
    return render_template('report.html', users = user_details)

@app.route('/transaction', methods=['POST'])
def transaccion():
    client_number = request.form['client_number']
    tipo_transaccion = request.form['tipo_transaccion']
    monto = float(request.form.get('monto', 0))

    user = next((u for u in users if u.client_number == client_number), None)
    if not user:
        return "Usuario no encontrado", 404
    
    resultado, mensaje = user.realizar_transaccion(tipo_transaccion, monto)
    user.transactions.append({
        "fecha": "2024-10-14",
        "tipo": tipo_transaccion,
        "estado": "ACEPTADA" if resultado else "RECHAZADA",
        "monto": monto,
        "razon": None if resultado else mensaje
    })

    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
    