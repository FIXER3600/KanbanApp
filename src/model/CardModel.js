const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/database');

const CardModel = sequelize.define('Card', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4, // Gera um UUID v4 automaticamente
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        unique: true,
    },
    status: {
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
    tableName: 'Cards',
    timestamps: true,
});

module.exports = CardModel;
