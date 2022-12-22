"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KuliahMhs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KuliahMhs.init({
    id_kmhs: {type: DataTypes.INTEGER, primaryKey: true},
    id_mhs_kmhs: DataTypes.INTEGER,
    id_smt_kmhs: DataTypes.INTEGER,
    semester_kmhs: DataTypes.INTEGER,
    status_kmhs: DataTypes.STRING
  }, {
    sequelize,
    modelName: "KuliahMhs",
    tableName: "kuliah_mhs"
  });
  return KuliahMhs;
};