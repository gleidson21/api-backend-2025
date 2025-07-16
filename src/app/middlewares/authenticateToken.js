import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera "Bearer TOKEN"

  if (token == null) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  jwt.verify(token, 'SEU_SECRET_JWT', (err, user) => { // Use a mesma chave secreta do SessionController
    if (err) {
      // Se o token for inválido ou expirado
      return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
    req.user = user; // Adiciona as informações do usuário ao objeto de requisição
    next(); // Continua para a próxima função (o controller)
  });
};

export default authenticateToken;