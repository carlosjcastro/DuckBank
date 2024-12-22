import pandas as pd
import sys
from datetime import datetime, timezone

# Leer el archivo CSV: cheques.csv
def leer_csv(file_path):
    """
    Lee un archivo CSV y devuelve un DataFrame de pandas.
    
    Args:
        file_path (str): La ruta del archivo CSV a leer.
    
    Returns:
        pd.DataFrame: DataFrame con los datos del CSV.
    """
    try:
        df = pd.read_csv(file_path)
        return df
    except FileNotFoundError:
        mostrar_mensaje(f"Error: El archivo {file_path} no se encuentra.")
        sys.exit(1)

# Convertir timestamp a fecha legible
def convertir_fecha(timestamp):
    """
    Convierte un timestamp a una fecha en formato legible.
    
    Args:
        timestamp (int): El timestamp a convertir.
    
    Returns:
        str: La fecha en formato 'YYYY-MM-DD'.
    """
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).strftime('%Y-%m-%d')

# Función para mostrar mensaje y resultados
def mostrar_mensaje(mensaje, imagen_estado=None):
    """
    Muestra un mensaje en una ventana gráfica y en la terminal.
    
    Args:
        mensaje (str): El mensaje a mostrar.
        imagen_estado (PhotoImage, optional): Imagen a mostrar en la ventana.
    """
    print(mensaje)  # Mostrar en terminal
    

# Verificar cheques duplicados e
def verificar_cheques_duplicados(df):
    """
    Verifica si hay cheques duplicados en el DataFrame.
    
    Args:
        df (pd.DataFrame): DataFrame con los datos de cheques.
    
    Returns:
        list: Lista de cheques duplicados.
    """
    # Agrupar por Numero de Cheque y NumeroCuentaOrigen para encontrar duplicados
    duplicados = df[df.duplicated(subset=['NroCheque', 'NumeroCuentaOrigen'], keep=False)]
    
    if not duplicados.empty:
        return duplicados
    return None

# Aplicar filtros
def filtrar_cheques(df, dni_input, salida, tipo_cheque=None, estado=None, rango_fechas=None):
    """
    Filtra los cheques según los criterios proporcionados.
    
    Args:
        df (pd.DataFrame): DataFrame con los datos de cheques.
        dni_list (list): Lista de DNIs para filtrar.
        salida (str): Formato de salida (no se usa aquí).
        tipo_cheque (str, optional): Tipo de cheque para filtrar.
        estado (str, optional): Estado del cheque para filtrar.
        rango_fechas (str, optional): Rango de fechas para filtrar.
    """
    # Filtra por DNI
    n='50678901'
    dni_input=int(dni_input)
    dni=[]
    dni.append(dni_input)
 
    df_filtrado = df[df['DNI'].isin(dni)]
    
    mensaje = f"Después de filtrar por DNI: {len(df_filtrado)} filas"
    
    if df_filtrado.empty:
        mostrar_mensaje("No se encontraron cheques para los DNI proporcionados.")
        return

    # Verificar duplicados
    duplicados = verificar_cheques_duplicados(df_filtrado)
    if duplicados is not None:
        mostrar_mensaje("Se encontraron cheques duplicados:\n" + duplicados.to_string(index=False))
        return

    # Filtrar por tipo de cheque si se especifica
    if tipo_cheque:
        df_filtrado = df_filtrado[df_filtrado['TipoCheque'].str.upper() == tipo_cheque.upper()]
        mensaje += f"\nDespués de filtrar por tipo de cheque: {len(df_filtrado)} filas"

    # Filtrar por estado si se especifica
    if estado:
        df_filtrado = df_filtrado[df_filtrado['Estado'].str.upper() == estado.upper()]
        mensaje += f"\nDespués de filtrar por estado: {len(df_filtrado)} filas"

    # Filtrar por rango de fechas si se especifica
    if rango_fechas:
        fecha_inicio, fecha_fin = rango_fechas.split(':')
        fecha_inicio = datetime.strptime(fecha_inicio, '%Y-%m-%d').timestamp()
        fecha_fin = datetime.strptime(fecha_fin, '%Y-%m-%d').timestamp()
    
        df_filtrado = df_filtrado[
            ((df_filtrado['FechaOrigen'] >= fecha_inicio) & (df_filtrado['FechaOrigen'] <= fecha_fin)) |
            ((df_filtrado['FechaPago'] >= fecha_inicio) & (df_filtrado['FechaPago'] <= fecha_fin))
        ]
        mensaje += f"\nDespués de filtrar por rango de fechas: {len(df_filtrado)} filas"
    
    # Se convierten las fechas a un formato legible
    df_filtrado['FechaOrigen'] = df_filtrado['FechaOrigen'].apply(convertir_fecha)
    df_filtrado['FechaPago'] = df_filtrado['FechaPago'].apply(convertir_fecha)

    # Se formatean los resultados
    resultado = "Resultados finales después de aplicar todos los filtros:\n\n"
    resultado += "{:^15} | {:^15} | {:^15} | {:^20} | {:^20} | {:^10} | {:^15} | {:^15} | {:^10} | {:^15} | {:^15}\n".format(
        'N° de Cheque', 'Codigo Banco', 'Codigo Sucursal', 'Numero Cuenta Origen',
        'Numero Cuenta Destino', 'Valor', 'Fecha de Origen', 'Fecha de Pago', 'DNI', 'Estado', 'Tipo de Cheque'
    )
    resultado += '-' * 120 + '\n'

    for index, row in df_filtrado.iterrows():
        resultado += "{:^15} | {:^15} | {:^15} | {:^20} | {:^20} | {:^10} | {:^15} | {:^15} | {:^10} | {:^15} | {:^15}\n".format(
            row['NroCheque'], row['CodigoBanco'], row['CodigoSucursal'], row['NumeroCuentaOrigen'],
            row['NumeroCuentaDestino'], row['Valor'], row['FechaOrigen'], row['FechaPago'], row['DNI'],
            row['Estado'], row['TipoCheque']
        )
    
    # Mostrar resultados finales
    mostrar_mensaje(mensaje + '\n' + resultado)
    input("¿Desea exportar los resultados a un archivo CSV? (Presione Enter para continuar)")
    
    df_filtrado.to_csv(f"{row['DNI']}_{row['FechaOrigen']}.csv", index=False)

# Función principal
def main():
    """
    Función principal que inicia la ejecución del script.
    """
    
    # Leer el CSV
    cheques_df = leer_csv('cheques.csv')
    
    # Solicitar entrada de usuario
    dni_input = input("Ingrese los DNIs separados por comas: ")

    tipo_cheque = input("Ingrese el tipo de cheque a filtrar (o presione Enter para omitir): ")
    estado = input("Ingrese el estado a filtrar (o presione Enter para omitir): ")
    rango_fechas = input("Ingrese el rango de fechas en formato YYYY-MM-DD:YYYY-MM-DD (o presione Enter para omitir): ")

    # Filtrar cheques
    filtrar_cheques(cheques_df, dni_input, "pantalla", tipo_cheque, estado, rango_fechas)

if __name__ == '__main__':
    main()