// usercontrollers.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs'; // Importe o bcryptjs para hash de senhas

class UserController {
  // Método para CRIAR um novo usuário (rota POST /users)
  async store(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Dados inválidos', details: 'Todos os campos (nome, email, senha) são obrigatórios.' });
      }

      // Verifica se o e-mail já está em uso
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(409).json({ error: 'Falha no cadastro', details: 'Este e-mail já está em uso.' });
      }

      // Cria o hash da senha antes de salvar no banco de dados
      const password_hash = await bcrypt.hash(password, 8);

      // Cria o usuário no banco de dados
      const user = await User.create({ name, email, password_hash });

      // Retorna apenas os dados públicos do usuário
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role // Inclua a role se ela for definida no modelo
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
  }

  // Método para LISTAR todos os usuários (rota GET /users)
  async index(req, res) {
    try {
      // Busca todos os usuários, excluindo o hash da senha por segurança
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
      });

      return res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
  }

  // Método para DELETAR um usuário (rota DELETE /users/:id)
  async delete(req, res) {
    try {
      const { id } = req.params; // Pega o ID da URL

      if (!id) {
        return res.status(400).json({ error: 'ID do usuário não fornecido.' });
      }

      const user = await User.findByPk(id); // Encontra o usuário pelo ID

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      await user.destroy(); // Deleta o usuário

      return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
  }
}

// Exporta uma instância da classe UserController
export default new UserController();
