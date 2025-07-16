import User from "../models/User.js";
class usercontroller {
    async store(req, res) {
        const { name, email, password_hash } = req.body

        const usertocreat = {
            name,
            email,
            password_hash,
        }
        try {
            const user = await User.create(usertocreat);

            // Retorna 201 Created para sucesso na criação
            // E não retorna o password_hash por segurança
            return res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                // NÃO INCLUA user.password_hash AQUI!
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);

            // Tratamento de erro para e-mail duplicado (violação de unique constraint)
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ error: 'Falha no cadastro', details: 'Este e-mail já está em uso.' });
            }

            // Erro genérico do servidor
            return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }
    async index(req, res) {
        try {
            // Busca todos os usuários. O 'attributes' é para não retornar a senha.
            const users = await User.findAll({
                attributes: ['id', 'name', 'email', 'created_at', 'updated_at']
            });

            return res.status(200).json(users);
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }

}
}


 export default new usercontroller();