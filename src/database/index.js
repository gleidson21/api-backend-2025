// src/database/index.js
import { Sequelize } from 'sequelize'; // Importa a classe Sequelize principal
import databaseConfig from '../config/database.js'; // Importa as configurações do seu banco de dados
import User from '../app/models/User.js'; // Importa o modelo User

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Cria a instância de conexão do Sequelize
    this.connection = new Sequelize(databaseConfig);

    // Array de todos os seus modelos para inicializar
    // Adicione mais modelos aqui à medida que os criar
    this.models = [User];

    // Itera sobre cada modelo e chama o método 'init', passando a conexão
    this.models.forEach(model => model.init(this.connection));

    // Se você tiver associações (método static associate(models) nos seus modelos)
    // Depois que todos os modelos estiverem inicializados, configure as associações
    this.models.forEach(model => {
      if (model.associate) { // Verifica se o modelo tem o método associate
        model.associate(this.connection.models);
      }
    });

    // Opcional: Teste de conexão para verificar se o banco de dados está acessível
    this.connection.authenticate()
      .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
      })
      .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
      });
  }
}

export default new Database(); // Exporta a instância da classe Database para uso em outros lugares