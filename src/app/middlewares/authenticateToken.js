import jwt from 'jsonwebtoken';

// ATENÇÃO: ESTA É UMA CHAVE SECRETA HARDCODED APENAS PARA TESTE.
// NUNCA USE ISTO EM PRODUÇÃO!
// Use a mesma chave simples que configuramos no Render para teste.
const JWT_SECRET_HARDCODED = 'TESTE_SECRETO_DO_GLEIDSON_123';

function authenticateToken(req, res, next) {
  console.log('--- Início do Middleware authenticateToken ---');

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Header de Autorização:', authHeader);
  console.log('Token extraído:', token ? 'Token presente' : 'Token ausente');

  if (token == null) {
    console.log('Token ausente. Acesso negado (401).');
    return res.status(401).json({ error: 'Token de autenticação ausente.' });
  }

  // Usando a chave hardcoded para teste
  jwt.verify(token, JWT_SECRET_HARDCODED, (err, user) => {
    if (err) {
      console.error('Erro na verificação do token JWT:', err.message); // ESTA É A MENSAGEM QUE PRECISAMOS!
      return res.status(403).json({ error: 'Token de autenticação inválido ou expirado.' });
    }
    req.user = user;
    console.log('Token JWT verificado com sucesso. req.user populado:', req.user);
    console.log('--- Fim do Middleware authenticateToken ---');
    next();
  });
}

export default authenticateToken;
