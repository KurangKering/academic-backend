"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KelasKuliah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KelasKuliah.init({
    id_kk: DataTypes.INTEGER,
    id_jrs_kk: DataTypes.STRING,
    id_krkm_mk_kk: DataTypes.INTEGER,
    id_smt_kk: DataTypes.STRING,
    id_kls_kk: DataTypes.INTEGER,
    kuota_kk: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "KelasKuliah",
    tableName: "kelas_kuliah"
  });
  return KelasKuliah;
};