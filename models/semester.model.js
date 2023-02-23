"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Semester extends Model {
    static associate(models) {}
  }
  Semester.init(
    {
      id_smt: { type: DataTypes.STRING, primaryKey: true },
      nama_smt: DataTypes.STRING,
      is_aktif_smt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Semester",
      tableName: "semester",
      timestamps: false,
    }
  );

  Semester.getAktif = async () => {
    return await Semester.findOne({ where: { is_aktif_smt: 1 } });
  };

  return Semester;
};
