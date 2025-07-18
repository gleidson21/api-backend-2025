import Order from '../models/order.js';
import Product from '../models/Product.js'; // Certifique-se de importar o modelo Product
import User from '../models/User.js';     // Certifique-se de importar o modelo User

class PaymentController {
  async processPayment(req, res) {
    const { productId, amount, paymentToken } = req.body; // Pega paymentToken do corpo da requisição
    const userId = req.user.id; // userId vem do middleware authenticateToken

    // Log para depuração: verificar se os valores estão chegando
    console.log('Dados recebidos para processamento de pagamento:');
    console.log('userId:', userId);
    console.log('productId:', productId);
    console.log('amount:', amount);
    console.log('paymentToken (simulatedTransactionId):', paymentToken);

    if (!userId || !productId || !amount || !paymentToken) {
      console.error('Dados de pagamento incompletos:', { userId, productId, amount, paymentToken });
      return res.status(400).json({ error: 'Dados de pagamento incompletos.' });
    }

    try {
      // Simular processamento com um gateway de pagamento externo
      // Em um cenário real, você faria uma chamada à API de um gateway (Stripe, PagSeguro, etc.)
      const paymentStatus = 'approved'; // Simulação: pagamento sempre aprovado para teste

      // Criar o registro do pedido no banco de dados
      const order = await Order.create({
        userId,
        productId,
        amount,
        transaction_id: paymentToken, // AQUI: Usa paymentToken para preencher transaction_id
        paymentStatus: paymentStatus,
      });

      return res.status(200).json({
        message: 'Pagamento processado com sucesso!',
        order,
        paymentStatus: paymentStatus,
      });

    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      // Retorna o erro detalhado para ajudar na depuração
      return res.status(500).json({ error: 'Erro interno do servidor ao processar pagamento.', details: error.message });
    }
  }

  async listTransactions(req, res) {
    try {
      // Apenas administradores podem listar transações (garantido pelo middleware isAdmin)
      const transactions = await Order.findAll({
        include: [
          { model: User, as: 'user', attributes: ['id', 'email'] },
          { model: Product, as: 'product', attributes: ['id', 'name'] }
        ]
      });
      return res.status(200).json(transactions);
    } catch (error) {
      console.error('Erro ao listar transações:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao listar transações.', details: error.message });
    }
  }
}

export default new PaymentController();
