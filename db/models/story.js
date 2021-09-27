'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    title:DataTypes.STRING,
    subtitle:DataTypes.STRING
  }, {});
  Story.associate = function(models) {
    Story.belongsTo(models.User, {
     foreignKey: 'userId'
    });
    Story.belongsTo(models.Topic, {
      foreignKey: 'topicId'
    });
    Story.hasMany(models.Comment, { 
      foreignKey: 'storyId', onDelete: 'CASCADE', hooks: true 
    })
    Story.hasMany(models.Like, { 
      foreignKey: 'storyId', onDelete: 'CASCADE', hooks: true 
    })
  };
  return Story;
};
