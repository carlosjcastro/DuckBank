import pandas as pd 

df = pd.read_csv('cheques.csv')

def data_export(filtr, i):
    cf=df.loc[filtr]
    if (i=='1'):
  
     print(cf.to_string())
    elif(i=='2'):
     arch_nombre=str(cf['DNI'])+ "_"+str(cf['FechaOrigen'])+".csv"
     cf.to_csv(arch_nombre)
     print("El archivo  se ha creado correctamente!!")

while True:
    data=input("Si desea ver la factura presione 1 \n Si desea descargarla precione 2: \n ")
    data_export(2,data)