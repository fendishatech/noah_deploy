const { Op } = require("sequelize");
const Child = require("../../models/childModel");
const paginate = require("../../../../helpers/paginate");

const attributes = [
  "id",
  "first_name",
  "father_name",
  "mother_name",
  "payment",
];

// Create a new child
const createChild = async (req, res) => {
  // Create a child
  const child = {
    first_name: req.body.first_name,
    father_name: req.body.father_name,
    payment_name: req.body.payment_name,
    payment: req.body.payment,
  };

  try {
    // Save child in the database
    const data = await Child.create(child);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the child.",
    });
  }
};

// Find all children
const findChildren = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await Child.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      children: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving children", error });
  }
};

const filterChildren = async (req, res) => {
  const { gender, martial_status, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await Child.findAndCountAll({
      where: {
        ...(gender && { gender }),
        ...(martial_status && { martial_status }),
      },
      attributes: attributes,
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      children: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching children", error });
  }
};

const searchChildren = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await Child.findAndCountAll({
      where: {
        [Op.or]: [
          {
            first_name: { [Op.like]: `%${query}%` },
          },
          { father_name: { [Op.like]: `%${query}%` } },
          { last_name: { [Op.like]: `%${query}%` } },
          { phone_no: { [Op.like]: `%${query}%` } },
        ],
      },
      offset,
      limit,
    });
    console.log({ rows });
    res.status(200).json({
      success: true,
      totalItems: count,
      children: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching children", error });
  }
};

const findChild = async (req, res) => {
  const id = req.params.id;

  try {
    // Find child by id
    const child = await Child.findByPk(id, { attributes: attributes });
    res.json({ success: true, payload: child });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving child with id=" + id,
    });
  }
};

// Update a child by the id in the request
const updateChild = async (req, res) => {
  const id = req.params.id;

  try {
    // Update child by id
    const num = await Child.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "Child was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update child with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating child with id=" + id,
    });
  }
};

// Delete a child with the specified id in the request
const deleteChild = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete child by id
    const num = await Child.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "Child was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete child with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete child with id=" + id,
    });
  }
};

module.exports = {
  createChild,
  findChildren,
  searchChildren,
  findChild,
  updateChild,
  deleteChild,
};
