const { Op } = require("sequelize");
const Client = require("../models/clientModel");
const paginate = require("../../../helpers/paginate");

const attributes = ["id", "first_name", "father_name"];

// Create a new client
const createClient = async (req, res) => {
  // Create a client
  const client = {
    first_name: req.body.first_name,
    father_name: req.body.father_name,
    phone_no: req.body.phone_no,
  };

  try {
    // Save client in the database
    const data = await Client.create(client);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the client.",
    });
  }
};

// Find all clients
const findClients = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await Client.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      clients: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving clients", error });
  }
};

const filterClients = async (req, res) => {
  const {
    first_name,
    father_name,
    phone_no,
    page = 1,
    pageSize = 10,
  } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await Client.findAndCountAll({
      where: {
        ...(first_name && { first_name }),
        ...(father_name && { father_name }),
        ...(phone_no && { phone_no }),
      },
      attributes: attributes,
      offset,
      limit,
    });

    res.status(200).json({
      totalItems: count,
      clients: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Error searching clients", error });
  }
};

const searchClients = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await Client.findAndCountAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.like]: `%${query}%` } },
          { father_name: { [Op.like]: `%${query}%` } },
          { phone_no: { [Op.like]: `%${query}%` } },
        ],
      },
      offset,
      limit,
    });

    res.status(200).json({
      totalItems: count,
      clients: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Error searching clients", error });
  }
};

const findClient = async (req, res) => {
  const id = req.params.id;

  try {
    // Find client by id
    const client = await Client.findByPk(id, { attributes: attributes });
    res.send(client);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving client with id=" + id,
    });
  }
};

// Update a client by the id in the request
const updateClient = async (req, res) => {
  const id = req.params.id;

  try {
    // Update client by id
    const num = await Client.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "Client was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update client with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating client with id=" + id,
    });
  }
};

// Delete a client with the specified id in the request
const deleteClient = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete client by id
    const num = await Client.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "Client was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete client with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete client with id=" + id,
    });
  }
};

module.exports = {
  createClient,
  findClients,
  searchClients,
  findClient,
  updateClient,
  deleteClient,
};
