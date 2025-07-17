/ src/app/controllers/PaymentController.js
import Order from '../models/Order.js'; // Supondo que você tenha um modelo de Pedido
// import PaymentGatewayService from '../services/PaymentGatewayService.js'; // Um serviço real para interagir com o gateway (ex: Stripe)

class PaymentController {
  async processPayment(req, res) {
    try {
      const { paymentToken, productId, amount } = req.body;
      const userId = req.user.id; // Supondo que o ID do usuário venha do token de autenticação

      if (!paymentToken || !productId || !amount) {
        return res.status(400).json({ error: 'Dados de pagamento incompletos.' });
      }

      // --- SIMULAÇÃO DE PROCESSAMENTO DE PAGAMENTO COM GATEWAY ---
      // Em uma aplicação real, você faria algo como:
      // const transactionResult = await PaymentGatewayService.charge(paymentToken, amount);
      // if (!transactionResult.success) {
      //   return res.status(400).json({ error: transactionResult.message });
      // }

      // Para fins de demonstração, vamos simular um sucesso
      const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const paymentStatus = 'approved';
      // --- FIM DA SIMULAÇÃO ---

      // Salva os detalhes do pedido e da transação no seu banco de dados
      // NUNCA salve o número do cartão aqui!
      const order = await Order.create({
        userId,
        productId,
        amount,
        transactionId,
        paymentStatus,
        // Outros detalhes do pedido
      });

      return res.status(200).json({
        message: 'Pagamento processado com sucesso!',
        orderId: order.id,
        transactionId: order.transactionId,
        paymentStatus: order.paymentStatus
      });

    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao processar pagamento.', details: error.message });
    }
  }

  // Método para listar transações/pedidos para o admin
  async listTransactions(req, res) {
    try {
      // Apenas administradores devem acessar esta rota
      // req.user.role deve ser 'admin' (já verificado pelo middleware isAdmin)
      const transactions = await Order.findAll({
        attributes: ['id', 'userId', 'productId', 'amount', 'transactionId', 'paymentStatus', 'createdAt']
      });
      return res.status(200).json(transactions);
    } catch (error) {
      console.error('Erro ao listar transações:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao listar transações.', details: error.message });
    }
  }
}

export default new PaymentController();
