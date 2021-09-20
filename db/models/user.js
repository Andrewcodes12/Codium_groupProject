'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Follow, {
      foreignKey: 'followerId'
    });
    User.hasMany(models.Follow, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Like, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Story, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId'
    });
  };
  return User;
};
