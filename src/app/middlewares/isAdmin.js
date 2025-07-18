function isAdmin(req, res, next) {
    console.log('--- Início do Middleware isAdmin ---');
    console.log('req.user no isAdmin:', req.user); // VERIFIQUE ESTE LOG

    if (!req.user || req.user.role !== 'admin') {
        console.log('Acesso negado: Usuário não é administrador ou req.user não definido.');
        return res.status(403).json({ error: 'Acesso negado. Requer privilégios de administrador.' });
    }
    console.log('Acesso concedido: Usuário é administrador.');
    console.log('--- Fim do Middleware isAdmin ---');
    next();
}

export default isAdmin;