'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  Story.associate = function(models) {
    // associations can be defined here
  };
  return Story;
};