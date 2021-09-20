'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    storyId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Comment.belongsTo(models.Story, {
      foreignKey: 'storyId'
    });
  };
  return Comment;
};
