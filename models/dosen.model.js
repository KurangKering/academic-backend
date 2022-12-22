"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dosen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dosen.init({
    id_dsn: DataTypes.INTEGER,
    nama_dsn: DataTypes.STRING,
    id_jrs_dsn: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Dosen",
    tableName: "dosen"
  });
  return Dosen;
};