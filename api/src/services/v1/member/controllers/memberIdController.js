const { Op } = require("sequelize");

const City = require("../../models/cityModel");
const SubCity = require("../../models/SubCityModel");
const Member = require("../../models/MemberModel");
const MemberId = require("../../models/memberIdModel");
const paginate = require("../../../../helpers/paginate");

const attributes = ["id_type", "id_number", "id_img_path", "member.id"];

const cityAttributes = ["id", "name"];
const subCityAttributes = ["id", "name", "woreda"];

const includes = [
  {
    model: Member,
    attributes: ["id"],
  },
];

// Create a new memberId
const createMemberId = async (req, res) => {
  // Create a memberId
  const memberId = {
    id: req.body.id,
    id_type: req.body.id_type,
    id_number: req.body.id_number,
    id_img_path: req.body.id_img_path,
  };

  try {
    // Save memberId in the database
    const data = await MemberId.create(memberId);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the memberId.",
    });
  }
};

// Find all memberIdes
const findMemberIdes = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberId.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
      include: includes,
    });
    res.status(200).json({
      success: true,
      totalItems: count,
      memberIdes: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving memberIdes",
      error,
    });
  }
};

const filterMemberIdes = async (req, res) => {
  const { name, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberId.findAndCountAll({
      where: {
        ...(name && { name }),
      },
      attributes: attributes,
      offset,
      limit,
      include: includes,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      memberIdes: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching memberIdes",
      error,
    });
  }
};

const searchMemberIdes = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberId.findAndCountAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${query}%` } }],
      },
      offset,
      limit,
      include: includes,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      memberIdes: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching memberIdes",
      error,
    });
  }
};

const findMemberId = async (req, res) => {
  const id = req.params.id;

  try {
    // Find memberId by id
    const memberId = await MemberId.findByPk(id, {
      attributes: attributes,
      include: includes,
    });
    res.json({ success: true, payload: memberId });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving memberId with id=" + id,
    });
  }
};

// Update a memberId by the id in the request
const updateMemberId = async (req, res) => {
  const id = req.params.id;

  try {
    // Update memberId by id
    const num = await MemberId.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberId was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update memberId with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating memberId with id=" + id,
    });
  }
};

// Delete a memberId with the specified id in the request
const deleteMemberId = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete memberId by id
    const num = await MemberId.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberId was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete memberId with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete memberId with id=" + id,
    });
  }
};

module.exports = {
  createMemberId,
  findMemberIdes,
  searchMemberIdes,
  findMemberId,
  updateMemberId,
  deleteMemberId,
};
