const { Op } = require("sequelize");
const Member = require("../../models/memberModel");
const paginate = require("../../../../helpers/paginate");

const attributes = [
  "id",
  "first_name",
  "father_name",
  "last_name",
  "title",
  "gender",
  "dob",
  "martial_status",
  "family_no",
  "family_males",
  "family_females",
  "phone_no",
  "email",
  "will_list",
  "password",
  "memberTypeId",
];

// Create a new member
const createMember = async (req, res) => {
  // Create a member
  const member = {
    first_name: req.body.first_name,
    father_name: req.body.father_name,
    last_name: req.body.last_name,
    title: req.body.title,
    gender: req.body.gender,
    dob: req.body.dob,
    martial_status: req.body.martial_status,
    family_no: req.body.family_no,
    family_males: req.body.family_males,
    family_females: req.body.family_females,
    phone_no: req.body.phone_no,
    email: req.body.email,
    will_list: req.body.will_list,
    password: req.body.password,
    memberTypeId: req.body.memberTypeId,
  };

  try {
    // Save member in the database
    const data = await Member.create(member);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the member.",
    });
  }
};

// Find all members
const findMembers = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await Member.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      members: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving members", error });
  }
};

const filterMembers = async (req, res) => {
  const { gender, martial_status, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await Member.findAndCountAll({
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
      members: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching members", error });
  }
};

const searchMembers = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await Member.findAndCountAll({
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
      members: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching members", error });
  }
};

const findMember = async (req, res) => {
  const id = req.params.id;

  try {
    // Find member by id
    const member = await Member.findByPk(id, { attributes: attributes });
    res.json({ success: true, payload: member });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving member with id=" + id,
    });
  }
};

// Update a member by the id in the request
const updateMember = async (req, res) => {
  const id = req.params.id;

  try {
    // Update member by id
    const num = await Member.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "Member was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update member with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating member with id=" + id,
    });
  }
};

// Delete a member with the specified id in the request
const deleteMember = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete member by id
    const num = await Member.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "Member was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete member with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete member with id=" + id,
    });
  }
};

module.exports = {
  createMember,
  findMembers,
  searchMembers,
  findMember,
  updateMember,
  deleteMember,
};
