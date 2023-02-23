"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kurikulum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kurikulum.init({
    id_krkm: DataTypes.INTEGER,
    nama_krkm: DataTypes.STRING,
    id_jrs: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Kurikulum",
    tableName: "kurikulum"
  });
  return Kurikulum;
};