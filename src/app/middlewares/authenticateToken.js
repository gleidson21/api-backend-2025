import jwt from 'jsonwebtoken';

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

  // --- VERIFICAÇÃO CRÍTICA: JWT_SECRET ---
  if (!process.env.JWT_SECRET) {
    console.error('ERRO CRÍTICO: Variável de ambiente JWT_SECRET não está definida!');
    return res.status(500).json({ error: 'Erro de configuração do servidor: JWT_SECRET não definido.' });
  }
  // --- FIM DA VERIFICAÇÃO CRÍTICA ---

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Erro na verificação do token JWT:', err.message);
      // Se o token for inválido/expirado, retorna 403 Forbidden
      return res.status(403).json({ error: 'Token de autenticação inválido ou expirado.' });
    }
    req.user = user; // Anexa as informações do usuário ao objeto de requisição
    console.log('Token JWT verificado com sucesso. req.user populado:', req.user);
    console.log('--- Fim do Middleware authenticateToken ---');
    next(); // Continua para a próxima função middleware/rota
  });
}

export default authenticateToken;
