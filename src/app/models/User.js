import { DataTypes, Model } from 'sequelize'
class User extends Model {
  static init(sequelize) {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
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
      }


    )

  }
}
export default User