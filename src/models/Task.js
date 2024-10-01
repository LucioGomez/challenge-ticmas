const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database.js");
const Status = require("../models/Status.js");  // No uses destructuración
class Task extends Model {}

Task.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);

Task.belongsTo(Status, {
  foreignKey: "status_id",  // La tarea tiene un estatus asociado
});

// En Status.js
Status.hasMany(Task, {
  foreignKey: "status_id",  // Un estatus puede estar asociado a varias tareas
});
module.exports = Task;

// async function TestConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connect database to", sequelize.config.port)
//   } catch (error) {
//     console.log(error)
//   }
// }

// TestConnection()
