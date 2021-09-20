'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    storiesId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Like.belongsTo(models.Story, {
      foreignKey: 'storyId'
    });
  };
  return Like;
};
