"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jurusan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jurusan.init({
    id_jrs: {type: DataTypes.STRING, primaryKey: true},
    nama_jrs: DataTypes.STRING,
    id_induk_jrs: DataTypes.STRING,
    tipe_jrs: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Jurusan",
    tableName: "jurusan",
    timestamps: false,
  });
  return Jurusan;
};