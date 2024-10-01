const app = require("./app");
const { sequelize } = require("./database.js");

app.listen(app.get("port"), async () => {
  await sequelize.sync({ force: false });
  console.log("Server runing in", app.get("port"));
});
