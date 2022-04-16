'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leadsms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.leadsms = Leadsms.belongsTo(models.Lead, {
        foreignKey: 'lead_id'
      })
  
    }
  }
  Leadsms.init({
    sent: DataTypes.STRING,
    recieved: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    localNumber: DataTypes.STRING,
    lead_id: DataTypes.INTEGER,
    custom: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Leadsms',
  });
  return Leadsms;
};