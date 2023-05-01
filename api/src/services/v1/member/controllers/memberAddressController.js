const { Op } = require("sequelize");

const City = require("../../models/cityModel");
const SubCity = require("../../models/SubCityModel");
const Member = require("../../models/MemberModel");
const MemberAddress = require("../../models/memberAddressModel");
const paginate = require("../../../../helpers/paginate");

const attributes = [
  "id",
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

// Create a new memberAddress
const createMemberAddress = async (req, res) => {
  // Create a memberAddress
  const memberAddress = {
    id: req.body.id,
    woreda: req.body.woreda,
    houseNo: req.body.houseNo,
    placeName: req.body.placeName,
    phoneNo2: req.body.phoneNo2,
  };

  try {
    // Save memberAddress in the database
    const data = await MemberAddress.create(memberAddress);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the memberAddress.",
    });
  }
};

// Find all memberAddresses
const findMemberAddresses = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberAddress.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
      include: includes,
    });
    res.status(200).json({
      success: true,
      totalItems: count,
      memberAddresses: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving memberAddresses",
      error,
    });
  }
};

const filterMemberAddresses = async (req, res) => {
  const { name, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberAddress.findAndCountAll({
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
      memberAddresses: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching memberAddresses",
      error,
    });
  }
};

const searchMemberAddresses = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await MemberAddress.findAndCountAll({
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
      memberAddresses: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching memberAddresses",
      error,
    });
  }
};

const findMemberAddress = async (req, res) => {
  const id = req.params.id;

  try {
    // Find memberAddress by id
    const memberAddress = await MemberAddress.findByPk(id, {
      attributes: attributes,
      include: includes,
    });
    res.json({ success: true, payload: memberAddress });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving memberAddress with id=" + id,
    });
  }
};

// Update a memberAddress by the id in the request
const updateMemberAddress = async (req, res) => {
  const id = req.params.id;

  try {
    // Update memberAddress by id
    const num = await MemberAddress.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberAddress was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update memberAddress with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating memberAddress with id=" + id,
    });
  }
};

// Delete a memberAddress with the specified id in the request
const deleteMemberAddress = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete memberAddress by id
    const num = await MemberAddress.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "MemberAddress was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete memberAddress with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete memberAddress with id=" + id,
    });
  }
};

module.exports = {
  createMemberAddress,
  findMemberAddresses,
  searchMemberAddresses,
  findMemberAddress,
  updateMemberAddress,
  deleteMemberAddress,
};
