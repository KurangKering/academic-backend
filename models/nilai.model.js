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
    id_kk: DataTypes.INTEGER,
    id_mhs: DataTypes.INTEGER,
    nilai_huruf_nli: DataTypes.STRING,
    nilai_indeks_nli: DataTypes.DOUBLE,
    is_acc_nli: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Nilai",
    tableName: "nilai"
  });

  Nilai.getKhs = async (idMhs, idSmt) => {
    const results = await sequelize.query(
      `SELECT n.id_nli, mk.id_mk, mk.nama_mk, mk.semester_mk, krkm.nama_krkm, jrs.nama_jrs, n.nilai_huruf_nli, n.nilai_indeks_nli FROM nilai n
      JOIN kelas_kuliah kk ON n.id_kk = kk.id_kk
      JOIN matkul_kurikulum mkkrkm ON kk.id_mkkrkm = mkkrkm.id_mkkrkm
      JOIN kurikulum krkm ON mkkrkm.id_krkm = krkm.id_krkm
      JOIN matkul mk ON mkkrkm.id_mk = mk.id_mk
      JOIN jurusan jrs ON kk.id_jrs = jrs.id_jrs
      WHERE n.id_mhs = ?
      AND kk.id_smt = ?
      AND n.is_acc_nli = 1
      `,
      {
        nest: true,
        replacements: [idMhs, idSmt],
      }
    );
    return results;
  };

  Nilai.getKrs = async (idMhs, idSmt) => {
    const results = await sequelize.query(
      `SELECT n.id_nli, mk.id_mk, mk.nama_mk, krkm.nama_krkm, jrs.nama_jrs FROM nilai n
      JOIN kelas_kuliah kk ON n.id_kk = kk.id_kk
      JOIN matkul_kurikulum mkkrkm ON kk.id_mkkrkm = mkkrkm.id_mkkrkm
      JOIN kurikulum krkm ON mkkrkm.id_krkm = krkm.id_krkm
      JOIN matkul mk ON mkkrkm.id_mk = mk.id_mk
      JOIN jurusan jrs ON kk.id_jrs = jrs.id_jrs
      WHERE n.id_mhs = ?
      AND kk.id_smt = ?
      AND n.is_acc_nli = 1`,
      {
        nest: true,
        replacements: [idMhs, idSmt],
      }
    );
    return results;
  };

  return Nilai;
};