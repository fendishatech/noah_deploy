// helpers/pagination.js
const paginate = (page, pageSize) => {
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize);
  return { offset, limit };
};

module.exports = paginate;
