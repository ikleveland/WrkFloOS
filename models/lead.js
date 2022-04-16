'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.user = Lead.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      this.leadsms = Lead.hasMany(models.Leadsms, {
        foreignKey: 'lead_id'
      })
  
    }
  }
  Lead.init({
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lead',
  });
  return Lead;
};