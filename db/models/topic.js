'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name: DataTypes.STRING
  }, {});
  Topic.associate = function(models) {
    // Topic.hasMany(models.Story, {
    //   foreignKey: 'storyId'
    // });
   };
  return Topic;
};
