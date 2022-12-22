"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Matkul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Matkul.init({
    id_mk: DataTypes.STRING,
    nama_mk: DataTypes.STRING,
    semester_mk: DataTypes.INTEGER,
    id_jrs_mk: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Matkul",
    tableName: "matkul"
  });
  return Matkul;
};