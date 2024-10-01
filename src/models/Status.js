const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database.js")


class Status extends Model {}

Status.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Status",
  }
);





module.exports = Status;


// async function TestConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connect database to", sequelize.config.port)
//   } catch (error) {
//     console.log(error)
//   }
// }

// TestConnection()
