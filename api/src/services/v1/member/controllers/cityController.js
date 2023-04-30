const { Op } = require("sequelize");
const City = require("../models/cityModel");
const paginate = require("../../../helpers/paginate");

const attributes = ["id", "name"];

// Create a new city
const createCity = async (req, res) => {
  // Create a city
  const city = {
    name: req.body.name,
  };

  try {
    // Save city in the database
    const data = await City.create(city);
    res.status(200).json({ success: true, payload: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err ||
        err.errors[0].message ||
        "Some error occurred while creating the city.",
    });
  }
};

// Find all cities
const findCities = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await City.findAndCountAll({
      attributes: attributes,
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      cities: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving cities", error });
  }
};

const filterCities = async (req, res) => {
  const { name, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await City.findAndCountAll({
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
      cities: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching cities", error });
  }
};

const searchCities = async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  const { offset, limit } = paginate(page, pageSize);

  try {
    const { count, rows } = await City.findAndCountAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${query}%` } }],
      },
      offset,
      limit,
    });

    res.status(200).json({
      success: true,
      totalItems: count,
      cities: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching cities", error });
  }
};

const findCity = async (req, res) => {
  const id = req.params.id;

  try {
    // Find city by id
    const city = await City.findByPk(id, { attributes: attributes });
    res.json({ success: true, payload: city });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving city with id=" + id,
    });
  }
};

// Update a city by the id in the request
const updateCity = async (req, res) => {
  const id = req.params.id;

  try {
    // Update city by id
    const num = await City.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "City was updated successfully.",
      });
    } else {
      res.json({
        success: false,
        message: `Cannot update city with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating city with id=" + id,
    });
  }
};

// Delete a city with the specified id in the request
const deleteCity = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete city by id
    const num = await City.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        success: true,
        message: "City was deleted successfully!",
      });
    } else {
      res.send({
        success: false,
        message: `Cannot delete city with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete city with id=" + id,
    });
  }
};

module.exports = {
  createCity,
  findCities,
  searchCities,
  findCity,
  updateCity,
  deleteCity,
};
