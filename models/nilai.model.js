"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nilai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Nilai.init({
    id_nli: DataTypes.INTEGER,
    id_kk_nli: DataTypes.INTEGER,
    id_mhs_nli: DataTypes.INTEGER,
    nilai_huruf_nli: DataTypes.STRING,
    nilai_indeks_nli: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: "Nilai",
    tableName: "nilai"
  });
  return Nilai;
};