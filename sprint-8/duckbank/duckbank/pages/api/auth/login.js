import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find((user) => user.email === email && user.password === password);

    if (user) {
      const token = jwt.sign({ userId: user.id }, 'tu_secreto_aqui', { expiresIn: '1h' });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
