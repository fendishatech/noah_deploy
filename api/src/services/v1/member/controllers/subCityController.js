const { Op } = require("sequelize");
const SubCity = require("../../models/subCityModel");
const paginate = require("../../../../helpers/paginate");

const attributes = ["id", "name", "woreda"];

// Create a new SubCity
const createSubCity = async (req, res) => {
  // Create a SubCity
  const subCity = {
    name: req.body.name,
    woreda: req.body.woreda,
  };
  console.log(subCity);
  try {
    // Save SubCity in the database
    const data = await SubCity.create(subCity);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      new: "new ",
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the SubCity.",
    });
  }
};

// Find all subCities
const findSubCities = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await SubCity.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      subCities: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving subCities", error });
  }
};

const filterSubCities = async (req, res) => {
  const { name, woreda, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await SubCity.findAndCountAll({
      where: {
        ...(name && { name }),
        ...(woreda && { woreda }),
      },
      attributes: attributes,
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      subCities: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching subCities", error });
  }
};

const searchSubCities = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await SubCity.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { woreda: { [Op.like]: `%${query}%` } },
        ],
      },
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      subCities: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching subCities", error });
  }
};

const findSubCity = async (req, res) => {
  const id = req.params.id;

  try {
    // Find SubCity by id
    const SubCity = await SubCity.findByPk(id, { attributes: attributes });
    res.json({ success: true, payload: SubCity });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving SubCity with id=" + id,
    });
  }
};

// Update a SubCity by the id in the request
const updateSubCity = async (req, res) => {
  const id = req.params.id;

  try {
    // Update SubCity by id
    const num = await SubCity.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "SubCity was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update SubCity with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating SubCity with id=" + id,
    });
  }
};

// Delete a SubCity with the specified id in the request
const deleteSubCity = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete SubCity by id
    const num = await SubCity.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "SubCity was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete SubCity with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete SubCity with id=" + id,
    });
  }
};

module.exports = {
  createSubCity,
  findSubCities,
  searchSubCities,
  findSubCity,
  updateSubCity,
  deleteSubCity,
};
