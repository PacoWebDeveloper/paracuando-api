'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class states extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  states.init({
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true
    },
    country_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'states',
    tableName: 'states',
    underscored: true,
    timestamps: true
  });
  return states;
};