// models/index.js
const Member = require("./member");
const MemberType = require("./memberType");

Member.belongsTo(MemberType, {
  foreignKey: {
    name: "memberTypeId",
    allowNull: false,
  },
});
MemberType.hasMany(Member, { foreignKey: "memberTypeId" });

module.exports = { Member, MemberType };
