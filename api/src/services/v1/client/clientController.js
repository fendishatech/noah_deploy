const Client = require("../models/clientModel");

const attributes = ["id", "first_name", "father_name", "phone_no"];

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

// Retrieve all clients from the database.
const findClients = async (req, res) => {
  const {
    first_name,
    father_name,
    phone_no,
    email,
    page = 1,
    pageSize = 10,
  } = req.query;

  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize);

  try {
    const { count, rows } = await Client.findAndCountAll({
      where: {
        ...(first_name && { first_name }),
        ...(father_name && { father_name }),
        ...(phone_no && { phone_no }),
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
    res.status(500).json({ message: "Error retrieving clients", error });
  }
};

// const findClients = async (req, res) => {
//   const first_name = req.query.first_name;
//   const father_name = req.query.father_name;
//   const phone_no = req.query.phone_no;
//   var condition = null;

//   if (first_name || father_name || phone_no) {
//     condition = {};
//     if (first_name) {
//       condition.first_name = { [Op.like]: `%${first_name}%` };
//     }
//     if (father_name) {
//       condition.father_name = { [Op.like]: `%${father_name}%` };
//     }
//     if (phone_no) {
//       condition.phone_no = { [Op.like]: `%${phone_no}%` };
//     }
//   }

//   try {
//     // Find all clients
//     const clients = await Client.findAll({
//       where: condition,
//       attributes: attributes,
//     });
//     res.send(clients);
//   } catch (err) {
//     res.status(500).send({
//       message: err.message || "Some error occurred while retrieving clients.",
//     });
//   }
// };

// Find a single client with an id
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
  findClient,
  updateClient,
  deleteClient,
};
