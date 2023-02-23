"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KelasKuliah extends Model {
    static associate(models) {}
  }
  KelasKuliah.init(
    {
      id_kk: DataTypes.INTEGER,
      id_jrs: DataTypes.STRING,
      id_mkkrkm: DataTypes.INTEGER,
      id_smt: DataTypes.STRING,
      id_kls: DataTypes.INTEGER,
      kuota_kk: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "KelasKuliah",
      tableName: "kelas_kuliah",
    }
  );
  return KelasKuliah;
};
