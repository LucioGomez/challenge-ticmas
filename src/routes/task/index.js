const router = require("express").Router();
const {
  getAllTasks,
  createTask,
  getTaskFromID,
  putTaskFromID,
  deleteTaskFromID,
  getFindTasksWithStatus,
  changeTaskStatus,
  getTaskTimesFromID
} = require("../../controllers/task/index.js");

router.get("/tasks", async (req, res) => getAllTasks(req, res));

router.get("/task/:id", async (req, res) => getTaskFromID(req, res));

router.post("/task", async (req, res) => createTask(req, res));

router.put("/task/:id", async (req, res) => putTaskFromID(req, res));

router.delete("/task/:id", async (req, res) => deleteTaskFromID(req, res));

router.get("/task/status/:idStatus", async (req, res) => getFindTasksWithStatus(req, res));

router.put("/task/:idTask/change/:idStatus", async (req, res) => changeTaskStatus(req, res));

router.get("/task/times/:id", async (req, res) => getTaskTimesFromID(req, res));

module.exports = router;
