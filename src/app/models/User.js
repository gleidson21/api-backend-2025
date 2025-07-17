import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM('user', 'admin'),
          defaultValue: 'user',
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        // --- OPÇÕES ADICIONADAS ---
        tableName: 'users', // Nome da tabela no banco de dados.
        modelName: 'User',
        timestamps: true, // Adiciona as colunas 'createdAt' e 'updatedAt'.
        underscored: true // Usa snake_case (ex: 'password_hash' e 'created_at').
        // --- FIM DAS OPÇÕES ---
      }
    );
    return this;
  }
}

export default User;