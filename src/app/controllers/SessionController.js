import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado.' });
      }

      // Compara a senha digitada com o hash salvo no banco de dados.
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }

      // Gera um token de segurança para o usuário.
      // Substitua 'SEU_SECRET_JWT' por uma chave secreta forte.
      const token = jwt.sign(
        { id: user.id, email: user.email },
        'SEU_SECRET_JWT',
        {
          expiresIn: '7d', // O token expira em 7 dias.
        }
      );

      return res.status(200).json({
        user: { id: user.id, name: user.name, email: user.email },
        token,
      });
    } catch (e) {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export default new SessionController();