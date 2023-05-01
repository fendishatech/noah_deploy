const { Op } = require("sequelize");
const MemberJob = require("../../models/memberJobModel");
const paginate = require("../../../../helpers/paginate");
const Member = require("../../models/memberModel");

const attributes = ["id", "title", "exp_year", "exp_month", "member.id"];

const includes = [
  {
    include: {
      model: Member,
      attributes: ["id"],
    },
  },
];
// Create a new memberJob
const createMemberJob = async (req, res) => {
  // Create a memberJob
  const memberJob = {
    title: req.body.title,
    exp_year: req.body.exp_year,
    exp_month: req.body.exp_month,
  };

  try {
    // Save memberJob in the database
    const data = await MemberJob.create(memberJob);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the memberJob.",
    });
  }
};

// Find all memberJobs
const findMemberJobs = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberJob.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
      include: includes,
    });
    res.status(200).json({
      success: true,
      totalItems: count,
      memberJobs: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving memberJobs", error });
  }
};

const filterMemberJobs = async (req, res) => {
  const { name, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberJob.findAndCountAll({
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
      memberJobs: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching memberJobs", error });
  }
};

const searchMemberJobs = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberJob.findAndCountAll({
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
      memberJobs: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching memberJobs", error });
  }
};

const findMemberJob = async (req, res) => {
  const id = req.params.id;

  try {
    // Find memberJob by id
    const memberJob = await MemberJob.findByPk(id, { attributes: attributes });
    res.json({ success: true, payload: memberJob });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving memberJob with id=" + id,
    });
  }
};

// Update a memberJob by the id in the request
const updateMemberJob = async (req, res) => {
  const id = req.params.id;

  try {
    // Update memberJob by id
    const num = await MemberJob.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberJob was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update memberJob with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating memberJob with id=" + id,
    });
  }
};

// Delete a memberJob with the specified id in the request
const deleteMemberJob = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete memberJob by id
    const num = await MemberJob.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberJob was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete memberJob with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete memberJob with id=" + id,
    });
  }
};

module.exports = {
  createMemberJob,
  findMemberJobs,
  searchMemberJobs,
  findMemberJob,
  updateMemberJob,
  deleteMemberJob,
};
