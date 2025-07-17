// usercontrollers.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'; // Importe o bcryptjs

class UserController {
  async store(req, res) {
    try {
        // 1. Recebe apenas o email e a senha
        const { email, password } = req.body;

        // 2. Procura o usuário pelo email
        const user = await User.findOne({ where: { email } });

        // 3. Verifica se o usuário existe
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        // 4. Compara a senha informada com a senha criptografada do banco de dados
        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

        // 5. Se a senha estiver incorreta, retorna um erro
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // 6. Se tudo estiver correto, cria o token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role },
            'SEGREDO_SUPER_SECRETO', // Use a sua chave secreta do .env
            { expiresIn: '1d' }
        );

        // 7. Retorna o token para o frontend
        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) { // <-- Esse é o bloco que estava faltando
        return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
}
    }
      
export default new UserController()