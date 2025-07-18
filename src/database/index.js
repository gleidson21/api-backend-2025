import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';

// Importa todos os seus modelos com caminhos RELATIVOS
import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Order from '../app/models/order.js'; // Note: 'order.js' é minúsculo, o que está correto

// Coloque todos os seus modelos em um array
const models = [User, Product, Order];

class Database {
  constructor() {
    this.init();
  }

  init() {
    console.log('--- Iniciando conexão com o banco de dados ---');
    try {
      // Tenta estabelecer a conexão Sequelize
      this.connection = new Sequelize(databaseConfig.url, databaseConfig);
      console.log('Conexão Sequelize estabelecida com sucesso.');

      // Inicializa cada modelo
      models.forEach(model => {
        try {
          model.init(this.connection);
          console.log(`Modelo ${model.name} inicializado com sucesso.`);
        } catch (initError) {
          console.error(`ERRO CRÍTICO ao inicializar o modelo ${model.name}:`, initError.message);
          console.error('Detalhes do erro de inicialização do modelo:', initError);
          throw initError; // Re-lança o erro para ser capturado pelo try-catch externo
        }
      });

      // Configura as associações para cada modelo
      models.forEach(model => {
        if (model.associate) { // Verifica se o modelo tem um método 'associate'
          try {
            model.associate(this.connection.models);
            console.log(`Associações para o modelo ${model.name} configuradas com sucesso.`);
          } catch (assocError) {
            console.error(`ERRO CRÍTICO ao configurar associações para o modelo ${model.name}:`, assocError.message);
            console.error('Detalhes do erro de associação do modelo:', assocError);
            throw assocError; // Re-lança o erro para ser capturado pelo try-catch externo
          }
        }
      });
      console.log('Todos os modelos e associações configurados com sucesso.');
    } catch (dbError) {
      console.error('ERRO FATAL na inicialização do banco de dados ou modelos/associações:', dbError.message);
      console.error('Detalhes do erro fatal do banco de dados:', dbError);
      // Re-lança o erro para garantir que o processo Node.js saia com um status de erro
      throw dbError;
    }
  }
}

// --- Captura de erros síncronos durante a criação da instância de Database ---
let dbInstance;
try {
  dbInstance = new Database();
  console.log('Instância global do banco de dados criada com sucesso.');
} catch (error) {
  console.error('ERRO INESPERADO ao criar a instância de Database (fora do init):', error.message);
  console.error('Detalhes do erro inesperado:', error);
  process.exit(1); // Força a saída do processo com erro se a instância não puder ser criada
}

export default dbInstance;
