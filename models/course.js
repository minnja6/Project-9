'use strict';

//Course model format and validation

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "ID is required"
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "ID is required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "Description is required"
        }
      }
    },
    estimatedTime: {
      type: DataTypes.STRING
    },
    materialsNeeded: {
      type: DataTypes.STRING
    },
  }, {});
  Course.associate = function(models) {
    // associations can be defined here
  };
}