const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './kanban.sqlite', // Caminho para o arquivo do banco de dados
});

module.exports = sequelize;