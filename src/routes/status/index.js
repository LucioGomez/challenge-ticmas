const router = require("express").Router();
const {
  getAllStatus,
  createStatus,
  getStatusFromID,
  putStatusFromID,
  deleteStatusFromID,
} = require("../../controllers/status/index.js"); 

router.get("/statuses", async (req, res) => getAllStatus(req, res));

router.get("/status/:id", async (req, res) => getStatusFromID(req, res));

router.post("/status", async (req, res) => createStatus(req, res));

router.put("/status/:id", async (req, res) => putStatusFromID(req, res));

router.delete("/status/:id", async (req, res) => deleteStatusFromID(req, res));

module.exports = router;
