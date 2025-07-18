 import Product from '../models/Product.js';

class ProductController {
  // Método para CRIAR um novo produto (POST /products)
  async store(req, res) {
    try {
      const { name, description, price, image_url } = req.body;

      if (!name || !price) {
        return res.status(400).json({ error: 'Nome e preço são obrigatórios para o produto.' });
      }

      const product = await Product.create({ name, description, price, image_url });

      return res.status(201).json(product);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao criar produto.', details: error.message });
    }
  }

  // Método para LISTAR todos os produtos (GET /products)
  async index(req, res) {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao listar produtos.', details: error.message });
    }
  }

  // Método para OBTER um produto específico por ID (GET /products/:id)
  async show(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao buscar produto.', details: error.message });
    }
  }

  // Método para ATUALIZAR um produto (PUT /products/:id)
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, image_url } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      await product.update({ name, description, price, image_url });

      return res.status(200).json(product);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao atualizar produto.', details: error.message });
    }
  }

  // Método para DELETAR um produto (DELETE /products/:id)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      await product.destroy();

      return res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao deletar produto.', details: error.message });
    }
  }
}

export default new ProductController();
