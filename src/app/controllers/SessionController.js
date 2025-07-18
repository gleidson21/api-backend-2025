import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ATENÇÃO: ESTA É UMA CHAVE SECRETA HARDCODED APENAS PARA TESTE.
// NUNCA USE ISTO EM PRODUÇÃO!
// Use a mesma chave simples que configuramos no Render para teste.
const JWT_SECRET_HARDCODED = 'TESTE_SECRETO_DO_GLEIDSON_123';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // Log para depuração na entrada do controlador
    console.log('--- Início do SessionController.store (Login) ---');
    console.log('Tentativa de login para o email:', email);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('Usuário não encontrado para o email:', email);
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    // Verifica a senha
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      console.log('Senha incorreta para o email:', email);
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    // Gerar o token JWT
    // Usando a chave hardcoded para teste
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET_HARDCODED, // AQUI: Usando a chave hardcoded
      { expiresIn: '7d' } // Token expira em 7 dias
    );

    console.log('Login bem-sucedido. Token JWT gerado para o usuário:', user.email);
    console.log('--- Fim do SessionController.store (Login) ---');

    return res.json({
      message: 'Login bem-sucedido!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
}

export default new SessionController();
