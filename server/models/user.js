'use strict';
const {
    Model
} = require('sequelize');
const { encryptPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Email already Exist.'
            },
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Email Required.'
                },
                isEmail: {
                    args: true,
                    msg: "Invalid Email Input."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Password Required.'
                },
                len: {
                    args: [4, 12],
                    msg: 'Password length must between 4 or 12 Characters.'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate: (User, Option) => {
                User.password = encryptPassword(User.password)
            }
        }
    });

    return User;
};