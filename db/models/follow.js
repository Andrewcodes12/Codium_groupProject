'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    Follow.belongsTo(models.User, {
      foreignKey: 'followerId'
    });
    // Follow.hasMany(models.User, {
    //   foreignKey: 'userId'
    // });
  };
  return Follow;
};
