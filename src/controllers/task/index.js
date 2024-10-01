const moment = require("moment");

const response = require("../../middlewares/responses.js");

const Tasks = require("../../models/Task.js");
const { faker } = require("@faker-js/faker");
const Status = require("../../models/Status.js");

const getAllTasks = async (req, res) => {
  const allTask = await Tasks.findAll();
  try {
    response.succes(req, res, "Tasks found", 200, { entries: allTask });
  } catch (error) {
    console.log(error),
      response.error(req, res, "Error retrieving  task ", 500);
  }
};

const getTaskFromID = async (req, res) => {
  const { params } = req;
  console.log(params);
  try {
    if (params.id) {
      const task = await Tasks.findOne({
        where: {
          id: params.id,
        },
      });
      return response.succes(
        req,
        res,
        task?.id ? "Task found" : "Task not found",
        task?.id ? 200 : 404,
        { entry: task?.id ? task : {} }
      );
    }
    return response.error(
      req,
      res,
      "Error retrieving task, params ID not found",
      400
    );
  } catch (error) {
    console.log(error);
    response.error(req, res, "Error retrieving task ", 500);
  }
};

const createTask = async (req, res) => {
  const { body } = req;
  console.log(body, "params");
  try {
    if (body.title && body.description) {
      const createTask = await Tasks.create({
        title: body?.title,
        description: body?.description,
        status_id: body?.status_id || null,
      });
      console.log(createTask);
      return response.succes(req, res, "Task created", 201, {
        entry: createTask,
      });
    }
    return response.error(
      req,
      res,
      "Error creating task, title and description is required ",
      400
    );
  } catch (error) {
    console.log(error, "error");
    response.error(req, res, "Error creating task ", 500);
  }
};

const putTaskFromID = async (req, res) => {
  const { body, params } = req;
  console.log(body, "params");
  try {
    if (params.id) {
      const findTask = await Tasks.findOne({
        where: {
          id: params.id,
        },
      });
      if (!findTask.id)
        return response.error(
          req,
          res,
          "No Task were found with the task ID",
          500
        );
      let updateBody = {};
      if (body.title) {
        updateBody.title = body.title;
      }
      if (body.description) {
        updateBody.description = body.description;
      }
      if (!body.description && !body.title) {
        return response.error(req, res, "Not found body to change ", 500);
      }

      console.log(updateBody, "updateBody");

      findTask.set(updateBody);
      await findTask.save();
      return response.succes(req, res, "Task updated", 200, {
        entry: findTask,
      });
    }
    return response.error(
      req,
      res,
      "Error retrieving task, params ID not found",
      400
    );
  } catch (error) {
    console.log(error, "error");
    response.error(req, res, "Error updating task ", 500);
  }
};

const deleteTaskFromID = async (req, res) => {
  const { params } = req;
  console.log(params);
  try {
    if (params.id) {
      const task = await Tasks.destroy({
        where: {
          id: params.id,
        },
      });
      console.log(task, "task");
      return task == 1
        ? response.succes(req, res, "Task successfully eliminated", 200)
        : response.error(req, res, "Error deleting task, task not found ", 500);
    }
    return response.error(
      req,
      res,
      "Error retrieving task, params ID not found",
      400
    );
  } catch (error) {
    console.log(error);
    response.error(req, res, "Error deleting task ", 500);
  }
};

const getFindTasksWithStatus = async (req, res) => {
  const { params } = req;

  try {
    if (params.idStatus) {
      const findStatus = await Status.findOne({
        where: {
          id: params.idStatus,
        },
      });
      if (findStatus.id) {
        const allTaskStatus = await Tasks.findAll({
          where: {
            status_id: findStatus.id,
          },
        });
        return response.succes(
          req,
          res,
          `Tasks found with status : ${findStatus.title}`,
          200,
          { entries: allTaskStatus }
        );
      }
    }
    return response.error(
      req,
      res,
      "No tasks were found with the status ID",
      500
    );
  } catch (error) {
    console.log(error),
      response.error(req, res, "Error retrieving  task ", 500);
  }
};

const changeTaskStatus = async (req, res) => {
  const { params } = req;

  try {
    if (params.idStatus && params.idTask) {
      const findStatus = await Status.findOne({
        where: {
          id: params.idStatus,
        },
      });
      const findTask = await Tasks.findOne({
        where: {
          id: params.idTask,
        },
      });
      console.log(findTask);

      if (!findStatus.id)
        return response.error(
          req,
          res,
          "No Status were found with the status ID",
          500
        );
      if (!findTask.id)
        return response.error(
          req,
          res,
          "No Task were found with the task ID",
          500
        );

      findTask.set({
        status_id: findStatus.id,
      });
      await findTask.save();
      return response.succes(
        req,
        res,
        `Task status ( ${findStatus.title} ) was updated `,
        200,
        { entry: findTask }
      );
    }
    return response.error(
      req,
      res,
      "The status IDs and the task to be maintained are required.",
      500
    );
  } catch (error) {
    console.log(error),
      response.error(req, res, "Error retrieving  task ", 500);
  }
};

const getTaskTimesFromID = async (req, res) => {
  const { params } = req;
  console.log(params);
  try {
    if (params.id) {
      const task = await Tasks.findOne({
        where: {
          id: params.id,
        },
      });

      if (task) {
        const createdAt = moment(task.createdAt);
        const now = moment();

        const daysSinceCreated = now.diff(createdAt, "days");
        const hoursSinceCreated = now.diff(createdAt, "hours") % 24;
        const minutesSinceCreated = now.diff(createdAt, "minutes") % 60;

        return response.succes(req, res, "Task found", 200, {
          entry: task,
          days: daysSinceCreated,
          hours: hoursSinceCreated,
          minutes: minutesSinceCreated,
        });
      } else {
        return response.succes(req, res, "Task not found", 404);
      }
    }
    return response.error(
      req,
      res,
      "Error retrieving task, params ID not found",
      400
    );
  } catch (error) {
    console.log(error);
    response.error(req, res, "Error retrieving task", 500);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskFromID,
  putTaskFromID,
  deleteTaskFromID,
  getFindTasksWithStatus,
  changeTaskStatus,
  getTaskTimesFromID,
};
