const { Op } = require("sequelize");

const City = require("../../models/cityModel");
const SubCity = require("../../models/SubCityModel");
const Member = require("../../models/MemberModel");
const MemberEC = require("../../models/memberECModel");
const paginate = require("../../../../helpers/paginate");

const attributes = [
  "id",
  "first_name",
  "middle_name",
  "last_name",
  "woreda",
  "houseNo",
  "placeName",
  "phoneNo2",
  "city.name",
  "subCity.name",
  "subCity.woreda",
  "member.id",
];

const cityAttributes = ["id", "name"];
const subCityAttributes = ["id", "name", "woreda"];

const includes = [
  {
    model: City,
    attributes: cityAttributes,
  },
  {
    model: SubCity,
    attributes: cityAttributes,
  },
  {
    model: Member,
    attributes: ["id"],
  },
];

// Create a new memberEC
const createMemberEC = async (req, res) => {
  // Create a memberEC
  const memberEC = {
    id: req.body.id,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    woreda: req.body.woreda,
    houseNo: req.body.houseNo,
    placeName: req.body.placeName,
    phoneNo2: req.body.phoneNo2,
  };

  try {
    // Save memberEC in the database
    const data = await MemberEC.create(memberEC);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the memberEC.",
    });
  }
};

// Find all memberECes
const findMemberECes = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberEC.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
      include: includes,
    });
    res.status(200).json({
      success: true,
      totalItems: count,
      memberECes: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving memberECes",
      error,
    });
  }
};

const filterMemberECes = async (req, res) => {
  const { name, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberEC.findAndCountAll({
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
      memberECes: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching memberECes",
      error,
    });
  }
};

const searchMemberECes = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberEC.findAndCountAll({
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
      memberECes: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching memberECes",
      error,
    });
  }
};

const findMemberEC = async (req, res) => {
  const id = req.params.id;

  try {
    // Find memberEC by id
    const memberEC = await MemberEC.findByPk(id, {
      attributes: attributes,
      include: includes,
    });
    res.json({ success: true, payload: memberEC });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving memberEC with id=" + id,
    });
  }
};

// Update a memberEC by the id in the request
const updateMemberEC = async (req, res) => {
  const id = req.params.id;

  try {
    // Update memberEC by id
    const num = await MemberEC.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberEC was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update memberEC with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating memberEC with id=" + id,
    });
  }
};

// Delete a memberEC with the specified id in the request
const deleteMemberEC = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete memberEC by id
    const num = await MemberEC.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberEC was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete memberEC with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete memberEC with id=" + id,
    });
  }
};

module.exports = {
  createMemberEC,
  findMemberECes,
  searchMemberECes,
  findMemberEC,
  updateMemberEC,
  deleteMemberEC,
};
