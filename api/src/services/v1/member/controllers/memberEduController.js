const { Op } = require("sequelize");
const MemberEdu = require("../../models/memberEduModel");
const paginate = require("../../../../helpers/paginate");

const attributes = ["id", "name"];

// Create a new memberEdu
const createMemberEdu = async (req, res) => {
  // Create a memberEdu
  const memberEdu = {
    name: req.body.name,
  };

  try {
    // Save memberEdu in the database
    const data = await MemberEdu.create(memberEdu);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the memberEdu.",
    });
  }
};

// Find all memberEdus
const findMemberEdus = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberEdu.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
    });
    res.status(200).json({
      success: true,
      totalItems: count,
      memberEdus: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving memberEdus", error });
  }
};

const filterMemberEdus = async (req, res) => {
  const { name, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberEdu.findAndCountAll({
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
      memberEdus: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching memberEdus", error });
  }
};

const searchMemberEdus = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberEdu.findAndCountAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${query}%` } }],
      },
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      memberEdus: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching memberEdus", error });
  }
};

const findMemberEdu = async (req, res) => {
  const id = req.params.id;

  try {
    // Find memberEdu by id
    const memberEdu = await MemberEdu.findByPk(id, { attributes: attributes });
    res.json({ success: true, payload: memberEdu });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving memberEdu with id=" + id,
    });
  }
};

// Update a memberEdu by the id in the request
const updateMemberEdu = async (req, res) => {
  const id = req.params.id;

  try {
    // Update memberEdu by id
    const num = await MemberEdu.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberEdu was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update memberEdu with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating memberEdu with id=" + id,
    });
  }
};

// Delete a memberEdu with the specified id in the request
const deleteMemberEdu = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete memberEdu by id
    const num = await MemberEdu.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberEdu was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete memberEdu with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete memberEdu with id=" + id,
    });
  }
};

module.exports = {
  createMemberEdu,
  findMemberEdus,
  searchMemberEdus,
  findMemberEdu,
  updateMemberEdu,
  deleteMemberEdu,
};
