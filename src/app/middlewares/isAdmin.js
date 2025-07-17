const isAdmin = (req, res, next) => {
  // A role do usuário foi adicionada ao objeto de requisição pelo middleware authenticateToken
  if (req.user && req.user.role === 'admin') {
    next(); // Se for admin, continua para a próxima função (o controller)
  } else {
    // Se não for admin, retorna um erro de acesso negado
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
  }
};

export default isAdmin;