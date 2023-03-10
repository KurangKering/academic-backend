"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mahasiswa.belongsTo(models.Jurusan, {foreignKey: "id_jrs", as: "jurusan" });
      Mahasiswa.belongsTo(models.Dosen, {foreignKey: "id_dsn_pembimbing_mhs", as: "pembimbing"});
    }
  }
  Mahasiswa.init(
    {
      id_mhs: { type: DataTypes.INTEGER, primaryKey: true },
      nama_mhs: DataTypes.STRING,
      status_mhs: DataTypes.STRING,
      id_jrs: DataTypes.STRING,
      id_dsn_pembimbing_mhs: DataTypes.INTEGER,
      foto_mhs: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Mahasiswa",
      tableName: "mahasiswa",
      timestamps: false,
    }
  );
  return Mahasiswa;
};
