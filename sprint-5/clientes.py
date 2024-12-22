import pandas as pd

class User:
    def __init__(self, name, category):
        self.name = name
        self.category = category
        self.product_bank = []
        self.credits = []

    def add_product(self, product):
        self.bank_products.append(product)
    
    def add_card(self, card):
        self.credit_cards.append(card)

    def client_details(self):
        details =  f"Name: {self.name} - Category: {self.category}\n"
        details += "Bank products:\n"
        for product in self.bank_products:
            details += f" *{product}"
        details += "Credit cards:\n"
        for card in self.credit_cards:
            details += f" * {card}"
        return details
    
def load_clients(file_path):
    df = pd.read_csv(file_path)

    users = []

    for _, row in df.iterrows():
        user = User(row['name'], row['category'])

        products = row['products'].split(';')
        cards = row['cards'].split(';')

        for product in products:
            user.add_product(product)
        for card in cards:
            user.add_card(card)

        users.append(user)
    
    return users

users = load_clients('clients.csv')

for user in users:
    print(user.client_details())
    print('\n')
