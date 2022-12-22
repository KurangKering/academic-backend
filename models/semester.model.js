"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Semester extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Semester.init({
    id_smt: DataTypes.STRING,
    nama_smt: DataTypes.STRING,
    aktif_smt: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Semester",
    tableName: "semester"
  });
  return Semester;
};