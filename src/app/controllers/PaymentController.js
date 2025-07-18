import Order from '../models/order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

class PaymentController {
  async processPayment(req, res) {
    // --- LOGS CRÍTICOS LOGO NA ENTRADA DO CONTROLLER ---
    console.log('--- Início do processPayment ---');
    console.log('req.body recebido:', req.body); // O que o Express parseou do corpo da requisição
    console.log('req.user recebido (do middleware authenticateToken):', req.user); // O que o middleware JWT adicionou

    const { productId, amount, paymentToken } = req.body;
    const userId = req.user ? req.user.id : null; // Safely get userId from req.user

    // Log dos valores brutos extraídos
    console.log('Valores extraídos:');
    console.log('  userId:', userId);
    console.log('  productId:', productId);
    console.log('  amount:', amount);
    console.log('  paymentToken:', paymentToken);

    // Converte e valida inputs
    // O Product.id é INTEGER, então parseInt é apropriado.
    const parsedProductId = parseInt(productId, 10);
    const parsedAmount = parseFloat(amount);

    // --- VALIDAÇÕES EXPLÍCITAS COM ERROS MAIS CLAROS ---
    if (!userId) {
      console.error('Erro de validação: userId está ausente ou inválido. (Verifique token JWT ou middleware)');
      return res.status(400).json({ error: 'Usuário não autenticado ou ID de usuário ausente.' });
    }
    // Verifica se parsedProductId é NaN ou <= 0 (assumindo IDs de produto são inteiros positivos)
    if (isNaN(parsedProductId) || parsedProductId <= 0) {
      console.error('Erro de validação: productId inválido ou ausente.', { original: productId, parsed: parsedProductId });
      return res.status(400).json({ error: 'ID do produto inválido ou ausente.' });
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      console.error('Erro de validação: Valor do pagamento inválido ou ausente.', { original: amount, parsed: parsedAmount });
      return res.status(400).json({ error: 'Valor do pagamento inválido ou ausente.' });
    }
    if (!paymentToken || typeof paymentToken !== 'string' || paymentToken.trim() === '') {
      console.error('Erro de validação: Token de transação ausente ou inválido.', { paymentToken });
      return res.status(400).json({ error: 'Token de transação ausente ou inválido.' });
    }

    try {
      const paymentStatus = 'approved'; // Simulação

      const orderData = {
        userId: userId,              // UUID
        productId: parsedProductId,  // INTEGER
        amount: parsedAmount,        // DECIMAL
        transaction_id: paymentToken, // STRING
        paymentStatus: paymentStatus, // STRING
      };

      console.log('Objeto de Pedido (Order) sendo enviado para Order.create:', orderData); // LOG CRÍTICO FINAL

      const order = await Order.create(orderData);

      console.log('Pedido criado com sucesso:', order.toJSON()); // Log de sucesso

      return res.status(200).json({
        message: 'Pagamento processado com sucesso!',
        order,
        paymentStatus: paymentStatus,
      });

    } catch (error) {
      console.error('Erro ao processar pagamento (PaymentController Catch):', error);
      // Se for um erro de validação do Sequelize, loga os detalhes específicos
      if (error.name === 'SequelizeValidationError' && error.errors) {
        error.errors.forEach(err => {
          console.error(`Sequelize Validation Error: ${err.message} (Path: ${err.path}, Value: ${err.value})`);
        });
      }
      return res.status(500).json({ error: 'Erro interno do servidor ao processar pagamento.', details: error.message });
    } finally {
        console.log('--- Fim do processPayment ---');
    }
  }

  async listTransactions(req, res) {
    try {
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
