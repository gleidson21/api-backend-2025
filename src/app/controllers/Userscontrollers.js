// usercontrollers.js

import User from '../models/User.js';
import bcrypt from 'bcryptjs'; // Importe o bcryptjs

class UserController {
  async store(req, res) {
    try {
      // 1. O backend agora espera a chave `password`, igual ao frontend
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
      return res.status(400).json({ error: 'Dados inválidos', details: 'Todos os campos (nome, email, senha) são obrigatórios.' });
    }

      // 2. Cria o hash da senha
      const password_hash = await bcrypt.hash(password, 8);

      // 3. Usa o password_hash no objeto para criação do usuário
      const user = await User.create({ name, email, password_hash });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      // Se houver um erro de e-mail duplicado
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Falha no cadastro', details: 'Este e-mail já está em uso.' });
      }

      // Erro genérico do servidor
      return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
  }

  async index(req, res) {
  try {
    // Removemos o filtro de atributos para evitar o erro 500
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
}
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

export default new UserController();