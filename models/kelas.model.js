"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kelas.init({
    id_kls: DataTypes.INTEGER,
    nama_kls: DataTypes.STRING,
    id_jrs_kls: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Kelas",
    tableName: "kelas"
  });
  return Kelas;
};