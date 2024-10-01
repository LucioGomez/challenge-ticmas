const router = require("express").Router();
const response = require("../../middlewares/responses.js");
const Status = require("../../models/Status.js"); // Modelo modificado
const { faker } = require("@faker-js/faker");

// Obtener todos los estados
const getAllStatus = async (req, res) => {
  const allStatus = await Status.findAll();
  try {
    response.succes(req, res, "Status found", 200, { entries: allStatus });
  } catch (error) {
    console.log(error),
      response.error(req, res, "Error retrieving status", 500);
  }
};

// Obtener estado por ID
const getStatusFromID = async (req, res) => {
  const { params } = req;
  console.log(params);
  try {
    if (params.id) {
      const status = await Status.findOne({
        where: {
          id: params.id,
        },
      });
      return response.succes(
        req,
        res,
        status?.id ? "Status found" : "Status not found",
        200,
        { entry: status?.id ? status : {} }
      );
    }
    return response.error(
      req,
      res,
      "Error retrieving status, params ID not found",
      400
    );
  } catch (error) {
    console.log(error);
    response.error(req, res, "Error retrieving status", 500);
  }
};

// Crear un nuevo estado
const createStatus = async (req, res) => {
  await Status.sync();
  const { body } = req;
  console.log(body, "params");
  try {
    const newStatus = await Status.create( {
        title: body?.title ? body?.title : faker.lorem.lines(1),
      },);
    console.log(newStatus);
    response.succes(req, res, "Status created", 201, { entry: newStatus });
  } catch (error) {
    console.log(error, "error");
    response.error(req, res, "Error creating status", 500);
  }
};

const putStatusFromID = async (req, res) => {
  const { body, params } = req;
  console.log(body, "params");
  try {
    if (params.id) {
      const updateStatus = await Status.update(
        {
          title: body?.title ? body?.title : faker.lorem.lines(1),
        },
        {
          where: {
            id: params.id,
          },
        }
      );
      console.log(updateStatus);
      if (updateStatus == 0)
        return response.error(
          req,
          res,
          "Error updating status, status not found",
          500
        );

      const statusUpdated = await Status.findOne({
        where: {
          id: params.id,
        },
      });
      return response.succes(req, res, "Status updated", 200, {
        entry: statusUpdated,
      });
    }
    return response.error(
      req,
      res,
      "Error retrieving status, params ID not found",
      400
    );
  } catch (error) {
    console.log(error, "error");
    response.error(req, res, "Error updating status", 500);
  }
};

// Eliminar estado por ID
const deleteStatusFromID = async (req, res) => {
  const { params } = req;
  console.log(params);
  try {
    if (params.id) {
      const status = await Status.destroy({
        where: {
          id: params.id,
        },
      });
      console.log(status, "status");
      return status == 1
        ? response.succes(req, res, "Status successfully eliminated", 200)
        : response.error(
            req,
            res,
            "Error deleting status, status not found",
            500
          );
    }
    return response.error(
      req,
      res,
      "Error retrieving status, params ID not found",
      400
    );
  } catch (error) {
    console.log(error);
    response.error(req, res, "Error deleting status", 500);
  }
};

module.exports = {
  getAllStatus,
  createStatus,
  getStatusFromID,
  putStatusFromID,
  deleteStatusFromID,
};
