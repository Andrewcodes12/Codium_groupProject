'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  Story.associate = function(models) {
    Story.belongsTo(models.User, {
     foreignKey: 'userId'
    });
    Story.belongsTo(models.Topic, {
      foreignKey: 'topicId'
    });
  };
  return Story;
};
