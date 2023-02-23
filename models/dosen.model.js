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
      Dosen.belongsTo(models.Jurusan, {foreignKey: "id_jrs", as: "jurusan"});
    }
  }
  Dosen.init({
    id_dsn: {type: DataTypes.INTEGER, primaryKey: true},
    nama_dsn: DataTypes.STRING,
    id_jrs_dsn: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Dosen",
    tableName: "dosen",
    timestamps: false,
  });
  return Dosen;
};