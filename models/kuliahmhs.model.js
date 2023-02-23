"use strict";

const path = require("path");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class KuliahMhs extends Model {
    static associate(models) {}
  }
  KuliahMhs.init(
    {
      id_kmhs: { type: DataTypes.INTEGER, primaryKey: true },
      id_mhs: DataTypes.INTEGER,
      id_smt: DataTypes.INTEGER,
      semester_kmhs: DataTypes.INTEGER,
      status_kmhs: DataTypes.STRING,
      ips_kmhs: DataTypes.DOUBLE,
      ipk_kmhs: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "KuliahMhs",
      tableName: "kuliah_mhs",
    }
  );

  KuliahMhs.getAllKmhs = async (idMhs) => {
    const results = await sequelize.query(
      "SELECT * FROM kuliah_mhs WHERE id_mhs = ? ORDER BY semester_kmhs ASC",
      {
        nest: true,
        replacements: [idMhs],
      }
    );
    return results;
  };

  KuliahMhs.getKmhs = async (idMhs, idSmt) => {
    const [result, _] = await sequelize.query(
      "SELECT * FROM kuliah_mhs WHERE id_mhs = ? AND id_smt = ? LIMIT 1",
      {
        nest: true,
        replacements: [idMhs, idSmt],
      }
    );
    return result;
  };

  return KuliahMhs;
};
