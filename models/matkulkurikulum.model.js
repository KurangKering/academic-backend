"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MatkulKurikulum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MatkulKurikulum.init({
    id_mkkrkm: DataTypes.INTEGER,
    id_mk: DataTypes.STRING,
    id_krkm: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "MatkulKurikulum",
    tableName: "matkul_kurikulum"
  });
  return MatkulKurikulum;
};