export default function handler(req, res) {
    if (req.method === 'POST') {
      const { origen, destino, monto } = req.body;
      // Aquí iría la lógica para procesar la transferencia
      res.status(200).json({ message: 'Transferencia exitosa' });
    } else {
      res.status(405).json({ message: 'Método no permitido' });
    }
  }