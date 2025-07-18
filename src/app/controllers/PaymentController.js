import Order from '../models/order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

class PaymentController {
  async processPayment(req, res) {
    console.log('--- Início do PaymentController.processPayment ---');
    console.log('Corpo da requisição (req.body):', req.body);
    console.log('Informações do usuário (req.user) após autenticação:', req.user);

    const { productId, amount, paymentToken } = req.body;

    // Verifica se req.user existe e tem um id
    const userId = req.user ? req.user.id : null;
    console.log('userId extraído de req.user:', userId);

    if (!userId) {
      console.error('Erro: user_id não encontrado em req.user. Acesso não autenticado ou token inválido.');
      return res.status(401).json({ error: 'Usuário não autenticado ou token inválido.' });
    }

    if (!productId || !amount || !paymentToken) {
      console.error('Erro de validação: productId, amount ou paymentToken ausentes.');
      return res.status(400).json({ error: 'Dados de pagamento incompletos.' });
    }

    try {
      // 1. Verificar se o produto existe e obter seus detalhes
      const product = await Product.findByPk(productId);
      if (!product) {
        console.error(`Produto com ID ${productId} não encontrado.`);
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
      console.log('Produto encontrado:', product.name, 'Preço:', product.price);

      // 2. Verificar se o usuário existe (opcional, mas boa prática)
      const user = await User.findByPk(userId);
      if (!user) {
        console.error(`Usuário com ID ${userId} não encontrado.`);
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      console.log('Usuário encontrado:', user.email);

      // 3. Simular processamento do pagamento com um gateway externo
      // Numa aplicação real, você integraria com Stripe, PayPal, etc.
      // Aqui, estamos apenas a simular o sucesso.
      const paymentSuccessful = true; // Simula sempre sucesso para teste
      let paymentStatus = 'pending';

      if (paymentSuccessful) {
        paymentStatus = 'approved';
        console.log('Pagamento simulado aprovado para paymentToken:', paymentToken);
      } else {
        paymentStatus = 'failed';
        console.log('Pagamento simulado falhou para paymentToken:', paymentToken);
        return res.status(400).json({ error: 'Pagamento recusado pelo gateway simulado.' });
      }

      // 4. Criar o registro da transação (Order) na base de dados
      const newOrder = await Order.create({
        user_id: userId, // Corrigido: Usando userId extraído do token
        product_id: productId, // Corrigido: Usando productId do corpo da requisição
        amount: parseFloat(amount), // Garante que o valor é um float
        paymentStatus: paymentStatus,
        transaction_id: paymentToken, // Usando o token simulado como ID da transação
      });

      console.log('Transação (Order) criada com sucesso:', newOrder.toJSON());
      console.log('--- Fim do PaymentController.processPayment ---');

      return res.status(200).json({
        message: 'Pagamento processado com sucesso!',
        order: newOrder,
      });

    } catch (error) {
      console.error('Erro ao processar pagamento (catch):', error);
      // Log detalhado do erro de validação do Sequelize, se houver
      if (error.name === 'SequelizeValidationError') {
        console.error('Detalhes do Erro de Validação do Sequelize:', error.errors.map(e => e.message));
      }
      return res.status(500).json({ error: 'Erro interno do servidor ao processar pagamento.' });
    }
  }

  async listTransactions(req, res) {
    console.log('--- Início do PaymentController.listTransactions ---');
    console.log('Informações do usuário (req.user) após autenticação:', req.user);

    // O middleware isAdmin já deve ter verificado se o usuário é admin
    // Não é necessário um userId específico aqui, pois é uma lista global de transações

    try {
      const transactions = await Order.findAll({
        include: [
          {
            model: User,
            as: 'user', // Alias definido na associação
            attributes: ['id', 'email', 'name'], // Inclui apenas atributos necessários do usuário
          },
          {
            model: Product,
            as: 'product', // Alias definido na associação
            attributes: ['id', 'name', 'price'], // Inclui apenas atributos necessários do produto
          }
        ],
        order: [['createdAt', 'DESC']] // Ordena as transações pela data de criação
      });
      console.log(`Encontradas ${transactions.length} transações.`);
      console.log('--- Fim do PaymentController.listTransactions ---');
      return res.status(200).json(transactions);
    } catch (error) {
      console.error('Erro ao listar transações:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao listar transações.' });
    }
  }
}

export default new PaymentController();
