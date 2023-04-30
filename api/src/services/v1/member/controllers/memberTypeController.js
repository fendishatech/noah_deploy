const { Op } = require("sequelize");
const MemberType = require("../models/memberTypeModel");
const paginate = require("../../../helpers/paginate");

const attributes = ["id", "name"];

// Create a new memberType
const createMemberType = async (req, res) => {
  // Create a memberType
  const memberType = {
    name: req.body.name,
  };

  try {
    // Save memberType in the database
    const data = await MemberType.create(memberType);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the memberType.",
    });
  }
};

// Find all memberTypes
const findMemberTypes = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberType.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      memberTypes: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving memberTypes", error });
  }
};

const filterMemberTypes = async (req, res) => {
  const { name, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberType.findAndCountAll({
      where: {
        ...(name && { name }),
      },
      attributes: attributes,
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      memberTypes: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching memberTypes", error });
  }
};

const searchMemberTypes = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberType.findAndCountAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${query}%` } }],
      },
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      memberTypes: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching memberTypes", error });
  }
};

const findMemberType = async (req, res) => {
  const id = req.params.id;

  try {
    // Find memberType by id
    const memberType = await MemberType.findByPk(id, {
      attributes: attributes,
    });
    res.json({ success: true, payload: memberType });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving memberType with id=" + id,
    });
  }
};

// Update a memberType by the id in the request
const updateMemberType = async (req, res) => {
  const id = req.params.id;

  try {
    // Update memberType by id
    const num = await MemberType.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberType was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update memberType with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating memberType with id=" + id,
    });
  }
};

// Delete a memberType with the specified id in the request
const deleteMemberType = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete memberType by id
    const num = await MemberType.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberType was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete memberType with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete memberType with id=" + id,
    });
  }
};

module.exports = {
  createMemberType,
  findMemberTypes,
  searchMemberTypes,
  findMemberType,
  updateMemberType,
  deleteMemberType,
};
