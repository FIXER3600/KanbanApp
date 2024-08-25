const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const userRouter = require('./src/routes/userRouter'); // Correto
require('dotenv').config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Teste de conexão e sincronização do banco de dados
const syncDatabase = async () => {
    try {
        // Testa a conexão com o banco de dados
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sincroniza o banco de dados com as alterações nos modelos
        await sequelize.sync({ alter: true }); // Usa 'alter' para atualizar a tabela existente
        console.log('Database synchronized successfully.');
    } catch (err) {
        console.error('Unable to connect to the database or synchronize:', err);
    }
};

// Executa a sincronização do banco de dados e inicia o servidor
syncDatabase().then(() => {
    // Configura as rotas
    app.get('/', (req, res) => {
        res.send('Bem vindo ao kanban app');
    });

    app.use('/user', userRouter);
    // Se você tiver outro roteador para `/card`, certifique-se de importá-lo e usá-lo aqui
    // const cardRouter = require('./src/routes/cardRouter'); // Exemplo
    // app.use('/card', cardRouter);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
