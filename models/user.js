'use strict';

//User model format and validation

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "ID is required"
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Full name is required"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Full name is required"
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password is required"
        }
      }
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
}