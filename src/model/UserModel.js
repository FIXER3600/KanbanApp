// ../models/User.js
const { Sequelize, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/database');

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4, // Gera um UUID v4 automaticamente
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'Users',
    timestamps: true,
});
UserModel.getUserByEmail = async function(email) {
	try {
	    return await this.findOne({ where: { email } });
	} catch (error) {
	    throw new Error('Error retrieving user by email: ' + error.message);
	}
    };

module.exports = UserModel;
