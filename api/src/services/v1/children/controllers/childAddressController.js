const { Op } = require("sequelize");

const City = require("../../models/cityModel");
const SubCity = require("../../models/SubCityModel");
const Child = require("../../models/childModel");
const ChildAddress = require("../../models/childAddressModel");
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
  "child.id",
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
    model: Child,
    attributes: ["id"],
  },
];

// Create a new childAddress
const createChildAddress = async (req, res) => {
  // Create a childAddress
  const childAddress = {
    id: req.body.id,
    woreda: req.body.woreda,
    houseNo: req.body.houseNo,
    placeName: req.body.placeName,
    phoneNo2: req.body.phoneNo2,
  };

  try {
    // Save childAddress in the database
    const data = await ChildAddress.create(childAddress);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the childAddress.",
    });
  }
};

// Find all childAddresses
const findChildAddresses = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await ChildAddress.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
      include: includes,
    });
    res.status(200).json({
      success: true,
      totalItems: count,
      childAddresses: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving childAddresses",
      error,
    });
  }
};

const filterChildAddresses = async (req, res) => {
  const { name, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await ChildAddress.findAndCountAll({
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
      childAddresses: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching childAddresses",
      error,
    });
  }
};

const searchChildAddresses = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await ChildAddress.findAndCountAll({
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
      childAddresses: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching childAddresses",
      error,
    });
  }
};

const findChildAddress = async (req, res) => {
  const id = req.params.id;

  try {
    // Find childAddress by id
    const childAddress = await ChildAddress.findByPk(id, {
      attributes: attributes,
      include: includes,
    });
    res.json({ success: true, payload: childAddress });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving childAddress with id=" + id,
    });
  }
};

// Update a childAddress by the id in the request
const updateChildAddress = async (req, res) => {
  const id = req.params.id;

  try {
    // Update childAddress by id
    const num = await ChildAddress.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "ChildAddress was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update childAddress with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating childAddress with id=" + id,
    });
  }
};

// Delete a childAddress with the specified id in the request
const deleteChildAddress = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete childAddress by id
    const num = await ChildAddress.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "ChildAddress was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete childAddress with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete childAddress with id=" + id,
    });
  }
};

module.exports = {
  createChildAddress,
  findChildAddresses,
  searchChildAddresses,
  findChildAddress,
  updateChildAddress,
  deleteChildAddress,
};
